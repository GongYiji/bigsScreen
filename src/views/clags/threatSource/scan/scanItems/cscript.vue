<template>
  <div class="script">
    <div class="script-serach">
      <el-form :inline="true" :model="queryParams" ref="queryParams" class="form">
        <el-form-item prop="scriptName">
          <el-input v-model="queryParams.scriptName" @change="handleQuery()" placeholder="搜索脚本名称"
            prefix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetQuery('queryParams')">重 置</el-button>
        </el-form-item>
      </el-form>
      <div class="serach-btn">
        <el-button type="primary" icon="el-icon-plus" @click="toAdd()">添加脚本</el-button>
      </div>
    </div>
    <div class="script-content">
      <el-table :data="tableData" style="width: 98%;margin: 15px;margin-bottom: 0;border: 1px solid #f0f0f0;"
        v-loading="loading" height="50vh">
        <el-table-column prop="scriptName" label="脚本名称">
          <template slot-scope="scope">
            <div v-if="index==scope.$index">
              <el-form :model="form" ref="form" class="form-inp">
                <el-form-item prop="scriptName">
                  <el-input v-model="form.scriptName" style="width: 200px;" size="small">
                  </el-input>
                  <el-button type="primary" icon="el-icon-check" size="small"
                    @click="fnreviseScript(scope.row,scope.$index)"></el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-else>
              <span>{{scope.row.scriptName}} <i class="el-icon-edit" @click="clickInp(scope.row,scope.$index)"></i>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="scriptOriginalName" label="脚本原名称">
        </el-table-column>
        <el-table-column prop="systemType" label="系统类型" width="150px">
          <template slot-scope="scope">
            <div v-if="scope.row.systemType == 0">
              Linux
            </div>
            <div v-else>
              Windows
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <div v-if="scope.row.remark == ''">
              - -
            </div>
            <div v-else>
              {{scope.row.remark}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单完成 -->
      <div class="pagination">
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
          @pagination="fngetScriptList()" />
      </div>
      <!-- 分页器完成 -->
      <div class="cscript-dialog">
        <el-dialog title="添加脚本" :visible.sync="open" width="30%">
          <div class="dialog-content">
            <el-form class="dialog-form" ref="form" :model="form" :rules="rules" label-width="90px">
              <el-form-item label="脚本名称:" prop="scriptName">
                <el-input v-model="form.scriptName" style="width: 330px;" placeholder="请输入脚本名称"></el-input>
              </el-form-item>
              <el-form-item label="file文件流:" prop="file">
                <el-upload ref="upload" action=" " class="upload-demo" :http-request="httpRequest" accept=".sh,.py,.php"
                  :multiple="false" :limit="1" :auto-upload="false" :file-list="form.file">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip"></div>
                </el-upload>
              </el-form-item>
              <el-form-item label="系统类型:" prop="systemType">
                <el-radio-group v-model="form.systemType">
                  <el-radio :label="'0'">Linux</el-radio>
                  <el-radio :label="'1'">Windows</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="添加备注:" prop="remark">
                <el-input type="textarea" :rows="5" v-model="form.remark" style="width: 330px;"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getScriptList,
    addScript,
    deleteScript,
    reviseScript
  } from '@/api/clags/threatSource/scan/cscript.js'
  export default {
    name: 'cscript',
    data() {
      return {
        loading: false, //刷新提示
        flag: true, //控制编辑按钮
        open: false, //打开弹框
        total: 0, //总数
        tableData: [], //表格数据
        // 查询
        queryParams: {
          scriptId: "", //脚本id
          scriptName: "", //脚本名称
          scriptOriginalName: "", //脚本文件全名
          scriptPath: "", //脚本路径
          scriptType: "", //脚本类型 0：脚本，1:命令集
          systemType: "", //使用于系统 0:linux，1:windows
          scriptFlag: "", //是否允许删除,0不允许,1允许
          pageNum: 1,
          pageSize: 10
        },
        index: null,
        data: {},
        // 表单
        form: {
          scriptName: null, //脚本名称
          file: null, //传file文件流！！！！
          scriptType: "0", //脚本类型 0：脚本，1:命令集
          systemType: null, //使用于系统 0:linux，1:windows
          scriptFlag: "1" //是否允许删除,0不允许,1允许 (默认不允许)
        },
        upload: {
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/rzxsystem/script",
        },
        // 规则
        rules: {
          systemType: [{
            required: true,
            message: '请选择系统类型',
            trigger: 'change'
          }],
          scriptName: [{
              required: true,
              message: '请输入脚本名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    methods: {
      httpRequest(param) {
        this.form.file = param.file
      },
      // 修改
      fnreviseScript(row, index) {
        let data = {
          scriptId: row.scriptId,
          scriptName: this.form.scriptName
        }
        reviseScript(data).then(res => {
          this.fngetScriptList()
        })
        this.$notify({
          message: '修改成功',
          type: 'success'
        });
        this.index = null
      },
      clickInp(row, index) {
        this.form.scriptName = row.scriptName
        this.index = index
      },
      // 删除
      delRow(row) {
        let data = {
          scriptId: row.scriptId
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return deleteScript(data);
        }).then(() => {
          this.fngetScriptList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      // 提交表单
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$refs.upload.submit()
            const fd = new FormData()
            Object.keys(this.form).forEach(key => {
              if (this.form[key] instanceof Array) {
                // 如果是数组就循环加入表单，key保持相同即可，这就是表单的数组
                this.form[key].forEach(item => {
                  fd.append(key, item)

                })
              } else {
                // 如果不是数组就直接追加进去
                fd.append(key, this.form[key])
              }
            })
            addScript(fd).then(res => {
              this.$modal.msgSuccess("添加成功");
              this.open = false;
              this.fngetScriptList();
            })
            this.reset()
          }
        });
      },
      // 添加脚本
      toAdd() {
        this.reset()
        this.open = true
        this.title = "添加脚本"
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 表格数据
      fngetScriptList() {
        this.loading = true
        let data = {
          scriptId: this.queryParams.scriptId, //脚本id
          scriptName: this.queryParams.scriptName, //脚本名称
          scriptOriginalName: this.queryParams.scriptOriginalName, //脚本文件全名
          scriptPath: this.queryParams.scriptPath, //脚本路径
          scriptType: this.queryParams.scriptType, //脚本类型 0：脚本，1:命令集
          systemType: this.queryParams.systemType, //使用于系统 0:linux，1:windows
          scriptFlag: this.queryParams.scriptFlag, //是否允许删除,0不允许,1允许
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize
        }
        getScriptList(data).then(res => {
          this.tableData = res.rows
          this.total = res.total
          this.loading = false
        })
      },
      //取消
      cancel() {
        this.open = false
        this.reset()
      },
      // 重置
      reset() {
        this.form = {
          scriptName: null, //脚本名称
          file: null, //传file文件流！！！！
          scriptType: "0", //脚本类型 0：脚本，1:命令集
          systemType: null, //使用于系统 0:linux，1:windows
          scriptFlag: "1" //是否允许删除,0不允许,1允许 (默认不允许)
        }
      },
      // 查询
      handleQuery() {
        this.fngetScriptList()
      },
      // 重置按钮
      resetQuery(formName) {
        this.$refs[formName].resetFields();
        this.handleQuery();
      },
    },
    created() {
      this.fngetScriptList()
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-table__fixed-right::before {
    height: 0;
  }

  .pagination {
    padding: 15px;
    padding-top: 0;
  }

  .script-content {
    width: 98%;
    margin: 15px auto 0;
    background: #fff;
    overflow: hidden;
  }

  .form {
    padding: 15px;
  }

  .script-serach {
    width: 98%;
    margin: 10px auto;
    background: #fff;
    border-radius: 9px;
    display: flex;
    justify-content: space-between;

    .serach-btn {
      padding: 15px;
    }
  }

  .form-inp .el-form-item {
    margin-bottom: 0;
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  ::v-deep .el-dialog__footer {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .form .el-form-item {
    margin-bottom: 0;
  }

  .script {
    height: 75vh;
    background-color: #f9f9f9;
    overflow: hidden;
    overflow-y: auto;
  }
</style>

<style lang="scss">
  label {
    font-weight: normal;
  }
</style>
