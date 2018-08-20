<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">名称: {{ list.title }}</el-col>
      <el-col :span="8">起始时间: {{ list.signTime }}</el-col>
      <el-col :span="4">结束时间: {{ list.expireTime }}</el-col>
    </el-row>
    <hr>

    <div class="createPost-main-container">
      <div class="app-container">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="150px" label="合同名称:"  class="postInfo-container-item">
              <span>{{ list.title }}</span>
            </el-form-item>
            <el-form-item label-width="150px" label="合同编号:" class="postInfo-container-item">
              <span>{{ list.number }}</span>
            </el-form-item>
            <el-form-item label-width="150px" label="甲方:" class="postInfo-container-item">
              <span>{{ list.customer_a_Name }}</span>
            </el-form-item>
            <el-form-item label-width="150px" label="乙方:" class="postInfo-container-item">
              <span>{{ list.customer_b_Name }}</span>
            </el-form-item>
            <el-form-item label-width="150px" label="总金额:" class="postInfo-container-item">
              <span>{{ list.money_init }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="100px" label="已付总金额:" class="postInfo-container-item">
              <span>{{ list.paid }}</span>
            </el-form-item>
            <el-form-item label-width="100px" label="支出总金额:" class="postInfo-container-item">
              <span>{{ list.expenses }}</span>
            </el-form-item>
            <el-form-item label-width="100px" label="盈利:" class="postInfo-container-item">
              <span>{{ list.income }}</span>
            </el-form-item>
            <el-form-item label-width="100px" label="签署时间:" class="postInfo-container-item">
              <span>{{ list.signTime }}</span>
            </el-form-item>
            <el-form-item label-width="100px" label="到期时间:" class="postInfo-container-item">
              <span>{{ list.expireTime }}</span>
            </el-form-item>
            <el-form-item label-width="100px" label="摘要:" class="postInfo-container-item">
              <span>{{ list.reamrks1 }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { contractList } from '@/api/contract'
  import waves from '@/directive/waves' // 水波纹指令
  import { toThousands } from '@/utils/common'
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
        contractList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items[0]
            this.total = response.data.total
            this.list.money_init = toThousands(this.list.money_init)
            this.list.paid = toThousands(this.list.paid)
            this.list.income = toThousands(this.list.income)
            this.list.expenses = toThousands(this.list.expenses)
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
