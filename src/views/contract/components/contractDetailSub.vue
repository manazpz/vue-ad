<template>
  <div class="app-container">
    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同编码" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="父合同编码" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.parent}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同名称" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="甲方" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.customer_a_Name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="乙方" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.customer_b_Name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总金额" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.money_init}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已付金额" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.paid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="盈利" width="90">
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
          <span>{{scope.row.statusName}}</span>
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
  import { contractSubList } from '@/api/contract'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  export default {
    name: 'contractDetailSub',
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
          pageSize: 20,
          name: undefined,
          statusKey: undefined,
          sort: 'lastCreateTime DESC'
        },
        temp: {
          id: undefined,
          title: '',
          money: '',
          money_init: '',
          paid: '',
          unpaid: '',
          expenses: '',
          signTime: '',
          expireTime: '',
          income: '',
          customerKeyA: '',
          customerKeyB: '',
          tax: '',
          taxlimit: '',
          currency: '',
          reamrks1: '',
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
        contractSubList(this.listQuery).then(response => {
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
