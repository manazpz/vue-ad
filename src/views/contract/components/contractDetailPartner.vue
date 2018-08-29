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
      <el-table-column align="center" label="合伙人" min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同总金额" min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.money_init}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="抽成比例" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.pro}}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="盈利" min-width="60">
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
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
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

    <!-- 弹出框合作伙伴 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temps" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="合作伙伴" prop="user" class="postInfo-container-item">
          <el-select v-model="temps.user" required filterable placeholder="请选择">
            <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="当前收益" class="postInfo-container-item">
          <el-input v-model="temps.income" disabled true></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="抽成比例" prop="proportions" class="postInfo-container-item">
          <el-input type="number" v-model.number="temps.pro" required placeholder="请输入抽成比例（填写数字）"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
          <el-input v-model="temps.remarks1" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框新增合作伙伴 end -->



  </div>
</template>

<script>
  import { getContract, updatePartner, deleteContractPaetenr } from '@/api/contract'
  import { toThousands } from '@/utils/common'
  import { customerList } from '@/api/customer'
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
        userListOptions: [],
        dialogFormVisible: false,
        dialogStatus: '',
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        rules: {},
        temps: {
          id: undefined,
          contractId: '',
          customerId: '',
          income: '',
          user: '',
          proportions: '',
          remarks1: '',
          status: 'published'
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
        customerList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items
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
      handleUpdate(row) {
        this.temps = Object.assign({}, row)
        this.temps.timestamp = new Date(this.temps.timestamp)
        // this.temps.amount = commafyback(this.temps.amount)
        this.dialogStatus = '编辑合作伙伴'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleModifyStatus(row, isValid) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { id: row.id, no: row.no, isValid: isValid }
          deleteContractPaetenr(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row, isValid)
              })
            }
            if (response.code === 200) {
              this.getList()
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
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updatePartner(this.temps).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.listLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
                this.reload()
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
