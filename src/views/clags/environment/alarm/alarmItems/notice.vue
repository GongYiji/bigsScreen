<template>
  <div class="notice">
    <div class="notice-body">
      <div class="notice-syslog">
        <div class="syslog-title">
          <span class="icon"></span>
          <p class="text">syslog服务器配置</p>
        </div>
        <div class="syslog-content">
          <div class="content-top">
            <div v-for="(item,index) in syslogList" :key="index" class="list">
              <div class="long">
                <el-input size="small" v-model="syslogList[index].noticeConfig.addr" placeholder="请输入服务器地址"
                  @change="fnreviseNotice(index)" suffix-icon="el-icon-edit">
                </el-input>
              </div>
              <div class="short">
                <el-select size="small" v-model="syslogList[index].noticeConfig.protocol" placeholder="协议"
                  @change="fnreviseNotice(index)">
                  <el-option label="TCP" value="TCP"></el-option>
                  <el-option label="UDP" value="UDP"></el-option>
                </el-select>
              </div>
              <div class="short">
                <el-input v-model="syslogList[index].noticeConfig.port" size="small" placeholder="端口号"
                  suffix-icon="el-icon-edit" @change="fnreviseNotice(index)">
                </el-input>
              </div>
              <div>
                <el-button size="small" type="warning" @click="fntestSyslog(index)">测试</el-button>
                <el-button size="small" type="danger" @click="fndeleteNotice(item.noticeId,index)">删除</el-button>
              </div>
            </div>
            <div class="top-add">
              <div class="addItems">
                <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-dynamic">
                  <el-form-item class="long" prop="noticeConfig.addr">
                    <el-input size="small" v-model="form.noticeConfig.addr" placeholder="请输入服务器地址"
                      suffix-icon="el-icon-edit">
                    </el-input>
                  </el-form-item>
                  <el-form-item class="short" prop="noticeConfig.protocol">
                    <el-select size="small" v-model="form.noticeConfig.protocol" placeholder="协议">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="short" prop="noticeConfig.port">
                    <el-input v-model="form.noticeConfig.port" size="small" placeholder="端口号"
                      suffix-icon="el-icon-edit">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <div v-if="syslogList.length<5">
                      <el-button size="small" type="warning" @click="fntestSyslog()">测试</el-button>
                      <el-button size="small" type="primary" @click="submitSyslog()">保存</el-button>
                    </div>
                    <div v-else>
                      <el-button size="small" type="warning" @click="fntestSyslog()">测试</el-button>
                    </div>
                  </el-form-item>
                </el-form>
                <span style="color: #ff4949;" v-show="syslogList.length>4">最多可设置五台syslog服务器，每台syslog服务器同时可接受相同告警通知。</span>
              </div>
            </div>
            <div class="top-txt">
              <p class="txt-one"><strong>说明：</strong>1.最多可设置五台syslog服务器，每台syslog服务器同时可接受相同告警通知。</p>
              <p class="txt-two">2.若接收不到邮件告警，请先检查垃圾箱。</p>
            </div>
          </div>
        </div>
      </div>
      <!-- syslog结束 -->
      <div class="notice-mail">
        <div class="mail-title">
          <span class="icon"></span>
          <p class="text">邮件服务器配置</p>
        </div>
        <div class="mail-content">
          <el-form :inline="true" :model="emailForm" class="demo-form-inline">
            <el-form-item>
              <el-input size="small" @change="fnreviseEmail()" v-model="emailForm.noticeConfig.host"
                placeholder="请输入SMTP主机" suffix-icon="el-icon-edit">
              </el-input>
            </el-form-item>
            <el-form-item class="short">
              <el-select @change="fnreviseEmail()" v-model="emailForm.noticeConfig.protocol" size="small"
                placeholder="协议">
                <el-option label="SMTP" value="SMTP"></el-option>
                <el-option label="SSL" value="SSL"></el-option>
                <el-option label="TLS" value="TLS"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="short">
              <el-input @change="fnreviseEmail()" size="small" v-model="emailForm.noticeConfig.port" placeholder="端口号"
                suffix-icon="el-icon-edit">
              </el-input>
            </el-form-item><br />
            <el-form-item>
              <el-input @change="fnreviseEmail()" size="small" placeholder="请输入账号"
                v-model="emailForm.noticeConfig.username" suffix-icon="el-icon-edit" autocomplete="new-password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input @change="fnreviseEmail()" size="small" show-password v-model="emailForm.noticeConfig.password"
                placeholder="请输入密码" autocomplete="new-password">
              </el-input>
            </el-form-item><br />
            <el-form-item>
              <el-input size="small" @change="fnreviseEmail()" v-model="emailForm.noticeConfig.sender"
                placeholder="请输入发件邮箱" suffix-icon="el-icon-edit">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" @change="fnreviseEmail()" v-model="emailForm.noticeConfig.receiver"
                placeholder="请输入测试邮箱" suffix-icon="el-icon-edit">
              </el-input>
            </el-form-item><br />
            <el-form-item>
              <div v-if="emailList.length==0">
                <el-button size="small" type="warning" @click="fntestEmail">测试</el-button>
                <el-button size="small" type="primary" @click="submitEmail">保存</el-button>
              </div>
              <div v-else>
                <el-button size="small" type="warning" @click="fntestEmail">测试</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 邮件服务器配置结束 -->
      <div class="notice-webhook">
        <div class="webhook-title">
          <span class="icon"></span>
          <p class="text">Callback配置</p>
        </div>
        <div class="webhook-content">
          <p class="p-txt">设置蜜罐捕获攻击后，请求以下Callback地址推送告警信息：</p>
          <div class="content-btn">
            <div v-for="(item,index) in callbackList" :key="index" class="list">
              <div class="long">
                <el-input size="small" v-model="callbackList[index].noticeConfig" placeholder="请输入服务器地址"
                  @change="fnreviseNotice(index)" suffix-icon="el-icon-edit">
                </el-input>
              </div>
              <div>
                <el-button size="small" type="warning" @click="fntestCallback(index)">测试</el-button>
                <el-button size="small" type="danger" @click="fndeleteNotice(item.noticeId,index)">删除</el-button>
              </div>
            </div>
            <div class="addItems">
              <el-form :model="callForm" ref="callForm" :rules="callRules" label-width="100px" class="demo-dynamic">
                <el-form-item class="long" prop="noticeConfig">
                  <el-input size="small" v-model="callForm.noticeConfig" placeholder="请输入服务器地址"
                    suffix-icon="el-icon-edit">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="warning" @click="fntestCallback">测试</el-button>
                  <el-button size="small" type="primary" @click="submitCallback()">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="webhook-txt">
            <p class="txt-one"><strong>说明：</strong>Callback是一种基于HTTP(s)的回调机制。当某系统发生状态变化时，
              该系统主动调用提前约定好的第三方URL地址，并发送相关变化信息以通知第三方系统。</p>
          </div>
        </div>
      </div>
    </div>
    <!-- webhook结束 -->
    <div class="foot">
      <!-- <el-button type="primary" size="small">保存</el-button> -->
    </div>
  </div>
</template>

<script>
  import {
    addSyslog,
    deleteNotice,
    addCallback,
    reviseNotice,
    getNoticeList,
    testCallback,
    testSyslog,
    addEmail,
    testEmail,
  } from '@/api/clags/environment/alarm/notice.js'
  export default {
    name: 'Notice',
    data() {
      //ip地址校验
      var IPValidator = (rule, value, callback) => {
        let ip_ip = '(25[0-5]|2[0-4]\\d|1\\d\\d|\\d\\d|\\d)';
        let ip_ipdot = ip_ip + '\\.';
        let isIPaddress = new RegExp('^' + ip_ipdot + ip_ipdot + ip_ipdot + ip_ip + '$');
        if (value && !isIPaddress.test(value)) {
          callback(new Error('IP地址格式错误'));
        } else {
          callback();
        }
      };
      // 网址校验
      let isTrueUrl = (rule, value, callback) => {
        let reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
        if (value && !reg.test(value)) {
          callback(new Error('请输入正确的链接'))
        } else {
          callback()
        }
      };
      return {
        num: null,
        noticeList: [], //初始数据
        syslogList: [], //syslog遍历
        callbackList: [], //callback遍历
        emailList: [], //email遍历
        // callback表单
        callForm: {
          noticeType: null, //策略类型
          noticeConfig: null, //地址配置
        },
        // syslog表单
        form: {
          noticeType: null, //策略类型
          noticeConfig: {
            addr: null, //ip
            protocol: null, //传输类型
            port: null, //端口
          }, //地址配置
        },
        // email表单
        emailForm: {
          noticeType: null, //策略类型
          noticeConfig: {
            port: null, //端口
            host: null,
            protocol: null, //传输类型
            username: null,
            password: null,
            sender: null,
            receiver: null,
          }, //地址配置
        },
        // 查询参数
        queryParams: {
          pageNum: 1, //页数
          pageSize: 10, //条数
        },
        // 规则校验
        rules: {
          noticeConfig: {
            addr: [{
              validator: IPValidator,
              trigger: 'blur'
            }, {
              required: true,
              message: '服务器地址不能为空'
            }],
            protocol: [{
              required: true,
              message: '请选择传输类型',
              trigger: 'change'
            }],
            port: [{
              required: true,
              message: '端口号不能为空'
            }],
          },
        },
        callRules: {
          noticeConfig: [{
            validator: isTrueUrl,
            trigger: 'blur'
          }, {
            required: true,
            message: '网络地址不能为空'
          }]
        },
      }
    },
    methods: {
      // email测试
      fntestEmail() {
        let data = {
          noticeType: 'email', //策略类型
          noticeConfig: {
            port: this.emailForm.noticeConfig.port, //端口
            host: this.emailForm.noticeConfig.host,
            protocol: this.emailForm.noticeConfig.protocol, //传输类型
            username: this.emailForm.noticeConfig.username,
            password: this.emailForm.noticeConfig.password,
            sender: this.emailForm.noticeConfig.sender,
            receiver: this.emailForm.noticeConfig.receiver,
          },
        }
        testEmail(data).then(res => {
          this.$modal.msgSuccess("测试成功");
        })
      },
      // email数据修改
      fnreviseEmail() {
        if (this.emailList.length == 0) {
          return false
        } else {
          let data = {
            noticeId: this.num,
            noticeType: 'email', //策略类型
            noticeConfig: {
              port: this.emailForm.noticeConfig.port, //端口
              host: this.emailForm.noticeConfig.host,
              protocol: this.emailForm.noticeConfig.protocol, //传输类型
              username: this.emailForm.noticeConfig.username,
              password: this.emailForm.noticeConfig.password,
              sender: this.emailForm.noticeConfig.sender,
              receiver: this.emailForm.noticeConfig.receiver,
            },
          }
          reviseNotice(data).then(res => {
            this.$modal.msgSuccess("修改成功");
          })
        }
      },
      // callback测试
      fntestCallback(index) {
        if (this.callForm.noticeConfig == null) {
          var data = {
            noticeType: "callback", //策略类型
            noticeConfig: this.callbackList[index] //地址配置
          }
        } else {
          var data = {
            noticeType: "callback", //策略类型
            noticeConfig: this.callForm.noticeConfig //地址配置
          }
        }
        testCallback(data).then(res => {
          this.$modal.msgSuccess("测试连接成功");
        })
      },
      // syslog测试
      fntestSyslog(index) {
        if (this.form.noticeConfig.addr == null) {
          var data = {
            noticeType: 'syslog', //策略类型
            noticeConfig: {
              addr: this.syslogList[index].addr, //ip
              protocol: this.syslogList[index].protocol, //传输类型
              port: this.syslogList[index].port, //端口
            },
          }
        } else {
          var data = {
            noticeType: 'syslog', //策略类型
            noticeConfig: {
              addr: this.form.noticeConfig.addr, //ip
              protocol: this.form.noticeConfig.protocol, //传输类型
              port: this.form.noticeConfig.port, //端口
            },
          }
        }
        testSyslog(data).then(res => {
          this.$modal.msgSuccess("测试连接成功");
        })
      },
      // 数据修改
      fnreviseNotice(index) {
        let data = {
          noticeId: this.noticeList[index].noticeId,
          noticeType: this.noticeList[index].noticeType, //策略类型
          noticeConfig: {
            addr: this.syslogList[index].addr, //ip
            protocol: this.syslogList[index].protocol, //传输类型
            port: this.syslogList[index].port, //端口
          },
        }
        reviseNotice(data).then(res => {
          this.$modal.msgSuccess("修改成功");
        })
      },
      // 初始化数据
      fnNoticeList() {
        let data = {
          pageNum: this.queryParams.pageNum, //页数
          pageSize: this.queryParams.pageSize, //条数
        }
        getNoticeList(data).then(res => {
          this.syslogList = []
          this.callbackList = []
          this.noticeList = []
          this.noticeList = res.data.list
          this.noticeList.forEach((item, index) => {
            if (item.noticeType == 'syslog') {
              this.syslogList.push({
                'noticeConfig': item.noticeConfig,
                'noticeId': item.noticeId
              })
            } else if (item.noticeType == 'callback') {
              this.callbackList.push({
                'noticeConfig': item.noticeConfig,
                'noticeId': item.noticeId
              })

            } else {
              this.emailList.push(item.noticeConfig)
              this.num = item.noticeId
            }
          })
        })
      },
      // 删除
      fndeleteNotice(flog, index) {
        let data = {
          noticeId: flog
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return deleteNotice(data);
        }).then(() => {
          this.$modal.msgSuccess("删除成功");
          this.fnNoticeList()
        }).catch(() => {});
      },
      // email新增
      submitEmail: function() {
        this.emailForm.noticeType = 'email'
        let data = {
          noticeType: this.emailForm.noticeType, //策略类型
          noticeConfig: this.emailForm.noticeConfig,
        }
        addEmail(data).then(res => {
          this.fnNoticeList()
          this.$modal.msgSuccess("新增成功");
        })
      },
      // callback 新增
      submitCallback: function() {
        this.$refs['callForm'].validate((valid) => {
          if (valid) {
            this.callForm.noticeType = 'callback'
            let data = {
              noticeType: this.callForm.noticeType, //策略类型
              noticeConfig: this.callForm.noticeConfig,
            }
            addCallback(data).then(res => {
              this.fnNoticeList()
              this.$modal.msgSuccess("新增成功");
            })
            this.reset()
          }
        });
        this.$nextTick(() => {
          this.$refs['callForm'].clearValidate() // 只清除清除验证
        })
      },
      // syslog 新增
      submitSyslog: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.noticeType = 'syslog'
            let data = {
              noticeType: this.form.noticeType, //策略类型
              noticeConfig: {
                addr: this.form.noticeConfig.addr, //ip
                protocol: this.form.noticeConfig.protocol, //传输类型
                port: this.form.noticeConfig.port, //端口
              },
            }
            addSyslog(data).then(res => {
              this.fnNoticeList()
              this.$modal.msgSuccess("新增成功");
            })
            this.reset()
          }
        });
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      showEmail() {
        setTimeout(() => {
          if (this.emailList.length == 0) {
            return false
          } else {
            this.emailForm = {
              noticeConfig: {
                port: this.emailList[0].port, //端口
                host: this.emailList[0].host,
                protocol: this.emailList[0].protocol, //传输类型
                username: this.emailList[0].username,
                password: this.emailList[0].password,
                sender: this.emailList[0].sender,
                receiver: this.emailList[0].receiver,
              }, //地址配置
            }
          }
        }, 1000)
      },
      // 重置表单
      reset() {
        this.form = {
          noticeType: null, //策略类型
          noticeConfig: {
            addr: null, //ip
            protocol: null, //传输类型
            port: null, //端口
          }, //地址配置
        }
        this.callForm = {
          noticeType: null, //策略类型
          noticeConfig: null,
        }
      },
    },
    created() {
      this.fnNoticeList()
      this.showEmail()
    },
  }
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    margin-bottom: 10px;
  }

  .demo-dynamic {
    display: flex;
  }

  .addItems {
    .item {
      span {
        margin-right: 10px;
      }
    }
  }

  .foot {
    text-align: center;
    padding: 10px 0;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 5px 5px;
  }

  .long {
    width: 200px;
    margin-right: 10px;
  }

  .short {
    width: 100px;
    margin-right: 10px;
  }

  .notice-webhook {
    margin-bottom: 20px;

    .content-btn {
      margin-bottom: 20px;
    }
  }

  .webhook-txt {
    width: 615px;
    height: 64px;
    background: #EBF1FD;
    border-radius: 2px;
    border: 1px solid #89B5FA;

    .txt-one {
      width: 574px;
      height: 40px;
      font-size: 14px;
      font-weight: 400;
      color: #103BA7;
      line-height: 20px;
      padding-left: 20px;
    }
  }

  .webhook-title {
    display: flex;
    margin-bottom: 20px;
  }

  .mail-content .el-form-item {
    margin-bottom: 15px;
  }

  .mail-title {
    display: flex;
    margin-bottom: 20px;
  }

  .content-top {
    margin-top: 20px;
  }

  .top-txt {
    width: 647px;
    height: 75px;
    background: #EBF1FD;
    border-radius: 2px;
    border: 1px solid #89B5FA;
    margin-top: 20px;

    .txt-two {
      padding-left: 10.5%;
      margin: 0;
    }

    p {
      padding: 0 20px;
      color: #103BA7;
      margin: 10px 0;
    }
  }

  .notice-syslog {
    margin-bottom: 25px;

    .syslog-title {
      display: flex;
    }
  }

  .notice-body {
    height: 540px;
    overflow: auto;
  }

  .text {
    margin: 0;
    padding-left: 20px;
    height: 20px;
    line-height: 20px;
  }

  .icon {
    width: 4px;
    height: 20px;
    background: #016CFF;
    display: block;
  }
</style>

<style>
  .addItems .el-form-item--medium .el-form-item__content {
    line-height: 36px;
    margin-left: 0 !important;
    display: flex;
  }
</style>
