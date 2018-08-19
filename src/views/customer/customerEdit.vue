<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <!-- 悬浮框 start -->
      <sticky :className="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
      </sticky>
      <!-- 悬浮框 end -->

      <!-- 正文 start -->
      <div class="createPost-main-container">
        <div class="postInfo-container">
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="150px" :label="$t('customer.customerName')" prop="customerName" class="postInfo-container-item">
                <el-input v-model="postForm.customerName" required placeholder="请输入客户名称"></el-input>
              </el-form-item>
              <el-form-item label-width="150px" :label="$t('customer.customerUser')" prop="customerUser" class="postInfo-container-item">
                <el-input v-model="postForm.customerUser" required placeholder="账号，可与手机号一致"></el-input>
              </el-form-item>
              <el-form-item label-width="150px" :label="$t('customer.code')" prop="code" class="postInfo-container-item">
                <el-input type="number" v-model.number ="postForm.code" required placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label-width="150px" :label="$t('customer.sex')" prop="sex"  class="postInfo-container-item">
                <el-select v-model="postForm.sex" style="width: 100px" >
                  <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item" >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="100px" :label="$t('customer.idCard')" prop="idCard" class="postInfo-container-item">
                <el-input type="number" v-model.number ="postForm.idCard" required placeholder="请输入身份证"></el-input>
              </el-form-item>
              <el-form-item label-width="100px" :label="$t('customer.bank')" prop="bank" class="postInfo-container-item">
                <el-input v-model="postForm.bank" placeholder="请输入开户行"></el-input>
              </el-form-item>
              <el-form-item label-width="100px" :label="$t('customer.bankNo')" prop="bankNo"  class="postInfo-container-item">
                <el-input type="number" v-model.number ="postForm.bankNo" required placeholder="请输入开户行账号"></el-input>
              </el-form-item>
              <el-form-item label-width="100px" :label="$t('customer.typeName')" prop="type"  class="postInfo-container-item">
                <el-select  v-model="postForm.type">
                  <el-option v-for="item in calendarTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label-width="150px" :label="$t('customer.address')" prop="address"  class="postInfo-container-item">
            <el-input type="textarea"  :rows="5" placeholder="请输入地址" v-model="postForm.address" style="width: 500px">
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 正文 end -->

    </el-form>
  </div>
</template>

<script>
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { getConfig } from '@/api/user'
  import { insertCustomer } from '@/api/customer'
  import store from '@/store'

  const defaultForm = {
    customerId: undefined,
    customerName: '',
    customerUser: '',
    code: '',
    sex: '男',
    idCard: '',
    bank: '',
    bankNo: '',
    type: '',
    address: '',
    status: 'published'
  }

  export default {
    name: 'customerEdit',
    components: { Sticky },
    data() {
      return {
        postForm: Object.assign({}, defaultForm),
        loading: false,
        sexOptions: ['男', '女'],
        type: { type: '\'CUSTOMER\'' },
        calendarTypeOptions: [],
        rules: {
          customerName: [{ required: true, message: '客户名不为空', trigger: 'change' }],
          customerUser: [{ required: true, message: '客户账号不为空', trigger: 'change' }],
          code: [{ required: true, message: '客户手机号不为空', trigger: 'change' }],
          sex: [{ required: true, message: '客户性别不为空', trigger: 'change' }],
          idCard: [{ required: true, message: '客户身份证号不为空', trigger: 'change' }],
          bank: [{ required: true, message: '客户开户行不为空', trigger: 'change' }],
          bankNo: [{ required: true, message: '客户开户行账号不为空', trigger: 'change' }],
          typeKey: [{ required: true, message: '客户类型不为空', trigger: 'change' }],
          address: [{ required: true, message: '客户地址不为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.getType()
    },
    methods: {
      getType() {
        getConfig(this.type).then(response => {
          this.calendarTypeOptions = response.data.items
        })
      },
      submitForm() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            insertCustomer(this.postForm).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.submitForm()
                })
              }
              if (response.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
                this.loading = false
                this.$router.push({ path: '/customer/list' })
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
</style>
