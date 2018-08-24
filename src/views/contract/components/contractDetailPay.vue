<template>
  <div class="app-container">
    <!-- 表格 start -->
    <el-table :key='tableKey' :data="listData" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收款人" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.payee}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款人" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.payer}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.creattime}}</span>
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
  import { expnsesList } from '@/api/contract'
  import { toThousands } from '@/utils/common'
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
        listData: null,
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
        expnsesList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.listData = response.data.items
            this.listData.forEach(function(c) {
              c.amount = toThousands(c.amount)
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
      }
    }
  }
</script>
