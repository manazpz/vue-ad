<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="商品名称" v-model="listQuery.name">
      </el-input>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.typeKey"
                 placeholder="商品类型">
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
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品编码" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品别名" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.alias}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单位" width="70">
        <template slot-scope="scope">
          <span>{{scope.row.unitName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.price | priceFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.createUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改人" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.lastCreateUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.lastCreateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" label="状态">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.status === 'Y'" icon-class="valid" class="table-status" />
          <svg-icon v-else icon-class="noValid" class="table-status" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status === 'Y'" size="mini" type="danger"
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
        <el-form-item label-width="110px" label="商品名称" prop="name" class="postInfo-container-item">
          <el-input v-model="temp.name" required placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="商品别名" prop="alias" class="postInfo-container-item">
          <el-input v-model="temp.alias" required placeholder="请输入商品别名"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="商品类型" class="postInfo-container-item">
          <el-select v-model="temp.typeKey">
            <el-option v-for="item in calendarTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="单位" class="postInfo-container-item">
          <el-select v-model="temp.unitKey">
            <el-option v-for="item in unitTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="价格" prop="price" class="postInfo-container-item">
          <el-input v-model="temp.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="备注"  class="postInfo-container-item">
          <el-input v-model="temp.remarks" type="textarea"  :rows="5"  placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增商品'" v-loading="btnLoading" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

  </div>
</template>

<script>
  import { goodsList, createGoods, updateGoods, deleteGoods } from '@/api/goods'
  import { keyToValue, toThousands } from '@/utils/common'
  import { checkNo } from '@/utils/validate'
  import { getConfig } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'goodsList',
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
          name: undefined,
          typeKey: undefined,
          sort: 'lastCreateTime DESC'
        },
        type: { type: '\'GOODS\'' },
        unit: { type: '\'UNIT\'' },
        calendarTypeOptions: [],
        unitTypeOptions: [],
        sortOptions: [{ label: '时间正序', key: 'lastCreateTime ASC' }, { label: '时间倒序', key: 'lastCreateTime DESC' }],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          name: '',
          alias: '',
          typeKey: 'GPGG',
          unitKey: 'UP',
          price: '',
          remarks: '',
          status: 'published'
        },
        rules: {
          name: [{ required: true, message: '商品名不为空', trigger: 'blur' }],
          alias: [{ required: true, message: '商品别名不为空', trigger: 'blur' }],
          price: [{ required: true, validator: checkNo, trigger: 'blur' }]
        }
      }
    },
    filters: {
      priceFilter(value) {
        return toThousands(value)
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
        goodsList(this.listQuery).then(response => {
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
        getConfig(this.unit).then(response => {
          this.unitTypeOptions = response.data.items
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
        const params = { id: row.goodsId, isValid: isValid }
        deleteGoods(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleModifyStatus(row, isValid)
            })
          }
          if (response.code === 200) {
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.status = isValid
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          alias: '',
          typeKey: 'GPGG',
          unitKey: 'UP',
          price: '',
          remarks: '',
          status: 'published'
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增商品'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            createGoods(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.getList()
                this.btnLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = '编辑商品'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            updateGoods(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                for (const v of this.list) {
                  if (v.goodsId === this.temp.goodsId) {
                    const index = this.list.indexOf(v)
                    this.temp.typeName = keyToValue(this.calendarTypeOptions)[this.temp.typeKey]
                    this.temp.unitName = keyToValue(this.unitTypeOptions)[this.temp.unitKey]
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
