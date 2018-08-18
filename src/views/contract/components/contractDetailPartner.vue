<template>
  <div class="app-container">
    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:400px;">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合伙人" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同总金额" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.money_init}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="抽成比例" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.pro}}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="盈利" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.income}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签署时间" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.signTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期时间" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.expireTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="90" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
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
  import { getContract } from '@/api/contract'
  import { toThousands } from '@/common/common'
  import store from '@/store'
  export default {
    name: 'contractDetailPartner',
    data: function() {
      return {
        tableKey: 1,
        selectNum: 0,
        totalItemsNum: 10,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
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
        getContract(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.list.forEach(function(c) {
              c.income = toThousands(c.income)
              c.money_init = toThousands(c.money_init)
            })
            this.total = response.data.total
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      // tabClick(status) {
      //   this.activeName = status.name
      // },
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
      }
    }
  }
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
