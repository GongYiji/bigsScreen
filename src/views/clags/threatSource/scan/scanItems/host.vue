<template>
  <div class="host">
    <div class="host-serach">
      <el-form :inline="true" :model="queryParams" ref="queryParams" class="form">
        <el-form-item prop="hostIp">
          <el-input v-model="queryParams.hostIp" placeholder="模糊查询IP" @change="handleQuery()"
            prefix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item prop="hostUsrname">
          <el-input v-model="queryParams.hostUsrname" placeholder="模糊查询主机别名" @change="handleQuery()"
            prefix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetQuery('queryParams')">重 置</el-button>
        </el-form-item>
      </el-form>
      <div class="serach-btn">
        <el-button type="primary" icon="el-icon-plus" @click="toAdd()">添加主机</el-button>
      </div>
    </div>
    <!-- 搜索部分完成 -->
    <div class="host-content">
      <el-table :data="tableData" height='50vh' v-loading="loading"
        style="width: 98%;margin: 15px;border: 1px solid #f0f0f0;margin-bottom: 0;">
        <el-table-column prop="hostIp" label="主机IP">
        </el-table-column>
        <el-table-column prop="hostName" label="主机别名">
        </el-table-column>
        <el-table-column prop="hostPort" label="默认端口">
        </el-table-column>
        <el-table-column prop="hostUsrname" label="主机账户">
        </el-table-column>
        <el-table-column prop="hostStatus" label="校验状态">
          <template slot-scope="scope">
            <div v-if="scope.row.hostStatus == 0" class="btn-icon">
              <el-button type="danger" plain icon="el-icon-warning" size="small">验证失败</el-button>
            </div>
            <div v-else-if="scope.row.hostStatus == 1" class="btn-icon">
              <el-button type="success" plain icon="el-icon-success" size="small">验证成功</el-button>
            </div>
            <div v-else class="btn-icon">
              <el-button type="info" plain icon="el-icon-remove" size="small">未验证</el-button>
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
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <span style="color: #C4C7CE;"> | </span>
            <el-button type="text" size="small" @click="delRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单完成 -->
      <div class="pagination">
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
          @pagination="fngetHostList()" />
      </div>
    </div>
    <!-- 主体表格完成 -->
    <div class="host-dialog">
      <el-dialog :title="title" :visible.sync="open" width="30%">
        <div class="dialog-content">
          <el-form class="dialog-form" ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item label="主机别名:" prop="hostName">
              <el-input v-model="form.hostName" style="width: 330px;" placeholder="请输入主机别名"></el-input>
            </el-form-item>
            <el-form-item label="端口号:" prop="hostPort">
              <el-input v-model="form.hostPort" style="width: 330px;" placeholder="请输入端口号"></el-input>
            </el-form-item>
            <el-form-item label="主机IP:" prop="hostIp">
              <el-input v-model="form.hostIp" style="width: 330px;" placeholder="请输入主机IP"></el-input>
            </el-form-item>
            <el-form-item label="主机账户:" prop="hostUsrname">
              <el-input v-model="form.hostUsrname" style="width: 330px;" placeholder="请输入主机账户" autocomplete="new-password"></el-input>
            </el-form-item>
            <el-form-item label="主机密码:" prop="hostPassword">
              <el-input show-password v-model="form.hostPassword" style="width: 330px;" autocomplete="new-password"></el-input>
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
    <!-- 添加编辑弹框完成 -->
  </div>
</template>

<script>
  import {
    getHostList,
    addHost,
    deleteHost,
    reviseHost
  } from '@/api/clags/threatSource/scan/host.js'
  import rsa from '@/utils/rsa'
  import {
    encrypt,
    decrypt
  } from '@/utils/decrypt'

  export default {
    name: 'host',
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
      return {
        loading: false, //刷新提示
        title: '', //弹框标题
        open: false, //打开弹框
        total: 0, //数据总条数
        tableData: [], //表格数据
        //表格查询
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          hostIp: '',
          hostPort: '',
          hostUsrname: '',
          hostPassword: '',
        },
        form: {
          hostId: null,
          hostName: null,
          hostIp: null,
          hostPort: null,
          hostUsrname: null,
          hostPassword: null,
          remark: null,
        },
        rules: {
          hostIp: [{
            validator: IPValidator,
            trigger: 'blur'
          }, {
            required: true,
            message: 'IP不能为空'
          }],
          hostPort: [{
            required: true,
            message: '端口号不能为空'
          }],
          hostName: [{
              required: true,
              message: '请输入主机别名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 4 到 12 个字符',
              trigger: 'blur'
            }
          ],
          hostUsrname: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 4 到 12 个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      // 提交表单
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 密码加密
            this.form.hostPassword = encrypt(this.form.hostPassword)
            if (this.title == '编辑主机') {
              let data = {
                hostId: this.form.hostId,
                hostName: this.form.hostName,
                hostPort: this.form.hostPort,
                hostIp: this.form.hostIp,
                hostUsrname: this.form.hostUsrname,
                hostPassword: this.form.hostPassword,
                remark: this.form.remark,
              }
              reviseHost(data).then(res => {
                this.$modal.msgSuccess("编辑成功");
                this.open = false;
                this.fngetHostList();
              })
            } else {
              let data = {
                hostName: this.form.hostName,
                hostPort: this.form.hostPort,
                hostIp: this.form.hostIp,
                hostUsrname: this.form.hostUsrname,
                hostPassword: this.form.hostPassword,
                remark: this.form.remark,
              }
              addHost(data).then(res => {
                this.$modal.msgSuccess("添加成功");
                this.open = false;
                this.fngetHostList();
              })
            }
            // this.reset()
          }
        });
      },
      // 编辑主机
      toEdit(row) {
        this.title = '编辑主机'
        this.form = {
          ...row
        }
        this.open = true
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 添加主机
      toAdd() {
        this.title = '添加主机'
        this.open = true
        this.reset()
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      delRow(row) {
        let data = {
          hostId: row.hostId
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return deleteHost(data);
        }).then(() => {
          this.fngetHostList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      // 表格数据查询
      fngetHostList() {
        this.loading = true;
        let data = {
          hostIp: this.queryParams.hostIp,
          hostPort: this.queryParams.hostPort,
          hostUsrname: this.queryParams.hostUsrname,
          hostPassword: this.queryParams.hostPassword,
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
        }
        getHostList(data).then(res => {
          this.tableData = res.rows
          this.total = res.total;
          this.loading = false;
        })
      },
      //取消
      cancel() {
        this.open = false
        this.reset()
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 重置表单
      reset() {
        this.form = {
          hostName: null,
          hostIp: null,
          hostPort: null,
          hostUsrname: null,
          hostPassword: null,
          remark: null,
        }
      },
      // 查询
      handleQuery() {
        this.fngetHostList()
      },
      // 重置按钮
      resetQuery(formName) {
        this.$refs[formName].resetFields();
        this.handleQuery();
      },
    },
    created() {
      this.fngetHostList()
    },
  }
</script>

<style lang="scss" scoped>
  .btn-icon ::v-deep .el-button [class*=el-icon-]+span {
    margin-left: 5px;
  }

  .pagination {
    padding: 15px;
    padding-top: 0;
  }

  .host-content {
    width: 98%;
    margin: 15px auto 0;
    background: #fff;
    overflow: hidden;
  }

  .form {
    padding: 15px;
  }

  .host-serach {
    width: 98%;
    margin: 10px auto;
    background: #fff;
    border-radius: 9px;
    justify-content: space-between;
    display: flex;

    .serach-btn {
      padding: 15px;
    }
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

  .host {
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
