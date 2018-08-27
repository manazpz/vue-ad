<template xmlns:text-decoration="http://www.w3.org/1999/xhtml" xmlns:style="http://www.w3.org/1999/xhtml">
  <div class="app-container">
    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;" @row-click="handdle">
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
      <el-table-column align="center" label="已收金额" width="90">
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
      <el-table-column align="center" label="附件" min-width="90">
        <template slot-scope="scope">
          <a  v-for="(item,index) in scope.row.attaname" style="color:#FF3030;text-decoration:underline;" @click="attention(scope.row,index)" >{{item}};</a>
        </template>
      </el-table-column>

      <el-table-column width="90" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.statusName}}</span>
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


    <!-- 弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rule" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="合同名称"  prop="title" class="postInfo-container-item">
          <el-input v-model="temp.title" required placeholder="请输入合同名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="合同编号"  prop="number" class="postInfo-container-item">
          <el-input  v-model="temp.number"  required placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="商品名称" prop="goodsIds" class="postInfo-container-item">
          <el-select v-model="temp.goodsIds" required multiple placeholder="请选择">
            <el-option v-for="item in goodsOptions" :key="item.goodsId" :label="item.name" :value="item.goodsId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="添加子合同"  class="postInfo-container-item">
          <el-select v-model="temp.subContract" filterable placeholder="请选择父合同编号">
            <el-option v-for="item in contractOptions" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
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
          <el-input type="number" v-model.number ="temp.money_init" required placeholder="请输入合同总金额"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="税率" prop="taxlimit" class="postInfo-container-item">
          <el-input type="number" v-model.number ="temp.taxlimit" required placeholder="请输入税率"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="币种" prop="currency" class="postInfo-container-item">
          <el-select v-model="temp.currency" style="width: 100px" >
            <el-option v-for="item in currencyOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="签署时间" prop="signTime" class="postInfo-container-item">
          <el-date-picker v-model="temp.signTime" type="date" required placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="到期时间" prop="expireTime" class="postInfo-container-item">
          <el-date-picker v-model="temp.expireTime" type="date" required placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
          <el-input v-model="temp.reamrks1" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
        </el-form-item>
        <el-upload
          ref="foreignPersonUploadItem"
          class="avatar-uploader"
          :action="uploadUrl"
          v-model="temp.file"
          name="file"
          :show-file-list="true"
          :multiple="true"
          :limit="9"
          :file-list="fileList"
          :on-change="OnChange"
          :before-remove="beforeRemove"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.PDF,.DOC,.DOCX,.XLS,.XLSX"
          :before-upload="beforeAvatarUpload">
          <el-button type="text">上传附件</el-button>
        </el-upload>
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
  import { contractSubList } from '@/api/contract'
  import { toThousands, commafyback } from '@/utils/common'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  import { customerList } from '@/api/customer'
  import { goodsList } from '@/api/goods'
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
        falg: true,
        tableKey: 0,
        list: null,
        total: null,
        fileList: [],
        calendarTypeOptions: [],
        userListOptions: [],
        currencyOptions: [],
        contractOptions: [],
        goodsOptions: [],
        listLoading: true,
        dialogFormVisible: false,
        dialogStatus: '',
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          type: 'HT',
          name: undefined,
          statusKey: undefined,
          sort: 'lastCreateTime DESC'
        },
        type: { type: '\'CONTRACT\'' },
        currencyType: { type: '\'CURRENCY\'' },
        temp: {
          id: undefined,
          title: '',
          goods: '',
          goodsIds: '',
          subContract: '',
          money: '',
          money_init: '',
          contractType: '',
          number: '',
          file: [],
          fileId: [],
          fileList: [],
          size: [],
          suffix: [],
          types: '',
          name: [],
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
        },
        rules: {
        },
        rule: {}
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
      this.getList()
      this.getType()
    },
    methods: {
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
        goodsList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.goodsOptions = response.data.items
        })
      },
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
            this.list.forEach(function(c) {
              c.money_init = toThousands(c.money_init)
              c.paid = toThousands(c.paid)
              c.income = toThousands(c.income)
              c.url = c.url.split(',')
              c.attaname = c.attaname.split(',')
              c.extend = c.extend.split(',')
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
      },
      handleRemove(file, fileList) {
      },
      beforeRemove(file, fileList) {
        this.$confirm('此操作将删除附件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.file.push(file.id)
        }).catch(_ => {
          return
        })
      },
      OnChange(file, fileList) {
        this.fileList = fileList
      },
      handleAvatarSuccess(response, file, fileList) {
        this.temp.file.push({ url: response.data.url, id: '' })
        this.temp.size.push(response.data.size)
        this.temp.suffix.push(response.data.suffix)
        this.temp.types = 'HT'
        this.temp.name.push(response.data.name)
      },
      beforeAvatarUpload(file) {
      },
      handleUpdate(row) {
        this.falg = false
        this.temp = Object.assign({}, row)
        this.fileList = row.fileList
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.temp.money_init = commafyback(this.temp.money_init)
        this.dialogStatus = '编辑子合同'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.fileId = this.file
            // updateExpnss(this.temps).then((response) => {
            //   if (response.code === 50001) {
            //     store.dispatch('GetRefreshToken').then(() => {
            //       this.updateData()
            //     })
            //   }
            //   if (response.code === 200) {
            //     this.listLoading = false
            //     this.dialogExpnsesVisible = false
            //     this.$notify({
            //       title: '成功',
            //       message: '更新成功',
            //       type: 'success',
            //       duration: 2000
            //     })
            //     this.reload()
            //   }
            // })
          }
        })
      },
      handleModifyStatus(row, isValid) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          // const params = { id: row.id, no: row.no, isValid: isValid }
          // deleteContractPay(params).then(response => {
          //   if (response.code === 50001) {
          //     store.dispatch('GetRefreshToken').then(() => {
          //       this.handleModifyStatus(row, isValid)
          //     })
          //   }
          //   if (response.code === 200) {
          //     this.getList()
          //     this.listLoading = false
          //     this.dialogExpnsesVisible = false
          //     this.$message({
          //       message: '操作成功',
          //       type: 'success'
          //     })
          //     row.del = isValid
          //   }
          // }).catch(() => {
          //   this.listLoading = false
          //   this.falg = true
          // })
        }).catch(_ => {
          return
        })
      },
      attention(val, index) {
        this.falg = false
        window.location.href = process.env.BASE_API + '/contract/getReasourse?name=' + val.attaname[index] + '&extend=' + val.extend[index] + '&url=' + val.url[index]
      },
      handdle(row) {
        if (this.falg) {
          this.$router.push({ path: 'detailSub', query: { id: row.id }})
        } else {
          this.falg = true
        }
      }
    }
  }
</script>
