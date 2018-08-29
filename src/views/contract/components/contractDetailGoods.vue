<template>
  <div class="app-container">
    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品编码" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品类型" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.types}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单位" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, 'Y')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->



  </div>
</template>

<script>
  import { contractGoodsList, deleteGoods } from '@/api/contract'
  import { toThousands } from '@/utils/common'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  export default {
    name: 'contractDetailGoods',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          name: undefined,
          statusKey: undefined,
          sort: 'lastCreateTime DESC'
        },
        temp: {
          id: undefined,
          code: '',
          name: '',
          unit: '',
          types: '',
          price: '',
          status: 'published'
        },
        rules: {
        }
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        contractGoodsList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
            this.list.forEach(function(c) {
              c.price = toThousands(c.price)
            })
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.getList()
      },
      handleModifyStatus(row, isValid) {
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          debugger
          const params = { id: row.goodsId }
          deleteGoods(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row, isValid)
              })
            }
            if (response.code === 200) {
              this.reload()
              this.listLoading = false
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(_ => {
          return
        })
      }
    }
  }
</script>
