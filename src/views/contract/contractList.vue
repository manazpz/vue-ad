<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="合同编号" v-model="listQuery.name">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.statusKey"
                 placeholder="合同状态">
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
              style="width: 100%;min-height:1000px;" @row-click="handdle">
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
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.del === 'Y'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, 'N')">{{$t('table.delete')}}
          </el-button>
          <el-button  v-else size="mini" type="success"
                      @click="handleModifyStatus(scope.row, 'Y')">{{$t('table.recovery')}}
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


    <!-- 弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="合同名称"  prop="title" class="postInfo-container-item">
          <el-input v-model="temp.title" required placeholder="请输入合同名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="甲方" prop="customerKeyA" class="postInfo-container-item">
          <el-select v-model="temp.customerKeyA" required filterable placeholder="请选择">
            <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="乙方" prop="customerKeyB" class="postInfo-container-item">
          <el-select v-model="temp.customerKeyB" required filterable placeholder="请选择">
            <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="合同总金额" prop="money_init" class="postInfo-container-item">
          <el-input v-model="temp.money_init" required placeholder="请输入合同总金额"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="已付金额" prop="paid" class="postInfo-container-item">
          <el-input v-model="temp.paid" required placeholder="请输入已付金额"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="税率" prop="tax" class="postInfo-container-item">
          <el-input v-model="temp.tax" required placeholder="请输入税率"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="税额" prop="taxlimit" class="postInfo-container-item">
          <el-input v-model="temp.taxlimit" required placeholder="请输入税额"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="币种" prop="currency" class="postInfo-container-item">
          <el-select v-model="temp.currency" style="width: 100px" >
              <el-option v-for="item in currencyOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="签署时间" prop="signTime" class="postInfo-container-item">
          <el-date-picker v-model="temp.signTime" type="datetime" required placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="到期时间" prop="expireTime" class="postInfo-container-item">
          <el-date-picker v-model="temp.expireTime" type="datetime" required placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
          <el-input v-model="temp.reamrks1" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增合同'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

  </div>
</template>

<script>
  import { contractList, createContract, updateContract, deleteContract } from '@/api/contract'
  import { customerList } from '@/api/customer'
  import { getConfig } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  export default {
    name: 'contractList',
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
        type: { type: '\'CONTRACT\'' },
        currencyType: { type: '\'CURRENCY\'' },
        calendarTypeOptions: [],
        userListOptions: [],
        currencyOptions: [],
        sortOptions: [{ label: '时间正序', key: 'lastCreateTime ASC' }, { label: '时间倒序', key: 'lastCreateTime DESC' }],
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
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        rules: {
          customerKey: [{ required: true, message: '甲方不为空', trigger: 'change' }],
          customer_b: [{ required: true, message: '乙方不为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.getType()
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
        getConfig(this.currencyType).then(response => {
          this.currencyOptions = response.data.items
        })
        customerList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items
        })
      },
      handdle(row) {
        this.$router.push({ path: 'detail', query: { id: row.id }})
        // this.$router.push('detail')
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
        const params = { id: row.id, isValid: isValid }
        deleteContract(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.deleteCustomer()
            })
          }
          if (response.code === 200) {
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.isValid = isValid
            this.getList()
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
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
          tax: '',
          taxlimit: '',
          currency: '',
          customerKeyA: '',
          customerKeyB: '',
          reamrks1: '',
          status: 'published'
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增合同'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createContract(this.temp).then(response => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = '编辑合同'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp)
            this.listLoading = true
            updateContract(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      handleDelete(row) {
      }
    }
  }
</script>
