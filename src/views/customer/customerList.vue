<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('customer.customerName')" v-model="listQuery.customerName">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sex"
                 :placeholder="$t('customer.sex')">
        <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.typeKey"
                 :placeholder="$t('customer.typeName')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.keyWord" :label="item.name"
                   :value="item.keyWord">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">{{$t('table.add')}}
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item :label="$t('customer.idCard')" >
                <span>{{scope.row.idCard}}</span>
            </el-form-item>
            <el-form-item :label="$t('customer.bank')" >
                <span>{{scope.row.bank}}</span>
            </el-form-item>
            <el-form-item :label="$t('customer.bankNo')" >
                <span>{{scope.row.bankNo}}</span>
            </el-form-item>
            <el-form-item :label="$t('customer.address')" >
                <span>{{scope.row.address}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.customerName')" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.sex')" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.typeName')" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.code')" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.createUserName')" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.createUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.lastCreateUserName')" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.lastCreateUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.createTime')" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('customer.lastCreateTime')" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.lastCreateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" :label="$t('table.status')">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.isValid === 'Y'" icon-class="valid" class="table-status" />
          <svg-icon v-else icon-class="noValid" class="table-status" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button  size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, 'N')">{{$t('table.delete')}}
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

    <!-- 编辑弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" :label="$t('customer.customerName')" prop="customerName" class="postInfo-container-item">
          <el-input v-model="temp.customerName" required placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.code')" prop="code" class="postInfo-container-item">
          <el-input v-model="temp.code" required placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.sex')" class="postInfo-container-item">
          <el-select v-model="temp.sex" style="width: 100px" >
            <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.idCard')" prop="idCard" class="postInfo-container-item">
          <el-input v-model="temp.idCard" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.bank')" prop="bank" class="postInfo-container-item">
          <el-input v-model="temp.bank" required placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.bankNo')" prop="bankNo" class="postInfo-container-item">
          <el-input v-model="temp.bankNo" required placeholder="请输入开户行账号"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.typeName')" class="postInfo-container-item">
          <el-select v-model="temp.typeKey">
            <el-option v-for="item in calendarTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('customer.address')" prop="address">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="temp.address" required style="width: 500px">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { customerList, updateCustomer, deleteCustomer } from '@/api/customer'
  import { getConfig } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  import { keyToValue } from '@/utils/common'
  import { checkIdCard, checkPhone, checkBankNo } from '@/utils/validate'

  export default {
    name: 'customerList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        btnLoading: false,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          customerName: undefined,
          sex: undefined,
          typeKey: undefined,
          sort: 'lastCreateTime DESC'
        },
        type: { type: '\'CUSTOMER\'' },
        sexOptions: ['男', '女'],
        calendarTypeOptions: [],
        sortOptions: [{ label: '时间正序', key: 'lastCreateTime ASC' }, { label: '时间倒序', key: 'lastCreateTime DESC' }],
        temp: {
          customerId: undefined,
          customerName: '',
          customerUser: '',
          code: '',
          sex: '男',
          idCard: '',
          bank: '',
          bankNo: '',
          typeKey: 'PC',
          address: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          customerName: [{ required: true, message: '客户名不为空', trigger: 'blur' }],
          code: [{ required: true, validator: checkPhone, trigger: 'blur' }],
          idCard: [{ required: false, validator: checkIdCard, trigger: 'blur' }],
          bank: [{ required: true, message: '客户开户行不为空', trigger: 'blur' }],
          bankNo: [{ required: true, validator: checkBankNo, trigger: 'blur' }],
          address: [{ required: true, message: '客户地址不为空', trigger: 'blur' }]
        }
      }
    },
    watch: {
      '$route': 'getList'
    },
    created() {
      this.getType()
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        customerList(this.listQuery).then(response => {
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
      getType() {
        getConfig(this.type).then(response => {
          this.calendarTypeOptions = response.data.items
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
        this.listLoading = true
        const params = { id: row.customerId, isValid: isValid }
        deleteCustomer(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleModifyStatus(row, isValid)
            })
          }
          if (response.code === 200) {
            this.getList()
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.isValid = isValid
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCreate() {
        this.$router.push({ path: '/customer/edit' })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = '更新客户'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            updateCustomer(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                for (const v of this.list) {
                  if (v.customerId === this.temp.customerId) {
                    const index = this.list.indexOf(v)
                    this.temp.typeName = keyToValue(this.calendarTypeOptions)[this.temp.typeKey]
                    this.list.splice(index, 1, this.temp)
                    break
                  }
                }
                this.btnLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.btnLoading = false
            })
          }
        })
      },
      handleDelete(row) {
      }
    }
  }
</script>
