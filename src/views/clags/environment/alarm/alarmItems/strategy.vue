<template>
  <div class="strategy">
    <div class="strategy-serach">
      <el-form class="demo-form-inline" :inline="true" :model="queryParams" ref="queryParams">
        <el-form-item prop="policyName">
          <el-input size="medium" v-model="queryParams.policyName" @change="handleQuery" placeholder="搜素策略名称"
            prefix-icon="el-icon-search" style="width: 200px;">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="strategy-btn">
        <el-button @click="toAdd()" icon="el-icon-plus" type="primary">添加策略</el-button>
      </div>
    </div>
    <!-- 搜索结束 -->
    <div class="strategy-content">
      <el-table :data="tableData" v-loading="loading" height="55vh" style="width: 100%;border: 1px solid #f0f0f0;">
        <el-table-column prop="policyName" label="策略名称">
        </el-table-column>
        <el-table-column prop="alertType" label="策略类型">
          <template slot-scope="scope">
            <div style="display: flex;">
              <div v-if="scope.row.alertType.threat_alert.type != ''">
                <svg-icon icon-class="tongzhi" class="svg"></svg-icon>
              </div>
              <div v-if="scope.row.alertType.system_alert.type != ''">
                <svg-icon icon-class="baojing" class="svg" style="margin-left: 10px;"></svg-icon>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="通知方法" align="center">
        </el-table-column>
        <el-table-column prop="status" label="启用状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"
              @change="resvierList(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表单完成 -->
    <div class="pagination">
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
        @pagination="fngetStrategyList" />
    </div>
    <!-- 分页器完成 -->
    <div class="strategy-dialog">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
        <div class="dialog-content">
          <el-form ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item label="策略名称:" prop="policyName">
              <el-input v-model="form.policyName" size="small" placeholder="请输入策略名称，长度2-20"></el-input>
            </el-form-item>
            <!-- <el-form-item label="策略类型:">
              <svg-icon icon-class="tongzhi" class="svg" style="line-height: 36px;height: 36px;"></svg-icon>
              <svg-icon icon-class="baojing" class="svg" style="line-height: 36px;height: 36px;margin-left: 10px;">
              </svg-icon>
            </el-form-item> -->
            <el-form-item label="威胁告警:" prop="alertType.threat_alert.type">
              <el-checkbox-group v-model="form.alertType.threat_alert.type">
                <el-checkbox :label="item.value" v-for=" item in sceneList">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="系统通知:" prop="alertType.system_alert.type">
              <el-checkbox-group v-model="form.alertType.system_alert.type">
                <el-checkbox :label="item.value" v-for=" item in noticeList">{{item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="通知方式:">
              <el-tabs v-model="activeName">
                <el-tab-pane label="邮件" name="first">
                  <div class="email">
                    <div v-if="emailList.length==0">
                      <p>您尚未配置email服务器，请前往通知配置页面进行配置</p>
                    </div>
                    <div v-else>
                      <el-input v-model="form.config.email" type="textarea" :rows="4" resize="none"
                        placeholder="输入收件人邮箱,以逗号分割"></el-input>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="syslog" name="second">
                  <div v-if="policyIdList.size==0">
                    <p>您尚未配置Syslog服务器，请前往通知配置页面进行配置</p>
                  </div>
                  <div style="margin-left: 10px;" v-else>
                    <el-checkbox-group v-model="form.config.syslog">
                      <el-checkbox :label="item" v-for="item in policyIdList">{{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Callback" name="third">
                  <div class="webhook">
                    <div v-if="webhookList.size==0">
                      <p>您尚未配置Callback服务器，请前往通知配置页面进行配置</p>
                    </div>
                    <div v-else style="margin-left: 10px;">
                      <el-checkbox-group v-model="form.config.callback">
                        <el-checkbox :label="item" v-for="item in webhookList">{{item}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getStrategyList,
    deleteStrategy,
    insetStrategy,
    reviseStrategy,
    getNoticeList
  } from '@/api/clags/environment/alarm/strategy.js'
  export default {
    name: 'Strategy',
    data() {
      return {
        testList: [],
        emailList: [], //存放email数组
        loading: true, //加载
        total: 0, //总条数
        title: '', //弹框复用
        activeName: 'second', //默认勾选
        dialogVisible: false, //弹框
        currentPage: 1, //分页管理
        tableData: [], //表格数据
        noticeDeploy: [], //通知配置数组
        arr: [], //存放syslog
        callbackArr: [], //存放webhook
        // 表单数据
        form: {
          level: "",
          method: "",
          config: {
            syslog: [],
            callback: [],
            email: [],
          },
          policyName: '', //名称
          status: null, //状态
          policyId: null, //唯一标识
          alertType: {
            threat_alert: {
              type: []
            },
            system_alert: {
              type: []
            }
          }, //策略状态
        },
        // 告警通知
        noticeList: [{
            value: "honeypot_offline",
            label: "运行状态告警：包括CPU、内存、硬盘负载状态"
          },
          {
            value: "node_offline",
            label: "节点离线告警：离线超过2分钟，将告警"
          },
          {
            value: "tads_load",
            label: "蜜罐离线告警：当节点在线时出现蜜罐离线，将报警"
          },
        ],
        // 告警场景
        sceneList: [{
            label: "攻击行为",
            value: "attack"
          },
          {
            label: "登录行为",
            value: "signon"
          },
          {
            label: "主机失陷",
            value: "compromise"
          },
          {
            label: "扫描行为",
            value: "scan"
          },
          {
            label: "高危登录行为",
            value: "hr_signon"
          },
        ],
        statusList: [], //状态数组
        policyIdList: [], //标识
        webhook: [], //通知配置webhook
        webhookList: [], //告警配置webhook数组
        // 查询数据数据
        queryParams: {
          page_no: 1, //第一页
          page_size: 10, //一页10条
          status: 1, //状态
          pageNum: 1,
          pageSize: 10,
          policyName: undefined,
        },
        // 规则
        rules: {
          alertType: {
            threat_alert: {
              type: [{
                type: 'array',
                required: true,
                message: '请至少选择一个威胁告警',
                trigger: 'change'
              }]
            },
            system_alert: {
              type: [{
                type: 'array',
                required: true,
                message: '请至少选择一个系统通知',
                trigger: 'change'
              }]
            }
          },
          policyName: [{
              required: true,
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.fngetStrategyList()
      this.fngetNoticeList()
    },
    methods: {
      // 表单启用按钮
      resvierList(row) {
        let data = {
          ...row
        }
        reviseStrategy(data).then(res => {
          this.fngetStrategyList();
          this.$modal.msgSuccess("修改成功");
        });

      },
      // 提交
      submitForm: function() {
        console.log(this.webhookList.size)
        return
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.title == "编辑策略") {
              this.fnMonitor()
              reviseStrategy(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.dialogVisible = false;
                this.fngetStrategyList();
              });
            } else {
              this.fnMonitor()
              if (this.form.config.email == undefined) {
                let data = {
                  level: this.form.level,
                  method: this.form.method,
                  config: {
                    syslog: this.form.config.syslog,
                    callback: this.form.config.callback,
                    email: this.testList,
                  },
                  policyName: this.form.policyName, //名称
                  status: 1, //状态
                  alertType: {
                    threat_alert: {
                      type: this.form.alertType.threat_alert.type
                    },
                    system_alert: {
                      type: this.form.alertType.system_alert.type
                    }
                  },
                }
                insetStrategy(data).then(response => {
                  this.$modal.msgSuccess("新增成功");
                  this.dialogVisible = false;
                  this.fngetStrategyList();
                });
              } else {
                this.testList = this.form.config.email.split(',')
                let data = {
                  level: this.form.level,
                  method: this.form.method,
                  config: {
                    syslog: this.form.config.syslog,
                    callback: this.form.config.callback,
                    email: this.testList,
                  },
                  policyName: this.form.policyName, //名称
                  status: 1, //状态
                  alertType: {
                    threat_alert: {
                      type: this.form.alertType.threat_alert.type
                    },
                    system_alert: {
                      type: this.form.alertType.system_alert.type
                    }
                  },
                }
                insetStrategy(data).then(response => {
                  this.$modal.msgSuccess("新增成功");
                  this.dialogVisible = false;
                  this.fngetStrategyList();
                });
              }
            }
            this.reset()
          }
        });
      },
      // 方法监听
      fnMonitor() {
        if (this.form.config.syslog != '' && this.form.config.callback != '') {
          this.form.method = 'syslog,callback'
        } else if (this.form.config.syslog == '' && this.form.config.callback != '') {
          this.form.method = 'callback'
        } else if (this.form.config.syslog != '' && this.form.config.callback == '') {
          this.form.method = 'syslog'
        }
      },
      // 修改详情
      toEdit(row) {
        this.dialogVisible = true
        this.form = {
          ...row
        }
        // arr告警配置数组 statusList通知配置数组
        this.arr = row.config.syslog
        this.callbackArr = row.config.callback
        // syslog
        let a = [...this.statusList, ...this.arr]
        this.policyIdList = new Set(a)
        // webhook
        let b = [...this.webhook, ...this.callbackArr]
        this.webhookList = new Set(b)
        this.title = "编辑策略"
      },
      // 新增数据
      toAdd() {
        this.reset()
        this.dialogVisible = true
        // syslog
        let a = [...this.statusList, ...this.arr]
        this.policyIdList = new Set(a)
        // webhook
        let b = [...this.webhook, ...this.callbackArr]
        this.webhookList = new Set(b)
        this.title = "新增策略"
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 表格数据
      fngetStrategyList() {
        var data = {
          page_no: this.queryParams.page_no, //页数
          page_size: this.queryParams.page_size, //条数
          policyName: this.queryParams.policyName
        }
        this.loading = true;
        getStrategyList(data).then(res => {
          this.tableData = res.data.list
          this.total = res.data.total_num;
          this.loading = false;
        })
      },
      // 通知配置
      fngetNoticeList() {
        let data = {
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize
        }
        getNoticeList(data).then(res => {
          this.noticeDeploy = res.data.list
          // syslog数组
          this.noticeDeploy.forEach((item, index) => {
            if (item.noticeConfig.fullAdd != undefined) {
              this.statusList.push(item.noticeConfig.fullAdd)
            }
          })
          // webhook数组
          this.noticeDeploy.forEach((item, index) => {
            if (item.noticeType == 'callback') {
              this.webhook.push(item.noticeConfig)
            }
          })
          // email数组
          this.noticeDeploy.forEach((item, index) => {
            if (item.noticeType == 'email') {
              this.emailList.push(item.noticeConfig)
            }
          })
        })
      },
      // 删除行
      deleteRow(row) {
        let data = {
          policyId: row.policyId
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return deleteStrategy(data);
        }).then(() => {
          this.fngetStrategyList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      // 关闭
      cancel() {
        this.reset()
        this.dialogVisible = false
      },
      // 表单查询
      handleQuery() {
        this.fngetStrategyList()
      },
      // 重置
      reset() {
        this.form = {
          config: {
            syslog: [],
            callback: [],
          },
          policyName: '', //名称
          status: '', //状态
          policyId: null, //唯一标识
          alertType: {
            threat_alert: {
              type: []
            },
            system_alert: {
              type: []
            }
          }, //策略状态
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-textarea__inner {
    border: none;
  }

  ::v-deep .el-form-item__error {
    display: none;
  }

  ::v-deep .el-pagination {
    padding: 2px 10px;
    bottom: 5px;
  }

  ::v-deep .pagination-container {
    padding: 25px 16px !important;
  }

  ::v-deep .el-dialog:not(.is-fullscreen) {
    margin-top: 4vh !important;
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  ::v-deep .el-dialog__footer {
    padding: 15px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .svg {
    width: 85px;
    height: 25px;
  }

  .dialog-content {
    .el-tab-pane {
      height: 100px;
      overflow-y: auto;
      border-radius: 2px;
      border: 1px solid #f0f0f0;
    }

    .el-form-item {
      margin-bottom: 7px;
    }

    p {
      margin: 0;
      padding: 0 10px;
    }
  }

  .el-tabs {
    width: 350px;
  }

  .strategy {
    background: #f0f0f0;
    height: 72vh;

    .strategy-serach {
      display: flex;
      justify-content: space-between;
      background: #fff;
      // padding-top: 15px;
      margin-bottom: 15px;

      .el-form-item {
        margin-bottom: 15px;
      }
    }
  }
</style>
