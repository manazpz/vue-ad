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
      <el-table-column align="center" label="收支类型" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.typePay}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="费用类型" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.costType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="税额" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.tax_limit}}</span>
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
      <el-table-column align="center" label="备注" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.remarks1}}</span>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="附件" min-width="110">
        <template slot-scope="scope">
          <a v-for="(item,index) in scope.row.file" style="color:#FF3030;text-decoration:underline;"  :href=" item.url " target="_blank">{{item.name}};</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.creattime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150" class-name="small-padding fixed-width">
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

    <!-- 弹出框新增收付款明细 start -->
    <el-dialog :title="dialogExpnses" :visible.sync="dialogExpnsesVisible">
      <el-form :rules="rule" ref="dataFormExpnses" :model="temps" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="收支类型" prop="typePay" class="postInfo-container-item">
          <el-select v-model="temps.typePay" required filterable placeholder="请选择">
            <el-option v-for="item in typePayOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="费用类型" prop="costType" class="postInfo-container-item">
          <el-select v-model="temps.costTypeKey" required filterable placeholder="请选择">
            <el-option v-for="item in costTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="付款人" prop="payer" class="postInfo-container-item">
          <el-select v-model="temps.payerId" required filterable placeholder="请选择">
            <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="收款人" prop="payee" class="postInfo-container-item">
          <el-select v-model="temps.payeeId" required filterable placeholder="请选择">
            <el-option v-for="item in userListOptions" :key="item.customerId" :label="item.customerName" :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="金额" prop="amount" class="postInfo-container-item">
          <el-input type="number" v-model.number ="temps.amount" required></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
          <el-input v-model="temps.remarks1" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
        </el-form-item>
        <el-upload
          ref="foreignPersonUploadItem"
          class="avatar-uploader"
          v-model="temps.file"
          :action="uploadUrl"
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
        <el-button v-if="dialogExpnses=='新增收支明细'" type="primary" @click="createDataExpnses">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框新增收付款明细 end -->

  </div>
</template>

<script>
  import { expnsesList, createcontractExpnses, cancleExpnses, updateExpnss, deleteContractPay } from '@/api/contract'
  import { toThousands, commafyback } from '@/utils/common'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  import { customerList } from '@/api/customer'
  import { getConfig } from '@/api/user'
  export default {
    name: 'contractDetailSub',
    inject: ['reload'],
    directives: {
      waves
    },
    data() {
      return {
        uploadUrl: process.env.BASE_API + '/contract/uploadFile',
        tableKey: 0,
        listData: null,
        total: null,
        fileList: [],
        file: [],
        userListOptions: [],
        costTypeOptions: [],
        typePayOptions: [],
        paytype: { type: '\'TYPEPAY\'' },
        costType: { type: '\'COSTTYPE\'' },
        listLoading: true,
        dialogExpnsesVisible: false,
        dialogExpnses: '',
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          type: 'SZ',
          name: undefined,
          statusKey: undefined,
          sort: 'lastCreateTime DESC'
        },
        temps: {
          id: undefined,
          type: 'HT',
          file: [],
          fileId: [],
          size: [],
          suffix: [],
          typePay: '',
          costType: '',
          name: [],
          amount: '',
          payee: '',
          payer: '',
          proportions: '',
          remarks1: '',
          status: 'published'
        },
        rule: {
        }
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
      this.getList()
      this.getType()
    },
    methods: {
      getType() {
        getConfig(this.costType).then(response => {
          this.costTypeOptions = response.data.items
        })
        getConfig(this.paytype).then(response => {
          this.typePayOptions = response.data.items
        })
        customerList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items
        })
      },
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
              if (c.typePayKey === 'SK') {
                c.tax_limit = c.tax_limit * c.amount / 100
              } else {
                c.tax_limit = 0
              }
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
      handleUpdate(row) {
        this.temps = Object.assign({}, row)
        this.fileList = row.file
        this.temps.timestamp = new Date(this.temps.timestamp)
        this.temps.amount = commafyback(this.temps.amount)
        this.dialogExpnses = '编辑收支明细'
        this.dialogExpnsesVisible = true
        this.$nextTick(() => {
          this.$refs['dataFormExpnses'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataFormExpnses'].validate((valid) => {
          if (valid) {
            updateExpnss(this.temps).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.reload()
                this.listLoading = false
                this.dialogExpnsesVisible = false
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
      },
      handleModifyStatus(row, isValid) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { row: row, isValid: isValid }
          deleteContractPay(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row, isValid)
              })
            }
            if (response.code === 200) {
              this.reload()
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
      cancleDataExpnses() {
        cancleExpnses(this.temps).then(response => {
          if (response.code === 200) {
            this.dialogExpnsesVisible = false
            this.getList()
          }
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
      handleRemove(file, fileList) {
        this.temps.file = fileList
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
        this.fileList = fileList
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
      handleUpload(val, index) {
        window.location.href = val.url[index]
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
