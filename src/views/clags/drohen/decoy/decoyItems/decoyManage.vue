<template>
  <div class="decoyData">
    <div class="data-serach">
      <el-form :inline="true" :model="queryParams" ref="queryParams" class="demo-form-inline">
        <el-form-item prop="search">
          <el-input v-model="queryParams.search" placeholder="模糊搜索蜜饵名称" prefix-icon="el-icon-search" @keyup.enter.native="handleQuery"></el-input>
        </el-form-item>
        <el-form-item prop="bait_type">
          <el-select v-model="queryParams.bait_type" placeholder="蜜罐类型">
            <el-option label="文件蜜饵" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="fall">
          <el-button type="primary" v-model="queryParams.fall" :class="flag == 2 ? 'activeClass' : ''"  plain>只看有失陷（{{shixianNUM}}）</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery"  icon="el-icon-search">搜索</el-button>
          <!-- <el-button type="primary" @click="resetQuery('queryParams')">重置</el-button> -->
          <el-button @click="resetQuery('queryParams')" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据查询结束 -->
    <div class="data-table">
      <div class="data-export">
        <el-button type="primary" icon="el-icon-plus" @click="toAdd()" style="font-size: 12px; padding: 7px 15px; height: 32px; width: 125px">新增文件蜜饵</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" height="360" style="width: 100%;border:1px solid #f0f0f0">
        <el-table-column prop="bait_name" label="蜜饵名称" width="180">
        </el-table-column>
        <el-table-column prop="describe" label="蜜饵描述">
        </el-table-column>
        <el-table-column prop="bait_type" label="蜜饵类型">
          <template slot-scope="scope">
            <div v-if="scope.row.bait_type == 1">
              <img src="@/assets/images/txt.png" class="img">
              <span>文件类型</span>
            </div>
            <div v-else>
              <span>--</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="下发路径" width="250">
          <template slot-scope="scope">
            <p style="margin:0">Linux:{{scope.row.linux_path}}</p>
            <p style="margin:0">Windows:{{scope.row.windows_path}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="service" label="碰撞次数" align="center">
          <template slot-scope="scope">
            <p style="margin:0">{{scope.row.times}}个</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="right">
              <i class="el-icon-edit" @click="toEdit(scope.row)" style="margin-right: 20px;"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="right">
              <i class="el-icon-delete" style="margin-right: 20px;" @click="delRow(scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格数据结束 -->
    <div class="block">
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
        @pagination="getDecoyManage" />
    </div>
    <!-- 分页管理结束 -->
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="outerVisible" width="30%">
        <div class="dialog-table">
          <el-form :model="tempRow" :rules="rules" ref="tempRow">
            <el-form-item label="蜜饵名称:" prop="bait_name">
              <el-input v-model="tempRow.bait_name" size="small" placeholder="该名称为蜜饵下发时的文件名" autocomplete="off"
                style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="蜜饵描述:" prop="describe">
              <el-input v-model="tempRow.describe" size="small" placeholder="说明" autocomplete="off"
                style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="蜜饵类型:" prop="bait_type" style="margin-bottom: 0;">
              <img src="@/assets/images/txt.png" class="img">
              <span v-model="tempRow.bait_type = 1">文件类型</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px;" prop="linux_path">
              <p>蜜饵存放路径:</p>
              <div class="linux">
                <span style="margin-right: 35px;">Linux:</span>
                <el-input v-model="tempRow.linux_path" size="small" v-bind:value="name" placeholder="/tmp"
                  autocomplete="off" style="width: 310px;"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="windows_path" style="margin-top: 30px;">
              <div class="windows">
                <span style="margin-right: 11px;">Windows:</span>
                <el-input v-model="tempRow.windows_path" size="small" placeholder="%userprofile%\downlo"
                  autocomplete="off" style="width: 310px;">
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="username" style="margin-top: 10px;">
              <p style="margin: 0;">账号字典:</p>
              <el-input v-model="tempRow.username" type="textarea" size="small" placeholder="每行请填写一个账号" :rows="4"
                style="width: 385px;">
              </el-input>
            </el-form-item>
            <el-form-item label="密码提供:" prop="psd_length">
              <el-select v-model="tempRow.psd_length" placeholder="请选择" style="width: 105px;">
                <el-option v-for="(item,index) in numList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <span class="mleft">位数字，字母组合的密码</span>
            </el-form-item>
            <el-form-item label="蜜饵内容:" prop="bait_content">
              <el-input v-model="tempRow.bait_content" type="textarea" size="small" :placeholder="text" :rows="4"
                style="width: 385px;">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain size="mini" @click="seeExamples = true">查看示例</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="inner">
          <el-dialog width="30%" :title="dialogTitle" :visible.sync="innerVisible" append-to-body>
            <div class="innerText">
              <i class="el-icon-warning"> 确认蜜饵文件内容，当前内容会是实际上的文件下拉内容</i>
            </div>
            <el-form :model="tempRow">
              <el-form-item prop="bait_content">
                <el-input v-model="tempRow.bait_content" :readonly="true" resize="none" type="textarea" size="small"
                  :placeholder="text" :rows="19" style="width: 385px;">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="mini" @click="goTop()">上一步</el-button>
              <el-button size="mini" @click="goTop()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div slot="footer" class="dialog-footer" >
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" :disabled="disabled" @click="toSee()">预 览</el-button>
          <el-button size="mini" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增/编辑弹框结束 -->
    <div class="examples">
      <el-dialog title="蜜饵内容示例" :visible.sync="seeExamples">
        <div class="examplesContent">
          <div class="c-title">
            <p style="margin-top: 0; font-size: 16px; font-weight: 700;">当前为蜜饵文件参考示例</p>
            <p style="margin: 0;">输入内容除账号引用变量（$username$)、密码引用变量($password$)和蜜罐引用变量($honeypot$)外，其他皆参考真实业务配置文件，模拟书写。</p>
          </div>
          <div class="c-body">
            <div class="left">
              <p class="left-text">输入内容参考示例</p>
              <div class="left-textarea" v-for="(item,index) in tableData" :key="index">
                <el-input type="textarea" :readonly="true" resize="none" v-if="index===0" :rows="16"
                  v-model="item.bait_content">
                </el-input>
              </div>
            </div>
            <div class="right">
              <p class="right-text">业务机器实际拉取内容参考示例</p>
              <div class="right-textarea" v-for="(item,index) in tableData" :key="index">
                <el-input type="textarea" :readonly="true" resize="none" v-if="index===0" :rows="16"
                  v-model="item.bait_content">
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer" style="text-align: center;width: 100%;">
          <el-button @click="seeExamples = false" size="mini">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getDecoyData,
    getDecoyState,
    getDecoyManage,
    getDecoyBuild,
    reviseDecoy,
    exportDecoy,
    deleteDecoy,
  } from '@/api/clags/drohen/decoy.js'
  export default {
    data() {
      return {
        shixianNUM:0,
        shixianNflagUM:0,
        flag:1,//默认选中
        name: '/tmp',
        seeExamples: false, //查看示例
        disabled: true, //禁用状态
        editIndex: '', //选中行下标
        dialogTitle: "", //弹框标题
        text: '$username$、$password$和$honeypot$分别代表账号、密码和蜜罐变量，以上为必填变量，必须进行引用，才能让蜜饵功能生效。', //蜜饵内容默认展示
        numList: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], //下选数字
        outerVisible: false, //外层弹框
        innerVisible: false, //内层弹框
        total: 0, // 总条数
        tableData: [], //表格数据
        loading: false, //请求刷新
        form: {},
        // 查询数据数据
        queryParams: {
          page_no: 1, //第一页
          page_size: 10, //一页10条
          search: undefined,
          bait_type: undefined,
          fall: 0
        },
        // 临时编辑的行
        tempRow: {
          bait_content: '', //内容
          linux_path: '', //存放路径
          windows_path: '', //存放路径
          psd_length: '', //密码长度
          describe: '', //描述
          bait_name: '', //蜜饵名称
          username: '', //用户名
          bait_type: undefined, //蜜饵类型
          // id: '', //id
        },
        textarea: "", //查看示例
        // 表单认证
        rules: {
          bait_name: [{
              required: true,
              message: '请输入蜜饵名称',
              trigger: 'blur'
            },
            {
              min: 4,
              message: '至少输入4位',
              trigger: 'blur'
            }
          ],
          describe: [{
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }],
          linux_path: [{
            required: true,
            message: '请输入Linux路径',
            trigger: 'blur'
          }],
          windows_path: [{
            required: true,
            message: '请输入Windows路径',
            trigger: 'blur'
          }],
          psd_length: [{
            required: true,
            message: '请输入密码位数',
            trigger: 'change'
          }],
          bait_content: [{
            required: true,
            message: '请输入密码位数',
            trigger: 'change'
          }],
          bait_content: [{
            required: true,
            message: '请填写蜜罐内容',
            trigger: 'blur'
          }],
          username: [{
            required: true,
            message: '请填写账号字典',
            trigger: 'blur'
          }]
        },
      }
    },
    methods: {
      // 失陷数据方法
      getDecoyStateFn(){
        getDecoyState() .then((res) => {
        // console.log(res);
        this.shixianNUM=res.data.fall_count;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      // 提交
      submitForm: function() {
        this.$refs["tempRow"].validate(valid => {
          if (valid) {
            if (this.dialogTitle == "编辑") {
              reviseDecoy(this.tempRow).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.outerVisible = false;
                this.getDecoyManage();
              });
            } else {
              getDecoyBuild(this.tempRow).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.outerVisible = false;
                this.getDecoyManage();
              });
            }
          }
        });
      },
      // 删除行
      delRow(row) {
        let data = {
          id: row.id
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return deleteDecoy(data);
        }).then(() => {
          this.getDecoyManage();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      goTop() {
        // 显示弹框
        this.innerVisible = false;
        // 修改弹框标题
        this.dialogTitle = '编辑';
      },
      //预览
      toSee() {
        // 显示弹框
        this.innerVisible = true;
        // 修改弹框标题
        this.dialogTitle = '预览';
      },
      // 修改
      toEdit(row) {
        this.disabled = false
        // 当前行的数据赋值给临时行
        this.tempRow = {
          ...row
        };
        // 存储正在编辑的行
        this.editIndex = this.tableData.findIndex(item => item.bait_type === row.bait_type);
        // 显示弹框
        this.outerVisible = true;
        // 修改弹框标题
        this.dialogTitle = '编辑';
      },
      cancel() {
        this.outerVisible = false;
        this.reset();
      },
      // 表单重置
      reset() {
        // 重置临时行
        this.tempRow = {
          bait_content: '',
          linux_path: '',
          windows_path: '',
          psd_length: '',
          describe: '',
          bait_name: '',
          username: '',
          bait_type: '',
          // id: '',
        };
        this.resetForm("tempRow");
      },
      // 新增数据
      toAdd() {
        // 重置表单
        // 重置临时行
        this.tempRow = {
          bait_content: '',
          psd_length: '',
          describe: '',
          bait_name: '',
          username: '',
          bait_type: '',
        };
        // 显示弹框
        this.outerVisible = true;
        //禁止预览按钮
        if (this.tempRow.bait_content != null) {
          this.disabled = true
        } else {
          this.disabled = true
        }

        // 修改弹框标题
        this.dialogTitle = '新增文件蜜饵';
      },
      // 表格数据
      getDecoyManage() {
        var data = {
          "page_no": this.queryParams.page_no, //页数
          "page_size": this.queryParams.page_size, //条数
          "search": this.queryParams.search, //搜索框
          "bait_type": this.queryParams.bait_type,
          "fall": this.queryParams.fall
        }
        this.loading = true;
        getDecoyManage(data).then(res => {
          // console.log(res)
          this.tableData = res.data.list
          this.total = res.data.total_num;
          this.loading = false;
        })
      },
     /** 搜索按钮操作 */
     handleQuery() {
       this.getDecoyManage();
     },
     /** 重置按钮操作 */
     resetQuery(formName) {
       this.$refs[formName].resetFields();
       this.handleQuery();
     },
    },
    created() {
      this.getDecoyManage();
      this.getDecoyStateFn()
    },
  }
</script>

<style lang="scss" scoped>
  .c-body {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .left-text,
    .right-text {
      text-align: center;
      font-weight: 700;
    }

    .left,
    .right {
      width: 350px;
      height: 400px;
      overflow-y: auto;
    }
  }

  .innerText {
    i {
      // font-size: 18px;
      color: #FAB427;
    }
  }

  .mleft {
    margin-left: 10px;
  }

  .dialog .el-form,
  .inner .el-form {
    height: 440px;
    overflow-y: auto;
  }

  .data-serach,
  .data-table {
    background-color: #fff;webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
  }

  .el-form {
    padding: 15px;webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);border-radius: 4px;
  }

  .data-serach .el-form-item {
    margin-bottom: 0;
    margin-right: 30px;
  }

  .pagination-container {
    height: 50px;
  }

  .data-table {
    margin-top: 15px;
  }

  .data-export {
    display: block;
    height: 52px;
    box-sizing: border-box;
    padding-right: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .img {
    vertical-align: middle;
    margin-right: 5px;
  }
</style>

<style lang="scss">
  .el-dialog__footer {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  label {
    font-weight: normal;
  }
</style>
