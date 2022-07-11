<template>
  <div class="app-container home">
    <header-navigation></header-navigation>

    <div class="content-wrap">
      <!-- 条件搜索  部分 -->
      <div class="search">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
          <el-form-item prop="service_name">
            <el-select multiple clearable v-model="queryParams.service_name" collapse-tags @change="handleQuery"
              placeholder="服务类型">
              <el-option v-for="item in selectData" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="service_ports">
            <el-select multiple clearable v-model="queryParams.service_ports" @change="handleQuery" collapse-tags
              placeholder="监听端口">
              <el-option v-for="(item,index) in selectData" :key="index" :label="item.port" :value="item.port">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加模板 -->
      <div class="table-top">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="openSelect()"
          style="margin-right:10px">添加模块
        </el-button>
      </div>
      <!-- 表格部分 -->
      <div class="table-content">
        <el-table :data="tableData" v-loading="loading" row-key="mould_id" ref="expandstable" :expand-row-keys="expands"
          @row-click="rowClick" style="border:1px solid #dfe6ec" :header-cell-class-name="handlemyclass"
          :row-class-name="getRowClass">
          <el-table-column type="expand" style="padding:0px">
            <template slot-scope="scope">
              <div class="showWrap">
                <div class="left">
                  <div class="left-top">
                    <div class="title">
                      <div class="title-icon">
                        <img src="@/assets/images/icon.png">
                      </div>
                      <div class="title-name" style="color: #333333; font-weight: 600;">模板信息</div>
                    </div>
                    <div class="content">
                      <el-descriptions class="margin-top" :column="2" style="margin: 10px 30px" border>
                        <el-descriptions-item>
                          <template slot="label">
                            模板名称
                          </template>
                          <div class="td1" v-if="flag">
                            <span ref="text" class="text">{{temObj.mould_name}}</span>
                            <i class="el-icon-edit" style="height: 40px;line-height: 40px;" @click="openInp()"></i>
                          </div>
                          <div v-else>
                            <el-form :model="form" ref="form">
                              <el-form-item prop="mould_name">
                                <el-input type="text" v-model="form.mould_name"></el-input>
                                <el-button type="primary" icon="el-icon-check" @click="fnupdateTemplate()"></el-button>
                              </el-form-item>
                            </el-form>
                          </div>
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            修改时间
                          </template>
                          {{timestampToTime(temObj.update_time)}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            创建时间
                          </template>
                          {{timestampToTime(temObj.create_time)}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            模板描述
                          </template>
                          <div class="td1" v-if="flag1">
                            <span ref="text" class="text">{{temObj.describe}}</span>
                            <i class="el-icon-edit" style="height: 40px;line-height: 40px;" @click="openInp1()"></i>
                          </div>
                          <div v-else>
                            <el-form :model="form" ref="form">
                              <el-form-item prop="describe">
                                <el-input type="text" v-model="form.describe"></el-input>
                                <el-button type="primary" icon="el-icon-check" @click="fnupdateTemplate()"></el-button>
                              </el-form-item>
                            </el-form>
                          </div>

                        </el-descriptions-item>
                      </el-descriptions>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="title">
                    <div class="title-icon"> <img src="@/assets/images/icon.png"></div>
                    <div class="title-name" style="color: #333333; font-weight: 600;">已加载服务</div>
                  </div>
                  <div>
                    <el-table :data="serviceState" row-key="mould_id"
                      style="width: 90%;margin: 10px  auto 0px auto;border:1px solid rgba(17,18,34,0.13)">
                      <el-table-column prop="name" label="服务名称" width="160"
                        style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                      </el-table-column>
                      <el-table-column prop="port" width="180px" label="监听端口">
                        <template slot-scope="scope">
                          <div v-if="index!=scope.$index">
                            {{scope.row.port}} <i class="el-icon-edit" @click="clickPort(scope.row,scope.$index)"></i>
                          </div>
                          <div style="display: flex;justify-content: space-between;" v-else>
                            <p style="margin: 0;height: 36px;line-height: 36px;">{{port[0]}} /</p>
                            <el-input-number controls-position="right" v-model="port[1]" style="width: 105px;">
                            </el-input-number>
                            <i class="el-icon-edit" style="height: 36px;line-height: 36px;"
                              @click="resPort(scope.row)"></i>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="https" width="200" :formatter="isHttps" label="协议传输">
                        <template slot-scope="scope">
                          <div>
                            <el-radio-group v-if="scope.row.class=='WEB服务'" v-model="scope.row.https"
                              @change="httpClick(scope.row)">
                              <el-radio label="false">http</el-radio>
                              <el-radio label="true">https</el-radio>
                            </el-radio-group>
                            <span v-else>- -</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button size="mini" @click.native.prevent="deleteRow(scope.$index, serviceState)">删除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="add"
                      style="width: 90%;margin: 0 auto;height:35px;border-bottom:1px solid rgba(17,18,34,0.13);border-left:1px solid rgba(17,18,34,0.13);border-right:1px solid rgba(17,18,34,0.13);display:flex;align-items: center;justify-content: center;background: #fff;">
                      <div style="width:15px;height:15px"> <i class="el-icon-circle-plus" style="margin-top: 2px;"></i>
                      </div>
                      <div style="margin-left:10px" @click="openDetail"> 添加蜜罐服务</div>
                    </div>
                  </div>
                  <div class="right-foot">
                    <div class="foot-top">
                      <i class="el-icon-warning"></i><span> 注 意</span>
                    </div>
                    <ul>
                      <li>每个模板最多可以加载20个模拟服务；</li>
                      <li>TCP端口监听服务作为特殊服务，最多可以监听10个不同端口；</li>
                      <li>同一模板加载的模拟服务所监听的端口不能重复；</li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mould_name" label="模板名称" align="center" :render-header="labelHead" width="180">
          </el-table-column>
          <el-table-column prop="client_num" label="被节点引用数" align="center" :render-header="labelHead">
          </el-table-column>
          <el-table-column prop="ports" label="默认监听端口" align="center" :render-header="labelHead">
          </el-table-column>
          <el-table-column prop="describe" label="描述" align="center" :render-header="labelHead">
          </el-table-column>
          <el-table-column label="操作" align="center" :render-header="labelHead" width="200">
            <template slot-scope="scope">
              <i class="el-icon-arrow-down" @click="expandsHandle(scope.row)" style="margin-right: 20px;"></i>
              <i class="el-icon-delete" @click.stop="fnRemoveTemp(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 主体结束 -->
    <div class="template-dialog-one">
      <el-dialog title="添加模块" :visible.sync="open1" width="30%">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
          <el-form-item label="模板名称:" prop="mould_name">
            <el-input v-model="form.mould_name" placeholder="请输入模板名称,长度4-32"></el-input>
          </el-form-item>
          <el-form-item class="tree" label="关联服务:" prop="type">
            <el-tree show-checkbox class="filter-tree" node-key="id" :data="treeList" v-model="form.type"
              :props="defaultProps" @check-change='(click, checked)=>{handleCheckChange(click, checked)}' ref="tree">
            </el-tree>
          </el-form-item>
          <div style="margin-left: 90px;color: red;margin-bottom: 10px;">注意:每个模块最多只能添加20种服务</div>
          <el-form-item label="描述:" prop="describe">
            <el-input type="textarea" v-model="form.describe"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel1()">取 消</el-button>
          <el-button type="primary" @click="addTemplate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加模块结束 -->
    <div class="template-dialog-two">
      <el-dialog title="添加蜜罐服务" :visible.sync="open" width="48%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item prop="is_add">
            <div class="tranferbox">
              <div class="conbox">
                <div class="box-body">
                  <div class="titbox">
                    <span>全部服务 | {{selectData.length}}</span>
                  </div>
                  <div class="wordbox">
                    <el-tree @check="getData" show-checkbox class="filter-tree" node-key="id" :data="fileArr"
                      v-model="form.is_add" :default-checked-keys="idArr" :props="defaultProps" ref="tree"></el-tree>
                  </div>
                </div>
              </div>
              <img src="@/assets/images/right.png" class="icon">
              <div class="conbox">
                <div class="box-body">
                  <div class="titbox">
                    <span v-if="keyarr.length<21">已选服务 | {{keyarr.length}}/20</span>
                    <span v-else>已选服务 | <span style="color: red;">{{keyarr.length}}</span>/20</span>
                  </div>
                  <div class="wordbox">
                    <ul>
                      <li v-for="(item,index) in keyarr" :key="index">
                        <div class="inli">
                          <i class="el-icon-s-custom"></i>
                          <span>{{item.label}}</span>
                          <i class="el-icon-close" @click="removeData(item)"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加蜜罐服务结束 -->
  </div>

</template>

<script>
  import {
    addTemplate,
    getServeList,
    updateTemplate,
    getMouldsList,
    getDetailedList,
    getMonitorList,
    getExpandList,
    delTemplate,
    getMouldServices,
    getTree
  } from '@/api/clags/environment/template.js'
  import resize from '@/views/dashboard/mixins/resize';
  import {
    getKbFormatting,
    getFormatFileSize
  } from '@/utils/ruoyi'
  export default {
    name: "Index",
    mixins: [resize],
    // components: {
    //     headerNavigation
    // },
    data() {
      return {
        flag: true, //详情修改
        flag1: true,
        checkedChange: [],
        // 穿梭框数据展示
        defaultProps: {
          children: "children",
          label: "label"
        },
        treeList: [], //添加模块父类
        treeChildren: [], //添加模块子类
        idArr: [], //默认选中节点
        fileArr: [], //添加蜜罐服务
        checkList: [], //左边数据集合
        keyarr: [], //选中数据集合
        selectData: [], //下选框数据
        tableData: [], //外层表格数据
        // 遮罩层
        loading: false,
        // 要展开的行，数值的元素是row的key值
        expands: [],
        // 查询参数
        queryParams: {
          page_no: 1, //页数
          page_size: 10, //一页10条
          service_class: undefined,
          service_name: undefined,
          service_ports: undefined,
          service_types: undefined,

        },
        temObj: {}, //点击表格中的每一行，显示详情的对象
        serviceState: [], //服务状态的数组
        // 新增节点的是否显示弹出层
        open: false,
        // 新增节点成功后的是否显示弹出层
        open1: false,
        form: {
          create_time: undefined,
          describe: undefined,
          mould_id: undefined,
          mould_name: undefined,
          update_time: undefined,
          services: undefined,
          is_add: undefined,
          type: undefined,
        },
        state: [], //删除子节点存放数组
        buildState: [], //新增蜜罐
        // 规则
        rules: {
          mould_name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 32,
              message: '长度在 4 到 32 个字符',
              trigger: 'blur'
            }
          ],
          type: [{
            type: 'array',
            required: true,
            trigger: 'change'
          }],
        },
        port: '',
        index: null,
      };
    },
    created() {
      this.getTableData();
      this.getSelectData();
    },
    methods: {
      clickPort(row, index) {
        this.index = index
        this.port = row.port.split('/')
      },
      // 端口修改
      resPort(row) {
        row.port = this.port.join('/')
        let data = {
          mould_id: this.form.mould_id,
          services: this.serviceState
        }
        getServeList(data).then(res => {
          this.$notify({
            message: '修改成功',
            type: 'success'
          })
        })
        this.index = null
        console.log(this.port)
      },
      // http状态修改
      httpClick(row) {
        let data = {
          mould_id: this.form.mould_id,
          services: this.serviceState
        }
        getServeList(data).then(res => {
          this.$notify({
            message: '修改成功',
            type: 'success'
          })
        })
      },
      openInp() {
        this.flag = false
      },
      openInp1() {
        this.flag1 = false
      },
      // 获取被选中的节点
      handleCheckChange(data, checked) {
        this.treeChildren = data.children
        this.treeChildren.forEach((item, index) => {
          this.checkedChange.push(item.type)
        })
      },
      // 添加模板获取树形结构
      openSelect() {
        this.reset();
        this.open1 = true
        getTree().then(res => {
          this.treeList = res.data.treeList;
        })
        this.$nextTick(() => {
          this.$refs['form'].clearValidate() // 只清除清除验证
        })
      },
      // 添加模板
      addTemplate: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.form.type = this.checkedChange
            let data = {
              "describe": this.form.describe,
              "mould_name": this.form.mould_name,
              "services": this.form.type,
            }
            addTemplate(data).then(res => {})
            this.getTableData()
            this.open1 = false
          }
        });
      },
      fnupdateTemplate() {
        let data = {
          "mould_id": this.form.mould_id,
          "create_time": this.form.create_time,
          "describe": this.form.describe,
          "mould_name": this.form.mould_name,
          "update_time": this.form.update_time,
          "services": this.serviceState,
        }
        updateTemplate(data).then(res => {})
        this.flag = true
        this.flag1 = true
        this.getTableData()
        this.fngetDetailedList()
      },
      // 时间戳转换
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M =
          (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      // 遍历穿梭框数据
      getData() {
        this.keyarr = []
        this.checkList = this.$refs.tree.getCheckedNodes();
        if (this.checkList.length != 0) {
          for (var i = 0; i < this.checkList.length; i++) {
            if (!this.checkList[i].children) {
              this.form.is_add = this.checkList[i].is_add = true
              this.keyarr.push(this.checkList[i])
              this.buildState = this.keyarr
            }
          }
        } else {
          this.keyarr = []
        }
      },
      // 监听选中节点
      setCheckedNodes(arr) {
        this.$refs.tree.setCheckedNodes(arr);
      },
      // 移出节点
      removeData(data) {
        let checklist = this.keyarr;
        for (var i = 0; i < checklist.length; i++) {
          if (checklist[i].label === data.label) {
            checklist.splice(i, 1);
          }
        }
        this.keyarr = checklist;
        this.setCheckedNodes(this.keyarr);
      },
      // 穿梭框数据请求
      openDetail() {
        let data = {
          "mould_id": this.form.mould_id
        }
        this.open = true
        getMouldServices(data).then(res => {
          this.fileArr = res.data.treeList;
          this.idArr = res.data.cocher;
          this.keyarr = res.data.cocherList;
        })
      },
      // 外层表格数据
      getTableData() {
        var data = {
          "page_no": 1, //页数
          "page_size": 10, //条数
          "search": "", //搜索模版名称关键字
          "sort": "", //排序规则
          "order": "", //排序字段
          "service_ports": this.queryParams.service_ports, //监听端口
          "service_types": this.queryParams.service_name, //服务名称
        }
        this.loading = true;
        getMouldsList(data).then(res => {
          this.tableData = res.data.data
          this.loading = false;
        })
      },
      // 下选框数据
      getSelectData() {
        getMonitorList().then(res => {
          this.selectData = res.data;
        });
      },
      /** 提交按钮 */
      submitForm() {
        if (this.buildState.length < 21) {
          this.serviceState = this.buildState
          let data = {
            "mould_id": this.form.mould_id,
            "services": this.serviceState,
          }
          getServeList(data).then(res => {})
          this.getTableData();
          this.open = false
        } else {
          this.openError()
          return false
        }
      },
      openError() {
        this.$notify.error({
          message: '最多应用20个蜜罐服务，已超出'
        });
      },
      // 取消按钮
      cancel() {
        this.buildState.length = this.serviceState.length
        this.open = false;
      },
      cancel1() {
        this.reset()
        this.open1 = false
      },
      // 重置表单
      reset() {
        this.form = {
          create_time: undefined,
          describe: undefined,
          mould_id: undefined,
          mould_name: undefined,
          update_time: undefined,
          services: undefined,
          is_add: undefined,
          type: undefined,
        }
      },

      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.page_no = 1;
        this.getTableData();
      },

      //**操作-- 展开按钮 展开表格中的行，显示详情 */
      expandsHandle(row) {
        this.$refs.expandstable.toggleRowExpansion(row)
      },

      //数据转化 -->节点详情中的是否是https 回显单选按钮
      isHttps(row, column) {
        const https = row.https
        if (https == 'flase') {
          return 1
        } else if (https == 'true') {
          return 2
        }
      },

      /***点击每一行的时候 只展开当前点击的行 */
      rowClick(row, event, column) {
        Array.prototype.remove = function(val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        if (this.expands.indexOf(row.mould_id) < 0) {
          this.expands = [];
          this.expands.push(row.mould_id);
          let data = {
            'mould_id': row.mould_id
          }
          getDetailedList(data).then(res => {
            this.temObj = res.data
            this.serviceState = res.data.services
            this.form.mould_id = res.data.mould_id
            this.form.describe = res.data.describe
            this.form.create_time = res.data.create_time
            this.form.update_time = parseInt(new Date().getTime() * 1 / 1000)
            this.form.type = res.data.services.type
            this.form.mould_name = res.data.mould_name
          })
        } else {
          this.expands.remove(row.mould_id);
        }
      },
      // 表格详情数据
      fngetDetailedList() {
        let data = {
          'mould_id': this.form.mould_id
        }
        getDetailedList(data).then(res => {
          this.temObj = res.data
          this.serviceState = res.data.services
          this.form.mould_id = res.data.mould_id
          this.form.describe = res.data.describe
          this.form.create_time = res.data.create_time
          this.form.update_time = parseInt(new Date().getTime() * 1 / 1000)
          this.form.type = res.data.services.type
          this.form.mould_name = res.data.mould_name
        })
      },
      /**删除父节点节点 */
      fnRemoveTemp(row) {
        let data = {
          mould_id: row.mould_id
        }
        this.$modal.confirm('是否确认删除').then(function() {
          return delTemplate(data);
        }).then(() => {
          this.getTableData();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      // 删除子节点
      deleteRow(index, rows) {
        rows.splice(index, 1);
        let data = {
          "mould_id": this.form.mould_id,
          "services": this.serviceState,
        }
        getServeList(data).then(res => {
          this.state = this.serviceState
        })
        this.getTableData()
      },
      /** 处理表格的表头部分，一行显示*/
      labelHead: function(h, {
        column,
        $index
      }) {
        let l = column.label.length
        let f = 16
        column.minWidth = f * (l + 2) //加上一个文字长度
        return h('div', {
          class: 'table-head',
          style: {
            width: '100%'
          }
        }, [column.label])
      },
      /** 设置表格表头的公共样式*/
      handlemyclass: function(row, column, rowIndex, columnIndex) {
        return 'tableStyle'
      },
      /**给每一行添加样式，隐藏展开的箭头图标 */
      getRowClass(row, rowIndex) {
        let data = row.row;
        let res = [];
        if (data.list && data.list.length > 0) {
          res.push('row-expand-has')
          return res;
        } else {
          res.push('row-expand-unhas')
          return res;
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  ::v-deep .el-table .cell {
    overflow: hidden !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::v-deep .el-form-item__error {
    display: none;
  }

  .tree {
    height: 161px;
    overflow-y: auto;
  }

  .td1 {
    display: flex;
    justify-content: space-between;
  }

  .text {
    padding: 10px;
  }

  .tranferbox {
    display: flex;
    height: 350px;

    .wordbox {
      height: 300px;
      overflow-y: auto
    }

    ul {
      list-style: none;
      padding-left: 10px;
    }

    .titbox {
      margin-bottom: 10px;
      background: #f0f0f0;

      span {
        margin-left: 10px;
        font-size: 15px;
        font-weight: 600;
      }
    }

    .conbox:nth-child(1) {
      margin-left: 25px;
    }

    .conbox {
      width: 275px;
      background-color: #fff;
      border: 1px solid #f0f0f0;

      .box-body {
        height: 300px;
        background: #fff;
      }
    }

    .icon {
      width: 50px;
      height: 50px;
      margin: 20% 10px;
    }
  }

  .template-dialog-one {
    .el-form-item {
      margin-bottom: 20px;
    }


  }

  .foot-top {
    margin-top: 10px;
    margin-left: 20px;

    i {
      color: #FAB427;
    }

    span {
      width: 28px;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 20px;
    }
  }

  .right-foot {
    width: 500px;
    margin-top: 20px;
    margin-left: 37px;
    margin-bottom: 10px;
    background: #fff;
    border: 1px solid #FAB427;

    ul {
      margin-bottom: 10px;
      margin-top: 0;

      li::marker {
        color: #FAB427;
      }
    }
  }

  .search .el-form {
    margin: 15px 0 15px 10px;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  ::v-deep .el-table .cell {
    overflow: visible;
  }

  ::v-deep .el-table {
    overflow: visible;
  }

  ::v-deep .el-table__body {
    overflow: visible;
  }

  ::v-deep .el-table__body-wrapper {
    overflow: visible;
  }

  .select-style {
    background: darkcyan;
  }

  .app-container {
    margin: 0px;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    padding: 0px !important;

    .content-wrap {
      width: 95%;
      margin: 0 auto;

      .search {
        background: #ffffff;
        display: flex;
        align-items: center;
        height: 7vh;
      }

      .table-top {
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        height: 6vh;
        width: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .showWrap {
        display: flex;
        margin-top: -10px !important;
        background: #f4f4f4;
        padding-top: 15px;

        // height: 350px;
        .left {
          flex: 1;

          // background: pink;
          .left-bottom {
            // height: 50%;
            padding-bottom: 20px;

            // background: darkcyan;
            .title {
              display: flex;
              align-items: center;
              padding-left: 20px;

              .title-icon {
                width: 13px;
                height: 13px;
                margin-right: 7px;

                // background: darkgreen;
                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
              }

              .title-name {
                font-weight: 500;
              }
            }
          }

          .left-top {
            // height: 50%;
            // background: darkgoldenrod;
            padding-bottom: 20px;

            .title {
              display: flex;
              align-items: center;
              padding-left: 20px;

              .title-icon {
                width: 13px;
                height: 13px;
                margin-right: 7px;

                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }

              }

              .title-name {
                font-weight: 500;
              }
            }
          }
        }

        .right {
          // background: deeppink;
          flex: 1;

          .title {
            display: flex;
            align-items: center;
            padding-left: 20px;

            .title-icon {
              width: 13px;
              height: 13px;
              margin-right: 7px;

              // background: darkgreen;
              img {
                display: inline-block;
                width: 100%;
                height: 100%;
              }
            }

            .title-name {
              font-weight: 500;
            }
          }

          .secondLevelTitle {
            padding-left: 40px;
            font-size: 13px;
            font-weight: 500;
          }

          .honeyTheBaitStatus {
            margin-top: 10px;
            margin-bottom: 10px;
            padding-left: 40px;
            font-size: 13px;
            font-weight: 500;
          }

          .content {
            display: flex;
            width: 90%;
            margin: 0 auto;
            line-height: 30px;
            border: 1px solid #dfe6ec;
            background: #fff;
            padding: 0px 20px;



            .item {
              flex: 1;
            }
          }

          .wranning {
            width: 55%;
            margin-left: 40px;
            margin-top: 10px;
            margin-bottom: 10px;
            background: #fff;
            border: 1px solid rgba(255, 169, 3, 0.3);
          }
        }
      }
    }
  }

  .add {
    &:hover {
      color: red;
      font-weight: 500;
    }
  }

  .btnHover {
    &:hover {
      text-decoration: underline;
    }
  }
</style>

<style lang="scss">
  .content .el-form-item--medium .el-form-item__content {
    display: flex;
  }

  .template-dialog-one .el-dialog:not(.is-fullscreen) {
    margin-top: 0;
  }

  label {
    font-weight: normal;
  }

  .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  .el-dialog__footer {
    height: 76px;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 5px 5px;
  }

  .el-popover.popoverDiv {
    padding: 0px;

    .title {
      background: #ececec;
      color: #000;
      padding-left: 10px;
      font-weight: 400;
      border-top: 1px solid rgb(229, 229, 229);
      border-bottom: 1px solid rgb(229, 229, 229);
    }

    .div2 {
      display: flex;
      margin-top: 15px;
      align-items: center;

      .top-left-icon {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        margin-right: 7px;
        border-radius: 50%;
        background: pink;
      }
    }

    .div3 {
      display: flex;
      margin-top: 15px;
      margin-bottom: 10px;
      align-items: center;

      .bottom-left-icon {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        margin-right: 7px;
        border-radius: 50%;
        background: pink;
      }
    }
  }

  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table .cell {
    overflow: visible;
  }

  .el-table {
    overflow: visible;
  }

  .el-table__body {
    overflow: visible;
  }

  .row-expand-unhas .el-table__expand-column {
    pointer-events: none;
  }

  .row-expand-unhas .el-table__expand-column .el-icon {
    visibility: hidden;
  }
</style>
