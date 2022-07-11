<template>
  <div class="script">
    <div class="script-serach">
      <el-form :inline="true" :model="queryParams" ref="queryParams" class="form">
        <el-form-item prop="scriptName">
          <el-input v-model="queryParams.scriptName" @change="handleQuery()" placeholder="搜索命令集名称"
            prefix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetQuery('queryParams')">重 置</el-button>
        </el-form-item>
      </el-form>
      <div class="serach-btn">
        <el-button type="primary" icon="el-icon-plus" @click="toAdd()">添加命令集</el-button>
      </div>
    </div>
    <!-- 搜索结束 -->
    <div class="script-content">
      <el-table :data="tableData" style="width: 98%;margin: 15px;margin-bottom: 0;border: 1px solid #f0f0f0;"
        v-loading="loading" height="50vh">
        <el-table-column prop="scriptName" label="命令集名称">
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
        <el-table-column prop="systemType" label="系统类型" width="180px" align="left">
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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="预览" placement="left">
              <svg-icon icon-class="see" @click="seeDialog(scope.row)"></svg-icon>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="right">
              <i class="el-icon-delete" @click="delRow(scope.row)" style="margin-left: 15px;"></i>
            </el-tooltip>
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
        <el-dialog title="添加命令集" :visible.sync="open" width="31%">
          <div class="dialog-content">
            <el-form class="dialog-form" ref="form" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="命令集名称:" prop="scriptName">
                <el-input v-model="form.scriptName" style="width: 330px;"></el-input>
              </el-form-item>
              <el-form-item label="命令集:" prop="commandList">
                <el-input type="textarea" :rows="5" v-model="form.commandList" style="width: 330px;"></el-input>
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
      <!-- 添加命令集完成 -->
      <div class="see-dialog">
        <el-dialog title="预览" :visible.sync="open1" width="35%">
          <div class="seedialog-content">
            <el-input type="textarea" resize="none" :rows="8" placeholder="请输入内容" v-model="seetxt"
              style="font-size: 22px;" disabled>
            </el-input>
          </div>
        </el-dialog>
      </div>
      <!-- 预览 -->
    </div>
  </div>
</template>

<script>
  import {
    addScript,
    deleteScript,
    reviseScript,
    addCommand,
    getCommandList
  } from '@/api/clags/threatSource/scan/cscript.js'
  export default {
    name: 'cscript',
    data() {
      return {
        loading: false, //刷新提示
        flag: true, //控制编辑按钮
        index: null,
        open: false, //打开弹框
        open1: false, //打开弹框
        total: 0, //总数
        tableData: [], //表格数据
        // 查询
        queryParams: {
          scriptId: "", //脚本id
          scriptName: "", //脚本名称
          scriptOriginalName: "", //脚本文件全名
          scriptPath: "", //脚本路径
          scriptFlag: "", //是否允许删除,0不允许,1允许
          pageNum: 1,
          pageSize: 10
        },
        // 表单
        form: {
          remark: null,
          scriptName: null, //脚本名称
          commandList: null, //传file文件流！！！！
          scriptType: "1", //脚本类型 0：脚本，1:命令集
          systemType: null, //使用于系统 0:linux，1:windows
          scriptFlag: "1" //是否允许删除,0不允许,1允许 (默认不允许)
        },
        seetxt: '', //预览文本展示
        // 规则展示
        rules: {
          commandList: [{
            required: true,
            message: '请输入命令集',
            trigger: 'blur'
          }],
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
      // 预览
      seeDialog(row) {
        this.form.commandList = row.commandList
        this.seetxt = this.form.commandList.replace(/[;]/g, '\n')
        this.open1 = true
      },
      // 文本域拼接
      preText(pretext) {
        return pretext.replace(/\n/g, ';')
      },
      // 修改
      fnreviseScript(row) {
        let data = {
          scriptId: row.scriptId,
          scriptName: this.form.scriptName
        }
        reviseScript(data).then(res => {
          this.fngetCommandList()
        })
        this.$notify({
          message: '修改成功',
          type: 'success'
        });
        this.index = null
      },
      // 修改名称
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
          this.fngetCommandList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      // 提交表单
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.commandList = this.preText(this.form.commandList);
            addCommand(this.form).then(res => {
              this.$modal.msgSuccess("添加成功");
              this.open = false;
              this.fngetCommandList();
            })
            this.reset()
          }
        });
      },
      // 添加脚本
      toAdd() {
        this.reset()
        this.open = true
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 表格数据
      fngetCommandList() {
        this.loading = true
        let data = {
          scriptId: this.queryParams.scriptId, //脚本id
          scriptName: this.queryParams.scriptName, //脚本名称
          scriptOriginalName: this.queryParams.scriptOriginalName, //脚本文件全名
          scriptPath: this.queryParams.scriptPath, //脚本路径
          scriptFlag: this.queryParams.scriptFlag, //是否允许删除,0不允许,1允许
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize
        }
        getCommandList(data).then(res => {
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
          commandList: null,
          scriptType: "1", //脚本类型 0：脚本，1:命令集
          systemType: null, //使用于系统 0:linux，1:windows
          scriptFlag: "1" //是否允许删除,0不允许,1允许 (默认不允许)
        }
      },
      // 查询
      handleQuery() {
        this.fngetCommandList()
      },
      // 重置按钮
      resetQuery(formName) {
        this.$refs[formName].resetFields();
        this.handleQuery();
      },
    },
    created() {
      this.fngetCommandList()
    }
  }
</script>

<style lang="scss" scoped>
  .seedialog-content {
    height: 100%;
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

  .see-dialog ::v-deep .el-dialog__header {
    background: #494A4B;
  }

  .see-dialog ::v-deep .el-dialog__title {
    color: #fff;
  }

  .see-dialog ::v-deep .el-dialog__close {
    color: #fff;
  }

  .see-dialog ::v-deep .el-dialog__body {
    background: #252525;
    height: 46vh;
  }

  .cscript-dialog ::v-deep .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  .cscript-dialog ::v-deep .el-dialog__footer {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
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
