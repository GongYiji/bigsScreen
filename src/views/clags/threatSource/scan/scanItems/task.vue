<template>
  <div class="task">
    <div class="task-serach">
      <el-form :model="queryParams" :inline="true" ref="queryParams" class="form">
        <el-form-item prop="executeName">
          <el-input v-model="queryParams.executeName" placeholder="请输入内容" @change="handleQuery"
            prefix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetQuery('queryParams')">重 置</el-button>
        </el-form-item>
      </el-form>
      <div class="serach-btn">
        <el-button type="primary" icon="el-icon-plus" @click="toAdd">添加任务</el-button>
      </div>
    </div>
    <!-- 搜索部分完成 -->
    <div class="task-content">
      <el-table v-loading="loading" :data="tableData" height='50vh' ref="table" @expand-change="expandChange"
        style="width: 98%;margin: 15px;border: 1px solid #f0f0f0;margin-bottom: 0;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="patrolDetails" style="width: 100%;border: 1px solid #f0f0f0;">
              <el-table-column prop="startTime" label="开始时间">
              </el-table-column>
              <el-table-column prop="endTime" label="结束详情">
              </el-table-column>
              <el-table-column prop="resultAnalysis" label="结果分析">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="预览" placement="left">
                    <svg-icon icon-class="see" @click="preview(scope.row)"></svg-icon>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="executeName" label="任务名称">
        </el-table-column>
        <!-- <el-table-column prop="name" label="任务IP">
        </el-table-column> -->
        <!-- <el-table-column prop="rcType" label="主机类型">
        </el-table-column> -->
        <el-table-column prop="rcType" label="执行类型">
          <template slot-scope="scope">
            <div v-if="scope.row.rcType == 1">
              <svg-icon icon-class="script" class="svg"></svg-icon><span class="svg-txt">脚本类型</span>
            </div>
            <div v-else-if="scope.row.rcType == 2">
              <svg-icon icon-class="minglingji" class="svg"></svg-icon><span class="svg-txt">命令集</span>
            </div>
            <div v-else>
              <svg-icon icon-class="write" class="svg"></svg-icon><span class="svg-txt">手动编写</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="executeStatus" label="任务状态">
          <template slot-scope="scope">
            <div v-if="scope.row.executeStatus == 0" class="btn-icon">
              <el-button type="danger" plain icon="el-icon-warning" size="small">未开始</el-button>
            </div>
            <div v-else-if="scope.row.executeStatus == 2" class="btn-icon">
              <el-button type="success" plain icon="el-icon-success" size="small">已完成</el-button>
            </div>
            <div v-else class="btn-icon">
              <el-button type="primary" plain icon="el-icon-remove" size="small">执行中</el-button>
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
        <el-table-column prop="executeLastTime" label="最后执行时间">
          <template slot-scope="scope">
            <div v-if="scope.row.executeLastTime == null">
              - -
            </div>
            <div v-else>
              {{scope.row.executeLastTime}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <span> | </span> -->
            <el-button type="text" size="small" @click="delRow(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="toImplement(scope.row)">执行</el-button>
            <el-button type="text" size="small" @click="toSee(scope.row)" v-show="scope.row.executeLastTime != null">结果
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
          @pagination="fngetHostList()" />
      </div>
    </div>
    <!-- 表格主体部分完成 -->
    <div class="task-dialog">
      <el-dialog :title="title" :visible.sync="open" width="30%">
        <div class="dialog-content">
          <el-form class="dialog-form" ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="任务名称:" prop="executeName">
              <el-input v-model="form.executeName" style="width: 300px;" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="主机类型:" prop="hostId">
              <el-select v-model="form.hostId" placeholder="请选择">
                <el-option v-for="item in hostList" :key="item.hostId" :label="item.hostName" :value="item.hostId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行类型:" prop="rcType">
              <el-radio-group v-model="form.rcType">
                <el-radio :label="1" @change="change(0)">脚本</el-radio>
                <el-radio :label="2" @change="change(1)">命令集</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="rcId">
              <el-select v-show="0===number" v-model="form.scriptName" placeholder="请选择脚本">
                <el-option v-for="item in scriptList" :key="item.rcId" :label="item.scriptName" :value="item.rcId">
                </el-option>
              </el-select>
              <el-select v-show="1===number" v-model="form.rcId" placeholder="请选择命令集">
                <el-option v-for="item in commandList" :key="item.rcId" :label="item.commandName" :value="item.rcId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" resize="none" :rows="5" style="width: 300px;" placeholder="请输入内容"
                v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="see-dialog">
      <el-dialog title="预览" :visible.sync="open1" width="55%">
        <div class="seedialog-content">
          <el-input type="textarea" resize="none" :rows="18" placeholder="请输入内容" v-model="text" style="font-size: 16px;"
            disabled>
          </el-input>
        </div>
      </el-dialog>
    </div>
    <!-- 预览 -->
  </div>
</template>

<script>
  import {
    getTaskList,
    addTask,
    deleteTask,
    implementTask,
    previewTask,
  } from '@/api/clags/threatSource/scan/task.js'
  import {
    getHostList,
  } from '@/api/clags/threatSource/scan/host.js'
  import {
    getScriptList,
    getCommandList
  } from '@/api/clags/threatSource/scan/cscript.js'
  export default {
    name: 'task',
    data() {
      return {
        text: '',
        loading: false, //加载提示
        number: 0,
        open1: false,
        executeId: null, //主机ID
        hostName: [], //存放主机信息
        hostId: [], //存放主机信息
        hostList: [], //存放主机信息
        scriptList: [], //存放脚本信息
        scriptName: [], //存放脚本信息
        rcId: [], //存放脚本信息
        commandList: [], //存放命令集信息
        commandName: [], //存放命令集信息
        commandId: [], //存放命令集信息
        open: false, //弹框开启
        title: '', //弹框标题
        tableData: [], //表格数据
        total: 0, //分页
        relguid: null, //暂存ID
        patrolDetails: [], //下拉详情
        // 查询数据
        queryParams: {
          executeName: '',
          hostId: '',
          rcId: '',
          rcType: '',
          executeStatus: '',
          pageNum: 1,
          pageSize: 10
        },
        // 表单数据
        form: {
          executeName: null,
          hostId: null, //主机id
          rcId: null, //脚本或者脚本集id
          rcType: null, //类型,默认0:手编,1:脚本,2:命令集合
          executeStatus: null, //执行状态,默认0:未开始,1:执行中,2:执行结束
          remark: null,
        },
        rules: {
          executeName: [{
              required: true,
              message: '请输入任务名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          hostId: [{
            required: true,
            message: '请选择主机类型',
            trigger: 'change'
          }],
          rcId: [{
            required: true,
            message: '请选择脚本/命令集',
            trigger: 'change'
          }],
          rcType: [{
            required: true,
            message: '请选择执行类型',
            trigger: 'change'
          }],
        },
      }
    },
    methods: {
      preview(row) {
        this.open1 = true
        this.text = row.executeResult
      },
      expandChange(row, expandedRows) {
        let params = {};
        this.patrolDetails = [];
        for (let i = 0; i < expandedRows.length; i++) {
          const item = expandedRows[i];
          if (row.executeId != item.executeId) {
            this.$refs.table.toggleRowExpansion(item, false);
          }
        }
        params.executeId = row.executeId;
        this.relguid = row.executeId;
        previewTask(params).then(res => {
          if (res.rows.length > 0) {
            this.patrolDetails = res.rows;
          } else {
            this.patrolDetails = [];
          }
        })
      },
      // 查阅
      toSee(row) {
        this.$refs.table.toggleRowExpansion(row)
      },
      // 执行
      toImplement(row) {
        let data = {
          executeId: row.executeId
        }
        implementTask(data).then(res => {
          this.$modal.msgSuccess("执行成功");
        })
        this.fngetTaskList()
      },
      // 内容切换
      change(index) {
        this.number = index
      },
      // 提交
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = {
              executeName: this.form.executeName,
              hostId: this.form.hostId, //主机id
              rcId: this.form.rcId, //脚本或者脚本集id
              rcType: this.form.rcType, //类型1:脚本,2:命令集合
              remark: this.form.remark, //备注信息
            }
            addTask(data).then(res => {
              this.$modal.msgSuccess("添加成功");
              this.fngetTaskList()
            })
            this.open = false
            this.reset()
          }
        });
      },
      // 取消
      cancel() {
        // this.hostName = [], //存放主机信息
        // this.hostId = [], //存放主机信息
        // this.hostList = [], //存放主机信息
        // this.scriptList = [], //存放脚本信息
        // this.scriptName = [], //存放脚本信息
        // this.rcId = [], //存放脚本信息
        // this.commandList = [], //存放命令集信息
        // this.commandName = [], //存放命令集信息
        // this.commandId = [], //存放命令集信息
        this.open = false
        this.open1 = false
        this.reset()
      },
      // 添加
      toAdd() {
        this.fngetHostList()
        this.fngetScriptList()
        this.fngetCommandList()
        this.open = true
        this.title = '添加任务'
        this.reset()

        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 编辑
      // toEdit(row) {
      //   this.open = true
      //   this.title = '编辑任务'
      //   this.form = {...row}
      //   this.form.rcType = +this.form.rcType
      //   this.form.executeStatus = +this.form.executeStatus
      //   this.fngetHostList()
      //   this.fngetScriptList()
      // },
      // 删除
      delRow(row) {
        let data = {
          executeId: row.executeId
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return deleteTask(data);
        }).then(() => {
          this.fngetTaskList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      // 表单数据
      fngetTaskList() {
        let data = {
          executeName: this.queryParams.executeName,
          hostId: this.queryParams.hostId,
          rcId: this.queryParams.rcId,
          rcType: this.queryParams.rcType,
          executeStatus: this.queryParams.executeStatus,
          pageNum: 1,
          pageSize: 10
        }
        this.loading = true
        getTaskList(data).then(res => {
          this.tableData = res.rows
          this.total = res.total
          this.loading = false
        })
      },
      // 获取主机id
      fngetHostList() {
        getHostList().then(res => {
          res.rows.forEach((item, index) => {
            this.hostName.push(item.hostName)
            this.hostId.push(item.hostId)
          })
          //数据处理
          let size = this.hostName.length;
          for (let i = 0; i < size; i++) {
            let a = {};
            a.hostName = this.hostName[i];
            a.hostId = this.hostId[i];
            this.hostList.push(a);
          }
        })
      },
      // 获取脚本id
      fngetScriptList() {
        getScriptList().then(res => {
          res.rows.forEach((item, index) => {
            this.scriptName.push(item.scriptName)
            this.rcId.push(item.scriptId)
          })
          //数据处理
          let size = this.scriptName.length;
          for (let i = 0; i < size; i++) {
            let a = {};
            a.scriptName = this.scriptName[i];
            a.rcId = this.rcId[i];
            this.scriptList.push(a);
          }
        })
      },
      // 获取命令集id
      fngetCommandList() {
        getCommandList().then(res => {
          res.rows.forEach((item, index) => {
            this.commandName.push(item.scriptName)
            this.commandId.push(item.scriptId)
          })
          //数据处理
          let size = this.commandName.length;
          for (let i = 0; i < size; i++) {
            let a = {};
            a.commandName = this.commandName[i];
            a.rcId = this.commandId[i];
            this.commandList.push(a);
          }
        })
      },
      // 查询
      handleQuery() {
        this.fngetTaskList()
      },
      // 重置按钮
      resetQuery(formName) {
        this.$refs[formName].resetFields();
        this.handleQuery();
      },
      // 重置表单
      reset() {
        this.hostName = [], //存放主机信息
        this.hostId = [], //存放主机信息
        this.hostList = [], //存放主机信息
        this.scriptList = [], //存放脚本信息
        this.scriptName = [], //存放脚本信息
        this.rcId = [], //存放脚本信息
        this.commandList = [], //存放命令集信息
        this.commandName = [], //存放命令集信息
        this.commandId = [], //存放命令集信息
        this.form = {
          executeName: null,
          hostId: null, //主机id
          rcId: null, //脚本或者脚本集id
          rcType: null, //类型,默认0:手编,1:脚本,2:命令集合
          executeStatus: null, //执行状态,默认0:未开始,1:执行中,2:执行结束
        }
      }
    },
    created() {
      this.fngetTaskList()
      // this.fngetHostList()
      // this.fngetScriptList()
      // this.fngetCommandList()
    },
  }
</script>

<style lang="scss" scoped>
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
    // height: 52vh;
  }

  ::v-deep .el-table__expand-icon>.el-icon {
    display: none;
  }

  .task-dialog ::v-deep .el-form-item {
    margin-bottom: 20px;
  }

  .task-dialog ::v-deep .el-dialog__footer {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .task-dialog ::v-deep .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  .pagination {
    padding: 15px;
    padding-top: 0;
  }

  .svg-txt {
    margin-left: 5px;
  }

  .svg {
    width: 1.3em;
    height: 1.3rem;
    vertical-align: middle;
  }

  .task-content {
    width: 98%;
    margin: 15px auto 0;
    background: #fff;
    overflow: hidden;
  }

  .form,
  .serach-btn {
    padding: 15px;
  }

  .task-serach {
    width: 98%;
    margin: 10px auto;
    background: #fff;
    border-radius: 9px;
    display: flex;
    justify-content: space-between;
  }

  ::v-deep .el-form-item {
    margin-bottom: 0;
  }

  .task {
    height: 75vh;
    background-color: #f9f9f9;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
