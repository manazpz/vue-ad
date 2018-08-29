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
      <el-table-column align="center" label="附件类型" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="附件名称" min-width="90">
        <template slot-scope="scope">
          <a style="color:#FF3030;text-decoration:underline;" @click="handleUpload(scope.row)" >{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="附件格式" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.extend}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="附件大小" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.sizes}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.creattime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.lastcreattime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
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
  import { contractAttaList, deleteAtta } from '@/api/contract'
  import store from '@/store'
  export default {
    name: 'contractDetailPartner',
    inject: ['reload'],
    data: function() {
      return {
        tableKey: 1,
        selectNum: 0,
        totalItemsNum: 10,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          type: 'HT',
          pageNum: 1,
          pageSize: 5
        },
        temp: {
          name: '',
          url: '',
          extend: ''
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
        contractAttaList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleModifyStatus(row, isValid) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { id: row.id, isValid: isValid }
          deleteAtta(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row, isValid)
              })
            }
            if (response.code === 200) {
              this.reload()
              this.listLoading = false
              this.dialogExpnsesVisible = false
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              row.del = isValid
            }
          }).catch(() => {
            this.listLoading = false
            this.falg = true
          })
        }).catch(_ => {
          return
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
      handleUpload(row) {
        debugger
        window.location.href = process.env.BASE_API + '/contract/getReasourse?name=' + row.name + '&extend=' + row.extend + '&url=' + row.url
      }
    }
  }
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
