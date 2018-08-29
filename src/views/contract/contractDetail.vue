<template>
  <div class="app-container">
    <el-form class="form-container" :model="list" :rules="rules" ref="temp">
      <!-- 悬浮框 start -->
      <sticky :className="'sub-navbar '+temp.status">
        <el-button  style="margin-left: 10px;" type="success" @click="handleCreate">新增合伙人
        </el-button><el-button  style="margin-left: 10px;" type="success" @click="handleCreatePay">新增收支明细
      </el-button>
      </sticky>
      <!-- 悬浮框 end -->
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
              <el-form-item label-width="100px" label="收款总金额:" class="postInfo-container-item">
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
      <!-- Tab页签 start -->
      <hr>
      <el-tabs v-model="activeName">
        <el-tab-pane label="收支明细" name="first">
          <contractPay></contractPay>
        </el-tab-pane>
        <el-tab-pane label="子合同" name="second">
          <subContract></subContract>
        </el-tab-pane>
        <el-tab-pane label="合作伙伴" name="third">
          <partner></partner>
        </el-tab-pane>
        <el-tab-pane label="附件" name="fourth">
          <atta></atta>
        </el-tab-pane>
        <el-tab-pane label="商品" name="fifth">
          <goods></goods>
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
          <el-form-item label-width="110px" label="收支类型" prop="typePayes" class="postInfo-container-item">
            <el-select v-model="temps.typePayes" required filterable placeholder="请选择">
              <el-option v-for="item in typePayOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="110px" label="费用类型" prop="costType" class="postInfo-container-item">
            <el-select v-model="temps.costType" required filterable placeholder="请选择">
              <el-option v-for="item in costTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
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
          <el-upload
            ref="foreignPersonUploadItem"
            class="avatar-uploader"
            :action="uploadUrl"
            v-model="temps.file"
            name="file"
            :show-file-list="true"
            :multiple="true"
            :limit="9"
            :file-list="fileList"
            :on-change="OnChange"
            :on-remove="OnRemove"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccess"
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.PDF,.DOC,.DOCX,.XLS,.XLSX"
            :before-upload="beforeAvatarUpload">
            <el-button type="text">上传附件</el-button>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleDataExpnses">{{$t('table.cancel')}}</el-button>
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
  import { toThousands } from '@/utils/common'
  import { createContractPartner, createcontractExpnses, contractList, cancleExpnses } from '@/api/contract'
  import { customerList } from '@/api/customer'
  import { getConfig } from '@/api/user'
  import store from '@/store'
  import msgContract from './components/contractDetailMsg'
  import contractPay from './components/contractDetailPay'
  import subContract from './components/contractDetailSub'
  import partner from './components/contractDetailPartner'
  import atta from './components/contractDetailAtta'
  import goods from './components/contractDetailGoods'
  export default {
    name: 'contractDetail',
    inject: ['reload'],
    components: { Sticky, subContract, partner, msgContract, contractPay, atta, goods },
    data: function() {
      return {
        uploadUrl: process.env.BASE_API + '/contract/uploadFile',
        fileList: [],
        tableKey: 0,
        activeName: 'first',
        list: { title: '' },
        listData: null,
        total: null,
        listLoading: true,
        type: { type: '\'TYPEC\'' },
        typePay: { type: '\'TYPEPAY\'' },
        costType: { type: '\'COSTTYPE\'' },
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
          file: [],
          size: [],
          suffix: [],
          typePayes: '',
          costType: '',
          name: [],
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
        costTypeOptions: [],
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
          typePayes: [{ required: true, message: '收支类型不能为空', trigger: 'change' }],
          costType: [{ required: true, message: '费用类型不能为空', trigger: 'change' }],
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
        getConfig(this.costType).then(response => {
          this.costTypeOptions = response.data.items
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
          file: [],
          size: [],
          name: [],
          suffix: [],
          typePayes: '',
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
      beforeRemove(files, fileList) {
        return this.$confirm('此操作将删除附件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          return true
        })
      },
      OnChange(file, fileList) {
        this.fileList = fileList
      },
      OnRemove(file, fileList) {
        this.temps.file = fileList
      },
      handleAvatarSuccess(response, file, fileList) {
        this.temps.file = fileList
      },
      beforeAvatarUpload(file) {
      },
      deleteImg(index) { // 点击删除删除图片
        this.form.attachment.splice(index, 1)
        this.$refs.uploadItem.uploadFiles.splice(index, 1)
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
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.reload()
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
          }
        })
      },
      cancleDataExpnses() {
        cancleExpnses(this.temps).then(response => {
          if (response.code === 200) {
            this.dialogExpnsesVisible = false
            this.getList()
          }
        })
      },
      createDataExpnses() {
        this.$refs['dataFormExpnses'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createcontractExpnses(this.temps).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.getList()
                })
              }
              if (response.code === 200) {
                this.reload()
                this.listLoading = false
                this.dialogExpnsesVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
                setTimeout(() => {
                  this.listLoading = false
                }, 1.5 * 1000)
              }
            }).catch(() => {
              this.listLoading = false
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
