<template>
  <div class="tab-container">
    <el-form class="form-container" :model="list" :rules="rules" ref="temp">
    <h2 style="margin-top:0;">{{ activeTitle }}</h2>
      <!-- 悬浮框 start -->
      <sticky :className="'sub-navbar '+temp.status">
        <el-button  style="margin-left: 10px;" type="success" @click="handleCreate">新增合伙人
        </el-button><el-button  style="margin-left: 10px;" type="success" @click="handleCreatePay">新增收支明细
      </el-button>
      </sticky>
      <!-- 悬浮框 end -->
      <hr>
    <el-row :gutter="20">
      <el-col :span="8">名称: {{ list.title }}</el-col>
      <el-col :span="8">起始时间: {{ list.signTime }}</el-col>
      <el-col :span="4">结束时间: {{ list.expireTime }}</el-col>
    </el-row>
    <hr>

    <div class="createPost-main-container">
      <div class="postInfo-container">
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

      <hr>
      <h4 style="margin-top:0;">收支明细</h4>
      <!-- 表格 start -->
      <el-table :key='tableKey' :data="listData" v-loading="listLoading" border fit highlight-current-row
                style="width: 100%;min-height:300px;">
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

      <!-- Tab页签 start -->
      <hr>
      <h4 style="margin-top:0;">其他信息</h4>
      <el-tabs v-model="activeName">
        <el-tab-pane label="子合同" name="first">
          <subContract></subContract>
        </el-tab-pane>
        <el-tab-pane label="合作伙伴" name="second">
          <partner></partner>
        </el-tab-pane>
      </el-tabs>
      <!-- Tab页签 end -->


    <!-- 弹出框新增合作伙伴 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="合作伙伴" prop="user" class="postInfo-container-item">
          <el-select v-model="temp.user" required filterable placeholder="请选择">
            <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="客户性质" prop="types" class="postInfo-container-item">
          <el-select v-model="temp.types" style="width: 100px" >
            <el-option v-for="item in typeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="当前收益" class="postInfo-container-item">
          <el-input v-model="temp.income" disabled true></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="抽成比例" prop="proportions" class="postInfo-container-item">
          <el-input type="number" v-model.number="temp.proportions" required placeholder="请输入抽成比例（填写数字）"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
          <el-input v-model="temp.reamrks1" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
      <!-- 弹出框新增合作伙伴 end -->


      <!-- 弹出框新增收付款明细 start -->
      <el-dialog :title="dialogExpnses" :visible.sync="dialogExpnsesVisible">
        <el-form :rules="rule" ref="dataFormExpnses" :model="temps" label-position="left" label-width="70px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label-width="110px" label="类型" prop="typePaye" class="postInfo-container-item">
            <el-select v-model="temps.typePaye" required filterable placeholder="请选择">
              <el-option v-for="item in typePayOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="110px" label="付款人" prop="payer" class="postInfo-container-item">
            <el-select v-model="temps.payer" required filterable placeholder="请选择">
              <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="110px" label="收款人" prop="payee" class="postInfo-container-item">
            <el-select v-model="temps.payee" required filterable placeholder="请选择">
              <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="110px" label="金额" prop="amount" class="postInfo-container-item">
            <el-input type="number" v-model.number ="temps.amount" required></el-input>
          </el-form-item>
          <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
            <el-input v-model="temps.reamrks1" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogExpnsesVisible = false">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="createDataExpnses">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- 弹出框新增收付款明细 end -->


    <transition name="fade">
      <router-view></router-view>
    </transition>
    </el-form>
  </div>
</template>
<script>
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { createContractPartner, contractList, createcontractExpnses, expnsesList } from '@/api/contract'
  import { toThousands } from '@/utils/common'
  import { customerList } from '@/api/customer'
  import { getConfig } from '@/api/user'
  import store from '@/store'
  import subContract from './components/contractDetailSub'
  import partner from './components/contractDetailPartner'
  export default {
    name: 'contractDetail',
    components: { Sticky, subContract, partner },
    data: function() {
      return {
        tableKey: 0,
        activeName: 'first',
        list: null,
        listData: null,
        total: null,
        listLoading: true,
        type: { type: '\'TYPEC\'' },
        typePay: { type: '\'TYPEPAY\'' },
        tabMapOptions: [
          { label: '子合同', key: 'CN' },
          { label: '合作伙伴', key: 'US' }
        ],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          type: undefined,
          income: '',
          title: '',
          id: '',
          remarks: ''
        },
        temp: {
          id: undefined,
          types: '',
          contractId: '',
          income: '',
          user: '',
          proportions: '',
          reamrks1: '',
          status: 'published'
        },
        temps: {
          id: undefined,
          type: '',
          typePaye: '',
          amount: '',
          payee: '',
          payer: '',
          proportions: '',
          reamrks1: '',
          status: 'published'
        },
        typeOptions: [],
        typePayOptions: [],
        userListOptions: [],
        activeTitle: '合同明细',
        title: '',
        signTime: '',
        expireTime: '',
        dialogFormVisible: false,
        dialogStatus: '',
        dialogExpnsesVisible: false,
        dialogExpnses: '',
        rules: {
          user: [{ required: true, message: '合作伙伴不能为空', trigger: 'change' }],
          types: [{ required: true, message: '客户性质不能为空', trigger: 'change' }],
          proportions: [{ required: true, message: '抽成比例不能为空', trigger: 'change' }]
        },
        rule: {
          typePaye: [{ required: true, message: '类型不能为空', trigger: 'change' }],
          payer: [{ required: true, message: '付款人不能为空', trigger: 'change' }],
          payee: [{ required: true, message: '收款人不能为空', trigger: 'change' }],
          amount: [{ required: true, message: '金额不能为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
      this.temps.id = this.$route.query.id
      this.getType()
      this.getList()
    },
    methods: {
      getType() {
        getConfig(this.type).then(response => {
          this.typeOptions = response.data.items
        })
        getConfig(this.typePay).then(response => {
          this.typePayOptions = response.data.items
        })
      },
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
        customerList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items
        })
        expnsesList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.listData = response.data.items
          this.list.forEach(function(c) {
            c.amount = toThousands(c.amount)
          })
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          types: '',
          contractId: '',
          income: '',
          user: '',
          proportions: '',
          reamrks1: '',
          status: 'published'
        }
      },
      resetTempExpnses() {
        this.temps = {
          id: undefined,
          types: '',
          typePaye: '',
          contractId: '',
          income: '',
          user: '',
          proportions: '',
          remarks1: '',
          status: 'published'
        }
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
      handleCreate() {
        this.resetTemp()
        this.temp.income = this.list.income
        this.temp.contractId = this.list.id
        this.dialogStatus = '新增合作伙伴'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreatePay() {
        this.resetTempExpnses()
        this.temps.id = this.$route.query.id
        this.dialogExpnses = '新增收支明细'
        this.dialogExpnsesVisible = true
        this.$nextTick(() => {
          this.$refs['dataFormExpnses'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createContractPartner(this.temp).then(response => {
              if (response.code === 200) {
                this.listLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
            this.getList()
          }
        })
      },
      createDataExpnses() {
        this.$refs['dataFormExpnses'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createcontractExpnses(this.temps).then(response => {
              if (response.code === 200) {
                this.listLoading = false
                this.dialogExpnsesVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .tab-container{
    margin: 30px;
  }
  .el-form-item{
    margin-bottom: 10px !important;
  }
</style>
