<!--  -->
<template>
  <div class="page-attackip">
    <header-navigation :submenuArr="arr"></header-navigation>
    <div class="page-input">
      <div>
        <el-input
          placeholder="模糊查询IP"
          v-model="searchStateIP"
          clearable
          @change="attack_scanFn"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
      <!-- 时间选择框 -->
      <div>
        <el-date-picker
          v-model="attformInline.value1"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          :start-placeholder="attformInline.value2"
          :end-placeholder="attformInline.value3"
          clear-icon
          @change="dateUsernameFn"
          value-format="timestamp"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div>
        <el-select
          v-model="SelectValueKill"
          placeholder="蜜罐场景"
          @change="mgTotalFn"
        >
          <el-option
            v-for="item in optionsScene"
            :key="item.index"
            :label="item.label"
            :value="item.value"
            ><span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px"
              >({{ item.kk }})起</span
            >
          </el-option>
        </el-select>
      </div>
      <div
        class="biaojiIP"
        @click="activeClassFn1"
        :class="flag1 == 2 ? 'activeClass' : ''"
      >
        标记IP({{ signNumber }}起)
      </div>
      <div
        class="qiyexinxi shixianSHUJU"
        @click="activeClassFn3"
        :class="flag3 == 2 ? 'activeClass' : ''"
      >
        自定义情报({{ ZDYbait }}起)
      </div>
      <!-- <div class="reset" @click="resetFn">重置</div> -->

      <el-button @click="resetFn" icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="page-main">
      <!-- <el-row class="el-row">
        <el-col></el-col>
        <el-col class="el-col">
          <el-button
            class="refresh"
            type="primary"
            plain
            icon="el-icon-refresh-right"
            @click="refreshFn"
            >刷新</el-button
          >

          <el-button class="export" type="primary" plain icon="el-icon-download"
            >导出</el-button
          >
        </el-col>
      </el-row> -->

      <div
        style="
          height: 53px;
          display: flex;
          justify-content: right;
          box-sizing: border-box;
          padding-right: 16px;
          padding-top: 10px;
          padding-bottom: 10px;
        "
      >
        <el-button
          class="refresh"
          type="primary"
          icon="el-icon-refresh-right"
          @click="refreshFn"
          style="font-size: 12px; padding: 7px 15px; height: 32px; width: 73px"
          >刷新</el-button
        >

        <el-button
          class="export"
          type="primary"
          icon="el-icon-download"
          style="font-size: 12px; padding: 7px 15px; height: 32px; width: 73px"
          >导出</el-button
        >
      </div>
      <!-- <div class="list-header">
        <div class="refresh" @click="refreshFn">
          <i class="el-icon-refresh-right"></i>
          刷新
        </div>
        <div class="export">
          <i>
            <img src="@/assets/images/export@.png" alt="" />
          </i>
          导出
        </div>
      </div> -->
      <!-- 列表主体 -->
      <!-- <div class="list-main" v-loading="loading">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="ip" label="攻击IP" style="padding: 0px">
            <template slot-scope="scope">
              <i class="scanIPIP"
                ><img src="@/assets/images/biaoji2.png" alt=""
              /></i>
              {{ scope.row.ip }}
            </template>
          </el-table-column>
          <el-table-column
            prop="country"
            label="威胁情报"
            type="expand"
            width="300"
          >
            <template slot-scope="scope"
              >{{ scope.row.country }}
              <div class="showWrap"></div>
            </template>
          </el-table-column>
          <el-table-column prop="custom" label="自定义情报"> </el-table-column>
          <el-table-column prop="services" label="攻击目标"> </el-table-column>
          <el-table-column prop="clients" label="攻击节点" width="160">
          </el-table-column>
          <el-table-column prop="asn.rank" label="危险等级" width="150">
          </el-table-column>
          <el-table-column prop="" label="操作" width="200">
            <template slot-scope="scope">
              <i class="scanIPIP scanIPIP2">
                <img src="@/assets/images/biaoji2.png" alt="" />
                <img src="@/assets/images/biaoji2.png" alt="" />
                <img src="@/assets/images/biaoji2.png" alt="" />
              </i>
            </template>
          </el-table-column>
        </el-table>

        <div
          style="
            display: flex;
            width: 100%;
            height: 81px;
            align-items: center;
            justify-content: right;
            box-sizing: border-box;
            padding-right: 140px;
            flex-direction: row-reverse;
          "
        >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
          <div class="total">
            共计
            <span>{{ total }}</span>
            条数据
          </div>
        </div>
      </div> -->
      <div class="table-content">
        <el-table
          :data="tableData"
          v-loading="loading"
          row-key="name_id"
          ref="expandstable"
          :expand-row-keys="expands"
          @row-click="rowClick"
          style="border: 1px solid #dfe6ec"
          :header-cell-class-name="handlemyclass"
          :row-class-name="getRowClass"
        >
          <el-table-column type="expand" style="padding: 0px">
            <template slot-scope="scope" style="padding: 0px">
              <div class="showWrap" style="background: #fafafafa">
                <div class="left_1">
                  <div class="left_top">
                    <div class="title">
                      <img src="@/assets/images/icon.png" alt="" />基本信息
                    </div>
                    <div class="input_box">
                      <div class="div1">攻击来源：</div>
                      <div class="div2">{{ essentialInformation.ip }}</div>
                      <div class="div1">地理位置：</div>
                      <div class="div2">{{ essentialInformation.region }}</div>
                      <div class="div1">ASN：</div>
                      <div class="div2">{{ essentialInformation.asnInfo }}</div>
                      <div class="div1">危险等级：</div>
                      <div class="div2">{{ essentialInformation.asnRank }}</div>
                    </div>
                  </div>
                  <div class="left_bottom">
                    <div class="title">
                      <img src="@/assets/images/icon.png" alt="" />威胁情报
                    </div>
                    <div class="input_box">
                      <div class="div1">微步情报：</div>
                      <div class="div2 div3">--</div>
                      <div class="div1">自定义情报：</div>
                      <div
                        class="div2"
                        style="cursor: auto; position: relative"
                      >
                        <div class="zdyDIV" v-show="zdyDIVshow">
                          <el-input
                            v-model="inputZDY"
                            placeholder="请输入新增标签"
                            clearable
                            @blur="zdyDivFn(scope.row)"
                          ></el-input>
                        </div>
                        <div
                          v-for="(item, index) in tableData[inputIndex].custom"
                          :key="index"
                          style="display: flex; justify-self: start"
                        >
                          <div
                            style="
                              background-color: #f3f3f3;
                              color: #999;
                              border-color: #dadada;
                              margin: 0 2px;
                              padding: 5px 5px;
                              border-radius: 5px; ;
                            "
                          >
                            {{ item }}
                            <img
                              src="@/assets/images/jiedianguanli_tianjia.png"
                              alt=""
                              style="
                                width: 16px;
                                -ms-transform: rotate(45deg);
                                -webkit-transform: rotate(45deg);
                                transform: rotate(45deg);
                                vertical-align: middle;
                                cursor: pointer;
                              "
                              @click="delClassFn(index)"
                            />
                          </div>
                        </div>
                        <img
                          src="@/assets/images/bianjibi.png"
                          alt=""
                          @click="showshowFn"
                          style="cursor: pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right_1">
                  <div class="title">
                    <img src="@/assets/images/icon.png" alt="" />溯源信息
                  </div>
                  <div class="input_box">
                    <div class="div1">姓名：</div>
                    <div class="div2">
                      <el-input
                        v-model="nameInput"
                        placeholder="--"
                        @blur="nameFn(scope.row)"
                      ></el-input>
                      <img src="@/assets/images/bianjibi.png" alt="" />
                    </div>
                    <div class="div1">电话：</div>
                    <div class="div2">
                      <el-input
                        v-model="phoneInput"
                        placeholder="电话"
                        @blur="phoneFn(scope.row)"
                      ></el-input>
                      <img src="@/assets/images/bianjibi.png" alt="" />
                    </div>
                    <div class="div1">邮箱：</div>
                    <div class="div2">
                      <el-input
                        v-model="emailInput"
                        placeholder="名称"
                        @blur="emailFn(scope.row)"
                      ></el-input>
                      <img src="@/assets/images/bianjibi.png" alt="" />
                    </div>
                    <div class="div1">微信：</div>
                    <div class="div2">
                      <el-input
                        v-model="wxInput"
                        placeholder="名称"
                        @blur="wechatFn(scope.row)"
                      ></el-input>
                      <img src="@/assets/images/bianjibi.png" alt="" />
                    </div>
                    <div class="div1">文件：</div>
                    <div class="div2 div3">{{ personData.filename }}</div>
                    <div class="div1">备注：</div>
                    <div class="div2">
                      <el-input
                        v-model="remarksInput"
                        placeholder="--"
                        @blur="remarksFn(scope.row)"
                      ></el-input>
                      <img src="@/assets/images/bianjibi.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="ip"
            label="攻击IP"
            align="left"
            :scoped-slot="labelHead"
            width="180"
          >
            <template slot-scope="scope">
              <i
                :class="
                  scope.row.marked == 0
                    ? 'el-icon-circle-check'
                    : 'el-icon-success'
                "
                @click.stop="signKillFromApiFn(scope.row)"
                style="margin-left: 20px"
              ></i>
              {{ scope.row.ip }}
            </template>
          </el-table-column>
          <el-table-column
            prop="country"
            label="威胁情报"
            align="center"
            :scoped-slot="labelHead"
          >
          </el-table-column>
          <el-table-column
            prop="custom"
            label="自定义情报"
            align="center"
            :scoped-slot="labelHead"
          >
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <div v-for="(i, index) in scope.row.custom" :key="index">
                  <div
                    :title="i"
                    style="
                      background-color: #f3f3f3;
                      color: #999;
                      border-color: #dadada;
                      margin: 0 2px;
                      padding: 5px 5px;
                      border-radius: 5px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      max-width: 100px;
                    "
                  >
                    {{ i }}
                  </div>
                </div>
              </div>
            </template>

            <!-- <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <div
                  v-for="(item, index) in tableData[inputIndex].custom"
                  :key="index"
                  style=""
                >
                  <div
                    style="
                      background-color: #f3f3f3;
                      color: #999;
                      border-color: #dadada;
                      margin: 0 2px;
                      padding: 5px 5px;
                      border-radius: 5px;
                    "
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="services"
            label="攻击目标"
            align="center"
            :scoped-slot="labelHead"
          >
          </el-table-column>
          <el-table-column
            prop="clients"
            label="攻击节点"
            align="center"
            :scoped-slot="labelHead"
          >
          </el-table-column>
          <el-table-column
            prop="asn.rank"
            label="危险等级"
            align="center"
            :scoped-slot="labelHead"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            :scoped-slot="labelHead"
            width="200"
          >
            <template slot-scope="scope">
              <div class="formAction">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="查看详情"
                  placement="bottom-start"
                >
                  <el-button
                    ><i
                      class="el-icon-arrow-down"
                      @click.stop="expandsHandle(scope.row)"
                      style="margin-right: 13px; transition: 0.5s"
                    >
                    </i
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    scope.row.white_ip == false ? '设置白名单' : '取消白名单'
                  "
                  placement="bottom-start"
                >
                  <el-button
                    ><i
                      :class="
                        scope.row.white_ip == false
                          ? 'el-icon-user'
                          : 'el-icon-user-solid'
                      "
                      @click.stop="
                        addWhiteListApiFn(scope.row);
                        cancelWhiteListApiFn(scope.row);
                        tanChuangFn;
                      "
                      style="margin-right: 13px"
                    >
                    </i
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="bottom-start"
                >
                  <el-button
                    ><i
                      class="el-icon-delete"
                      @click.stop="fnRemoveTemp(scope.row)"
                    >
                    </i
                  ></el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        style="
          display: flex;
          width: 100%;
          height: 81px;
          align-items: center;
          justify-content: right;
          box-sizing: border-box;
          padding-right: 16px;
          flex-direction: row-reverse;
        "
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="total"
          :background="pagBackground"
        >
        </el-pagination>
        <div class="total">
          共计
          <span>{{ total }}</span>
          条数据
        </div>
      </div>
    </div>
    <el-dialog
      title="设置白名单"
      :visible.sync="dialogFormVisible"
      @closed="elDialogFn"
    >
      <div class="password_box">
        <div class="box">
          <div class="box_left">请输入管理员密码验证权限：</div>
          <div class="box_right">
            <el-input
              placeholder="请输入密码"
              v-model="inputPassword"
              show-password
              auto-complete="new-password"
            ></el-input>
          </div>
        </div>
        <!-- <div class="msg">
          <img
            src="@/assets/images/jiedianguanli_jinggao.png"
            alt=""
            width="16px"
          />
          <div class="title">权限保留10分钟，其他操作不进行二次验证</div>
        </div> -->
      </div>
      <div class="bottom">
        <div
          class="cancel"
          @click="
            dialogFormVisible = false;
            loading = false;
          "
        >
          取消
        </div>
        <div class="confirm" @click="confirmFn">确定</div>
      </div>
    </el-dialog>
    <!-- ---------------------------------------------------------- -->
    <!-- 表格部分 -->
  </div>
</template>

<script>
import {
  mgScene,
  SourceOfAttack,
  shousuoTJ,
  customIntelligenceApi,
  addWhiteListApi,
  cancelWhiteListApi,
  deleteAttackSourceApi,
  modificationOfTraceabilityInformationApi,
  signKillFromApi,
} from "@/api/clags/drohen/attackip/index.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      pagBackground: true,
      arr: [
        { name: "攻击列表" },
        { name: "扫描感知" },
        { name: "攻击来源" },
        { name: "账号资产" },
        { name: "失陷感知" },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      searchStateIP: "",
      start_timeAtt: 0,
      end_timeAtt: 0,
      attformInline: {
        value1: [],
        value2: "",
        value3: "",
      },
      SelectValueKill: -1,
      optionsScene: [
        {
          value: -1,
          label: "全部",
          kk: 0,
        },
        {
          value: 0,
          label: "外部攻击",
          kk: 0,
        },
        {
          value: 1,
          label: "内部失陷",
          kk: 0,
        },
      ],
      signNumber: 0,
      ZDYbait: 0,
      flag1: 1,
      flag3: 1,
      tableData: [],
      total: 99,
      currentPage1: 1,
      loading: false,
      markedData: 0,
      baitData: 0,
      inputZDY: "",
      nameInput: "",
      phoneInput: "",
      emailInput: "",
      wxInput: "",
      remarksInput: "",

      // ----------------------------------------
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
        is_add: null,
      },
      state: [],
      arrZDY: [],
      inputIndex: 0,
      ipZDY: "",
      zdyDIVshow: false,
      flagZDY: 1,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      inputPassword: "",
      rowrow: {},
      rowEvent: {},
      timePassword: 0,
      timeBoolean: false,
      essentialInformation: {
        ip: "",
        region: "",
        asnInfo: "",
        asnRank: 0,
      },
      personData: {
        filename: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    elDialogFn() {
      if (this.loading == true) {
        this.loading = false;
      }
    },
    // 自定义情报方法
    customIntelligenceApiFn() {
      let data = {
        ip: this.ipZDY,
        custom: this.tableData[this.inputIndex].custom, //删除新增 只要控制字段中的内容就可以实现
      };
      customIntelligenceApi(data)
        .then((res) => {
          // console.log(res);
          this.shousuoTJFn();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加白名单方法
    tanChuangFn() {},
    addWhiteListApiFn(row) {
      // console.log(row);
      this.rowrow = row;
      this.rowEvent = event;

      let e = event;
      if (e.path[2].__vue__.content == "设置白名单") {
        this.loading = true;
        if (this.timeBoolean == true) {
          // console.log("10分钟生效");
          let data = {
            ip: row.ip,
          };
          // console.log(data);
          // console.log(e);
          // this.dialogFormVisible = true;
          if (e.path[2].__vue__._props.content == "设置白名单") {
            addWhiteListApi(data)
              .then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.SourceOfAttackFn();
                  this.$message({
                    message: "成功设置为白名单",
                    type: "success",
                  });
                  // e.path[0].className = "el-icon-user-solid";
                  // e.path[2].__vue__._props.content = "取消白名单";
                  // console.log(e.path[2].__vue__.content);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          if (this.dialogFormVisible == false) {
            this.dialogFormVisible = true;
          }
        }
      }

      // event.path[0].className = "el-icon-user-solid";
      // event.srcElement._prevClass = "el-icon-user-solid";
    },
    // 取消白名单
    cancelWhiteListApiFn(row) {
      let e = event;
      // console.log(e);
      if (e.path[2].__vue__._props.content == "取消白名单") {
        this.loading = true;
        if (this.timeBoolean == true) {
          let data = {
            ip: row.ip,
          };
          cancelWhiteListApi(data)
            .then((res) => {
              // console.log(res);
              if (res.code == 200) {
                this.SourceOfAttackFn();
                this.$message({
                  message: "已移出白名单",
                });
                // e.path[0].className = "el-icon-user";
                // e.path[2].__vue__._props.content = "添加白名单";
                // console.log(e.path[2].__vue__.content);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          if (this.dialogFormVisible == false) {
            this.dialogFormVisible = true;
          }
        }
      }
    },
    // 弹窗密码确认按钮
    confirmFn() {
      // console.log(this.inputPassword);
      if (this.timeBoolean == true) {
      } else {
        this.loading = true;
        if (this.inputPassword == "123456") {
          let data = {
            ip: this.rowrow.ip,
          };
          let e = this.rowEvent;
          // console.log(e);

          this.dialogFormVisible = true;
          if (e.path[2].__vue__._props.content == "设置白名单") {
            addWhiteListApi(data)
              .then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.SourceOfAttackFn();
                  this.$message({
                    message: "成功添加到白名单",
                    type: "success",
                  });
                  // this.rowrow.white_ip=true
                  // this.SourceOfAttackFn
                  // e.path[0].className = "el-icon-user-solid";
                  // e.path[2].__vue__._props.content = "取消白名单";
                  // console.log(e.path[2].__vue__.content);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (e.path[2].__vue__._props.content == "取消白名单") {
            cancelWhiteListApi(data)
              .then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.SourceOfAttackFn();
                  this.$message({
                    message: "已移出白名单",
                  });
                  // e.path[0].className = "el-icon-user";
                  // e.path[2].__vue__._props.content = "添加白名单";
                  // console.log(e.path[2].__vue__.content);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }

          // 10分钟
          this.timePassword = Math.floor(new Date().getTime() / 1000) + 60;
          // this.timePassword = Math.floor(new Date().getTime() / 1000) + 600;
          // console.log(this.timePassword);
          var time2 = setInterval(() => {
            // console.log(Math.floor(new Date().getTime() / 1000));
            if (this.timePassword < Math.floor(new Date().getTime() / 1000)) {
              // console.log("时间到了");
              clearTimeout(time2);
              this.timeBoolean = false;
            }
          }, 200);
          this.timeBoolean = true;

          this.dialogFormVisible = false;
          this.inputPassword = "";
        } else if (this.inputPassword == "") {
          this.$message({
            message: "密码不可为空",
            type: "warning",
          });
        } else {
          this.$message.error("密码错误，请重新输入");
          this.inputPassword = "";
        }
      }
    },
    // 溯源名字方法
    nameFn(row) {
      // console.log(row);
      // console.log(this.nameInput);
      let data = {
        username: this.nameInput,
        phone: row.person.phone, //电话
        email: row.person.email, //电子邮箱，比如 example@qq.com
        wechat: row.person.wechat, //微信
        account: row.person.account, //账户
        filename: row.person.filename, //文件
        remarks: row.person.remarks, //备注 //用户名
        ip: row.ip, // ip 做ID用
      };

      if (row.person.username != this.nameInput) {
        modificationOfTraceabilityInformationApi(data).then(() => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
        this.SourceOfAttackFn();
      }
    },

    // 电话方法
    phoneFn(row) {
      let data = {
        username: row.person.username,
        email: row.person.email, //电子邮箱，比如 example@qq.com
        wechat: row.person.wechat, //微信
        account: row.person.account, //账户
        filename: row.person.filename, //文件
        remarks: row.person.remarks, //备注 //用户名
        phone: this.phoneInput, //电话
        ip: row.ip, // ip 做ID用
      };

      if (row.person.phone != this.phoneInput) {
        modificationOfTraceabilityInformationApi(data).then(() => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
        this.SourceOfAttackFn();
      }
    },
    // 邮箱方法
    emailFn(row) {
      let data = {
        username: row.person.username,
        wechat: row.person.wechat, //微信
        account: row.person.account, //账户
        filename: row.person.filename, //文件
        remarks: row.person.remarks, //备注 //用户名
        phone: row.person.phone, //电话
        email: this.emailInput, //电话
        ip: row.ip, // ip 做ID用
      };

      if (row.person.email != this.emailInput) {
        modificationOfTraceabilityInformationApi(data).then(() => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
        this.SourceOfAttackFn();
      }
    },
    // 微信方法
    wechatFn(row) {
      let data = {
        username: row.person.username,
        email: row.person.email, //电子邮箱，比如 example@qq.com
        account: row.person.account, //账户
        filename: row.person.filename, //文件
        remarks: row.person.remarks, //备注 //用户名
        phone: row.person.phone, //电话
        wechat: this.wxInput, //电话
        ip: row.ip, // ip 做ID用
      };

      if (row.person.wechat != this.wxInput) {
        modificationOfTraceabilityInformationApi(data).then(() => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
        this.SourceOfAttackFn();
      }
    },
    // 备注方法
    remarksFn(row) {
      let data = {
        username: row.person.username,
        email: row.person.email, //电子邮箱，比如 example@qq.com
        wechat: row.person.wechat, //微信
        account: row.person.account, //账户
        filename: row.person.filename, //文件
        phone: row.person.phone, //电话
        remarks: this.remarksInput, //电话
        ip: row.ip, // ip 做ID用
      };

      if (row.person.remarks != this.remarksInput) {
        modificationOfTraceabilityInformationApi(data).then(() => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
        this.SourceOfAttackFn();
      }
    },
    // ------------------------------------------
    // 删除方法
    delClassFn(index) {
      // console.log(999);
      // console.log(index);
      this.tableData[this.inputIndex].custom.splice(index, 1);
      this.customIntelligenceApiFn();
      this.$message("标签已删除");
    },
    // 自定义标签方法
    showshowFn() {
      // console.log(this.inputZDY);
      if (this.flagZDY == 1) {
        this.zdyDIVshow = true;
        this.flagZDY = 2;
        // console.log(111111111111);
      } else {
        this.zdyDIVshow = false;
        this.flagZDY = 1;
        // console.log(2222222222);
      }
    },
    zdyDivFn(row) {
      // console.log(row);
      // console.log(e);
      // console.log(11);

      if (this.tableData[this.inputIndex].custom.length == 5) {
        this.inputZDY = "";
        this.flagZDY = 1;
        this.zdyDIVshow = false;
        this.$message.error("最多保存5个标签哦！");
      } else {
        if (row.custom.includes(this.inputZDY)) {
          // console.log("________________");
          this.inputZDY = "";
          this.flagZDY = 1;
          this.zdyDIVshow = false;
          this.$message({
            message: "标签重复添加",
            type: "warning",
          });
        } else {
          if (this.inputZDY == "") {
            // console.log(999999999999999999999999999999999999);
            // console.log(this.tableData[this.inputIndex].custom);
            this.zdyDIVshow = false;
          } else {
            this.arrZDY.push(this.inputZDY);
            // console.log(this.arrZDY);
            let item = this.arrZDY.toString();
            this.arrZDY = [];
            this.tableData[this.inputIndex].custom.push(item);
            // this.tableData[this.inputIndex].custom += this.arrZDY;
            // console.log(this.tableData[this.inputIndex].custom);
            this.customIntelligenceApiFn();

            this.inputZDY = "";
            this.flagZDY = 1;
            this.zdyDIVshow = false;

            this.$message({
              message: "标签保存成功",
              type: "success",
            });
          }
        }
      }
    },
    activeClassFn1() {
      if (this.flag1 == 1) {
        this.flag1 = 2;
        this.markedData = 2;
        this.SourceOfAttackFn();
      } else {
        this.flag1 = 1;
        this.markedData = 0;
        this.SourceOfAttackFn();
      }
    },
    activeClassFn3() {
      if (this.flag3 == 1) {
        this.flag3 = 2;
        this.baitData = 1;
        this.SourceOfAttackFn();
      } else {
        this.flag3 = 1;
        this.baitData = 2;
        this.SourceOfAttackFn();
      }
    },
    //   模糊搜索方法
    attack_scanFn(e) {
      // console.log(e);
      this.start_timeAtt = 0;
      this.end_timeAtt = 0;
      this.searchStateIP = e;
      this.currentPage1 = 1;

      this.SourceOfAttackFn();
    },
    // 时间选择器方法
    dateUsernameFn(e) {
      //   console.log(e);
      this.start_timeAtt = Math.floor(e[0] / 1000);
      this.end_timeAtt = Math.floor(e[1] / 1000);

      //   this.currentPage = 1;

      // console.log(e);
      // console.log(this.start_timeAtt);
      // console.log(this.end_timeAtt);
      //   this.getDataList();
      this.SourceOfAttackFn();
    },
    // 蜜罐场景方法
    mgTotalFn(e) {
      // console.log(e);
      this.SelectValueKill = e;
      this.SourceOfAttackFn();
    },
    // 重置方法
    resetFn() {
      this.markedData = 0;
      this.baitData = 0;
      this.searchStateIP = "";
      this.SelectValueKill = -1;
      this.formInline = {
        value1: [],
        value2: "",
        value3: "",
      };
      this.end_timeAtt = Math.floor(new Date().getTime() / 1000);
      this.start_timeAtt = this.end_timeAtt - 3600 * 24 * 7;

      this.formInline.value2 = this.getNowTime()[0];
      this.formInline.value3 = this.getNowTime()[1];
      this.currentPage1 = 1;
      this.SourceOfAttackFn();
    },
    // 分页方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.SourceOfAttackFn();
    },
    // 刷新方法
    refreshFn() {
      this.SourceOfAttackFn();
    },
    // 标记方法
    signKillFromApiFn(row) {
      this.loading = true;
      if (row.marked == 0) {
        let data = {
          marked: 1, //0:不标记  1：标记
          ip: row.ip,
        };
        signKillFromApi(data)
          .then((res) => {
            // console.log(res, 99999999);
            if (res.code == 200) {
              this.SourceOfAttackFn();
              this.mgSceneData();
              this.$message({
                message: "IP标记成功",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let data = {
          marked: 0, //0:不标记  1：标记
          ip: row.ip,
        };
        signKillFromApi(data)
          .then((res) => {
            this.SourceOfAttackFn();
            this.mgSceneData();
            // console.log(res, 99999999);
            if (res.code == 200) {
              this.$message("IP已取消标记");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // axios请求数据
    mgSceneData() {
      mgScene()
        .then((res) => {
          // console.log(res, 99999999);
          this.signNumber = res.data.marked;
          this.optionsScene[0].kk = res.data.total;
          this.optionsScene[1].kk = res.data.external;
          this.optionsScene[2].kk = res.data.internal;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shousuoTJFn() {
      shousuoTJ()
        .then((res) => {
          // console.log(res, 888);
          this.ZDYbait = res.data.custom;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SourceOfAttackFn() {
      let data = {
        intranet: this.SelectValueKill, //是否内部网络
        page_no: this.currentPage1, //页数
        page_size: 5, //当前页条数
        search: this.searchStateIP, //搜索
        sort: "attack_count", //分类
        order: "", //排序
        marked: this.markedData, //标记
        person: 0, //溯源
        custom: this.baitData, //自定义
        services: [], //服务类型
        start_time: this.start_timeAtt, //开始时间
        end_time: this.end_timeAtt, //结束时间
      };
      this.loading = true;
      SourceOfAttack(data)
        .then((res) => {
          res.data.list.forEach((item, index) => {
            item.name_id = index;
          });
          // console.log(res, 99999999);
          // console.log(res.data.list);
          this.total = res.data.total_num;
          this.tableData = res.data.list;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    // 溯源信息修改方法
    modificationOfTraceabilityInformationApiFn() {
      modificationOfTraceabilityInformationApi(data)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //初始默认执行(重点)
    getNowTime() {
      const start = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
        .toISOString()
        .replace("T", " ")
        .split(".")[0]; //默认开始时间7天前
      const end = new Date(new Date().getTime())
        .toISOString()
        .replace("T", " ")
        .split(".")[0]; //默认结束时间1天前
      // console.log([start, end]);
      return [start, end];
    },
    // ----------------------------------------------------------
    test() {
      this.$refs.text.contentEditable = true;
      let data = {
        mould_id: this.form.mould_id,
        create_time: this.form.create_time,
        describe: this.form.describe,
        mould_name: this.mould_name,
        update_time: this.update_time,
        services: this.serviceState,
      };
      updateTemplate(data).then((res) => {
        // console.log(res);
      });
    },
    // 时间戳转换
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 遍历穿梭框数据
    getData() {
      this.keyarr = [];
      this.checkList = this.$refs.tree.getCheckedNodes();
      // console.log(this.checkList);
      if (this.checkList.length != 0) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (!this.checkList[i].children) {
            this.keyarr.push(this.checkList[i]);
          }
        }
      } else {
        this.keyarr = [];
      }
    },
    // 监听选中节点
    setCheckedNodes(arr) {
      this.$refs.tree.setCheckedNodes(arr);
    },
    // 移出节点
    removeData(data) {
      let checklist = this.keyarr;
      // console.log(this.keyarr);
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
        mould_id: this.form.mould_id,
      };
      this.open = true;
      getMouldServices(data).then((res) => {
        // console.log(res.data);
        this.fileArr = res.data.treeList;
        this.idArr = res.data.cocher;
        this.keyarr = res.data.cocherList;
      });
    },
    // 外层表格数据
    getTableData() {
      var data = {
        page_no: 1, //页数
        page_size: 10, //条数
        search: "", //搜索模版名称关键字
        sort: "", //排序规则
        order: "", //排序字段
        service_ports: this.queryParams.service_ports, //监听端口
        service_types: this.queryParams.service_name, //服务名称
      };
      this.loading = true;
      // getMouldsList(data).then((res) => {
      //   this.tableData = res.data.data;
      //   this.loading = false;
      // });
    },
    // 下选框数据
    getSelectData() {
      // getMonitorList().then((res) => {
      //   this.selectData = res.data;
      // });
    },
    /** 提交按钮 */
    submitForm() {
      // let data = {
      //   "is_add": this.form.is_add,
      // }
      getServeList().then((res) => {
        // console.log(res);
      });
    },

    // 取消按钮
    cancel() {
      this.open1 = false;
      // this.reset();
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
      // console.log(row);
      this.$refs.expandstable.toggleRowExpansion(row);
    },

    //数据转化 -->节点详情中的是否是https 回显单选按钮
    isHttps(row, column) {
      const https = row.https;
      if (https == "flase") {
        return 1;
      } else if (https == "true") {
        return 2;
      }
    },

    /***点击每一行的时候 只展开当前点击的行 */
    // rowClick(e) {
    //   console.log(e);
    // },
    rowClick(row, event, column) {
      // console.log(row);
      this.essentialInformation.ip = row.ip;
      this.essentialInformation.region = row.region;
      this.essentialInformation.asnInfo = row.asn.info;
      this.essentialInformation.asnRank = row.asn.rank;
      this.personData.filename = row.person.filename;
      // console.log(event);
      // console.log(column);
      // this.inputZDY = row.person.email;
      Array.prototype.remove = function (val) {
        let index = this.indexOf(val);

        if (index > -1) {
          this.splice(index, 1);
        }
      };
      // console.log(this.expands.indexOf(row.name_id) < 0);
      if (this.expands.indexOf(row.name_id) < 0) {
        this.expands = [];
        this.expands.push(row.name_id);

        // console.log(row);
        // console.log(this.tableData);
        let index = row.name_id;

        this.inputIndex = row.name_id;
        this.ipZDY = row.ip;
        // console.log(index);
        // this.inputZDY = this.tableData[index].custom;
        // console.log(this.inputZDY);
        // this.inputZDY

        this.nameInput = this.tableData[index].person.username;
        // console.log(this.nameInput);
        this.phoneInput = this.tableData[index].person.phone;
        this.emailInput = this.tableData[index].person.email;
        this.wxInput = this.tableData[index].person.wechat;
        this.remarksInput = this.tableData[index].person.remarks;

        // getDetailedList(data).then((res) => {
        //   this.temObj = res.data;
        //   this.serviceState = res.data.services;
        //   this.form.mould_id = res.data.mould_id;
        //   this.form.describe = res.data.describe;
        //   this.create_time = res.data.create_time;
        //   this.update_time = res.data.update_time;
        // });
      } else {
        this.expands.remove(row.name_id);
      }
    },

    //    cancelWhiteListApiFn(row) {
    //   let data = {
    //     ip: row.ip,
    //   };
    //   let e = event;
    //   if (e.path[2].__vue__.content == "取消白名单") {
    //     cancelWhiteListApi(data)
    //       .then((res) => {
    //         console.log(res);
    //         if (res.code == 200) {
    //           this.$message({
    //             showClose: true,
    //             message: "已经取消按钮白名单",
    //           });
    //           e.path[0].className = "el-icon-user";
    //           e.path[2].__vue__.content = "添加白名单";
    //           console.log(e.path[2].__vue__.content);
    //         }
    //       })
    //       .catch((err) => {
    //         console.log("---------------------");
    //         console.log(err);
    //       });
    //   }
    // },
    /**删除父节点节点 */
    fnRemoveTemp(row) {
      let data = {
        ip: row.ip,
      };
      this.$modal
        .confirm("是否确认删除")
        .then(function () {
          return deleteAttackSourceApi(data);
        })
        .then(() => {
          this.SourceOfAttackFn();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    // 删除子节点
    deleteRow(index, rows) {
      let data = {
        mould_id: this.form.mould_id,
        services: this.serviceState,
      };
      getServeList(data).then((res) => {
        this.state = res.services;
      });
      // this.getDetailedList();
      // this.getMouldServices();
    },
    /** 处理表格的表头部分，一行显示*/
    labelHead: function (h, { column, $index }) {
      let l = column.label.length;
      let f = 16;
      column.minWidth = f * (l + 2); //加上一个文字长度
      return h(
        "div",
        {
          class: "table-head",
          style: {
            width: "100%",
          },
        },
        [column.label]
      );
    },
    /** 设置表格表头的公共样式*/
    handlemyclass: function (row, column, rowIndex, columnIndex) {
      return "tableStyle";
    },
    /**给每一行添加样式，隐藏展开的箭头图标 */
    getRowClass(row, rowIndex) {
      let data = row.row;
      let res = [];
      if (data.list && data.list.length > 0) {
        res.push("row-expand-has");
        return res;
      } else {
        res.push("row-expand-unhas");
        return res;
      }
    },
    hadnleItemClick() {},
    handle111(scope) {
      // console.log(scope);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.attformInline.value2 = this.getNowTime()[0];
    this.attformInline.value3 = this.getNowTime()[1];

    this.getTableData();
    this.getSelectData();
  },
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.end_timeAtt = Math.floor(new Date().getTime() / 1000);
    this.start_timeAtt = this.end_timeAtt - 3600 * 24 * 7;

    this.mgSceneData();
    this.shousuoTJFn();
    this.SourceOfAttackFn();
  },
};
</script>
<style lang="scss" scoped>
.page-attackip {
  ::v-deep .cell:empty::before {
    content: "" !important;
    color: gray;
  }
  // 去掉table表格最外层的边框
  ::v-deep .el-table,
  .el-table--fit,
  .el-table--enable-row-hover,
  .el-table--enable-row-transition,
  .el-table--medium {
    border-left: 1px solid rgb(223, 230, 236) !important;
    border-top: 1px solid rgb(223, 230, 236) !important;
    border-right: 1px solid rgb(223, 230, 236) !important;
    border-bottom: 0px !important;
  }
  ::v-deep .el-table__cell,
  .el-table__expanded-cell {
    padding: 10px 0px 0px;
  }
  background-color: #f9f9f9;
  margin: 0px;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  padding: 0px !important;

  .page-main {
    .total {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
      line-height: 17px;
      // position: absolute;
      // left: 60%;
      // bottom: 30px;
      span {
        color: #016cff;
      }
    }
    ::v-deep .has-gutter {
      tr {
        th {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 22px;
          height: 60px;
          text-align: left;
          box-sizing: border-box;
          padding: 0 30px;
        }
      }
    }
    ::v-deep .el-table__row {
      td {
        height: 60px !important;
      }
    }

    ::v-deep .el-table th.el-table__cell > .cell {
      text-align: center;
    }
    .formAction {
      // ::v-deep .el-button--medium {
      //   // padding: 0 !important;
      //   border-color: red;
      // }
      ::v-deep .el-button {
        border: 0px !important;
        border-color: red;
        padding: 0 !important;
        background-color: transparent;
      }
      // button {
      //   border-color: red;
      // }
    }
    .showWrap {
      width: 100%;
      ::v-deep .el-table__cell,
      .el-table__expanded-cell {
        background-color: red;
      }
      ::v-deep
        .el-table--enable-row-transition
        .el-table__body
        td.el-table__cell {
        background-color: red;
      }
      .zdyDIV {
        width: 160px;
        height: 36px;
        background-color: #016cff;
        position: absolute;
        top: 34px;
        left: 0;
      }
      display: flex;
      margin-top: -10px !important;
      background: #fafafafa;
      // padding-top: 15px;
      height: 268px;
      box-sizing: border-box;
      padding: 10px 36px;

      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      justify-content: space-between;
      flex-wrap: nowrap;

      ::v-deep .el-button,
      .el-tooltip,
      .item,
      .el-button--default,
      .el-button--medium {
        border: 1px solid #fff !important;
      }
      .xuanzhuan180 {
        transform: rotate(180deg);
      }

      .title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: start;
        margin: 0px 0px 20px 0px !important;
        img {
          margin-right: 10px;
        }
      }
      .div3 {
        padding-left: 10px;
      }
      .left_1 {
        // flex: 1;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: space-around;
        width: 49%;
        max-width: 50%;
        .left_top {
          flex: 1;
          // background-color: aqua;
          margin-bottom: 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .input_box {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: start;
            text-align: left;
            min-width: 637px;
            max-width: 640px;
            .div1 {
              width: 110px;
              height: 36px;
              background: #f5f5f5;
              border: 1px solid #eeeeee;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: start;
              padding-left: 10px;
            }
            .div2 {
              max-width: 240px;
              width: 200px;
              height: 36px;
              background: #ffffff;
              border: 1px solid #eeeeee;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: start;
              padding-left: 10px;
              position: relative;
              img {
                position: absolute;
                right: 0;
                top: 0;
              }
            }
          }
        }
        .left_bottom {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .input_box {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: left;
            min-width: 637px;
            max-width: 640px;
            .div1 {
              width: 110px;
              height: 36px;
              background: #f5f5f5;
              border: 1px solid #eeeeee;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: start;
              padding-left: 10px;
            }
            .div2 {
              max-width: 240px;
              width: 200px;
              height: 36px;
              background: #ffffff;
              border: 1px solid #eeeeee;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: start;
              position: relative;
              > img {
                float: right;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
              }
              ::v-deep .el-input .el-input__inner {
                flex: 1;
                border-radius: 0;
                border: 1px solid #eeeeee;
              }
              ::v-deep .el-input__inner:focus {
                outline: none;
                border-color: #1890ff;
              }
            }
          }
        }
      }
      .right_1 {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: start;
        // flex: 1;
        max-width: 50%;
        width: 49%;
        .input_box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          // flex-direction: ;
          justify-content: start;
          min-width: 637px;
          max-width: 640px;
          .div1 {
            width: 110px;
            height: 36px;
            background: #f5f5f5;
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: start;
            padding-left: 10px;
          }
          .div2 {
            max-width: 240px;
            width: 200px;
            height: 36px;
            background: #ffffff;
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: start;
            position: relative;

            > img {
              float: right;
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
            }
            ::v-deep .el-input .el-input__inner {
              flex: 1;
              border-radius: 0;
              border: 1px solid #eeeeee;
            }
            ::v-deep .el-input__inner:focus {
              outline: none;
              border-color: #1890ff;
            }
          }
        }
      }

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

              // background: darkgreen;
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

    // ------------------------------------------------------------------
    // max-width: 1680px;
    // width: 1420px;
    width: calc(100% - 100px);
    height: auto;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    .list-header {
      width: 100%;
      height: 60px;
      background-color: #ffffff;
      display: flex;
      justify-content: right;
      align-items: center;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .refresh {
        // margin-left: 90px;
        width: 69px;
        height: 32px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #016cff;
        line-height: 20px;
        border: 1px solid #016cff;
        background-color: #fff;
        cursor: pointer;
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          font-size: 16px;
          // background-color: #333;
          margin-right: 6px;
          line-height: 16px;
          text-align: center;
        }
      }
      .export {
        margin-left: 20px;
        margin-right: 60px;
        border: 1px solid #016cff;
        width: 69px;
        height: 32px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        background-color: #016cff;
        cursor: pointer;
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          img {
            width: 100%;
          }
        }
      }
    }
    .list-main {
      .scanIPIP {
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        white-space: nowrap;
        img {
          width: 100%;
          float: left;
        }
      }
      .scanIPIP2 {
        display: flex !important;
      }

      // --------------------------------------
      ::v-deep
        .el-table--enable-row-hover
        .el-table__body
        tr:hover
        > .el-table_1_column_1 {
        color: #eb7d41 !important;
        &:hover .scanIPIP {
          //   background-color: #eb7d41 !important;
        }
      }

      max-width: 1680px;
      width: 1420px;
      -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      border-radius: 4px;
      height: auto;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      position: relative;
      ::v-deep tbody {
        box-sizing: border-box;
        padding: 0 15px;
        tr {
          box-sizing: border-box;
          padding: 0 15px;
          td {
            box-sizing: border-box;
            padding: 0 15px;
            > div {
              box-sizing: border-box;
              padding-left: 26px;
              text-align: left;
            }
          }
        }
      }
      ::v-deep .el-table_1_column_1,
      .is-leaf el-table__cell {
        padding-left: 20px;
        box-sizing: border-box;
        width: 142px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 20px;
      }
      ::v-deep .el-table_1_column_2,
      .el-table__cell {
        width: 38px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      ::v-deep .el-table_1_column_3,
      .el-table__cell {
        width: 39px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      ::v-deep .el-table_1_column_4,
      .el-table__cell {
        width: 96px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      ::v-deep .el-table_1_column_5,
      .el-table__cell {
        width: 62px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      ::v-deep .el-table_1_column_6,
      .el-table__cell {
        width: 39px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      ::v-deep .has-gutter {
        tr {
          th {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 22px;
            height: 60px;
            text-align: left;
            box-sizing: border-box;
            padding: 0 30px;
          }
        }
      }
      ::v-deep .el-table__row {
        td {
          height: 60px !important;
        }
      }
      ::v-deep .el-pagination {
        text-align: right;
        padding: 0;
        margin-top: 20px;
        margin-right: 60px;
        margin-bottom: 16px;
      }

      ::v-deep.el-pagination > button {
        padding: 0 !important;
        height: 34px !important;
      }

      ::v-deep .el-pagination span {
        color: #646566;
        width: 50px;
        height: 34px !important;
        line-height: 34px !important;
        box-sizing: border-box;
      }

      ::v-deep .el-pagination .el-pager .number,
      .el-icon.more.el-icon-more {
        color: #646566 !important;
        border: 1px solid #eaeaea;
        height: 34px !important;
        line-height: 34px !important;
        box-sizing: border-box;
      }
      ::v-deep .el-icon.more.btn-quicknext.el-icon-more {
        border-right: none;
      }
      ::v-deep .el-icon.more.btn-quickprev.el-icon-more {
        border-left: none;
      }
      // ::v-deep .el-pagination .el-pager .number:not(:first-child) {
      //   border-right: none !important;
      // }
      ::v-deep .el-pagination .el-pager .number.active {
        background: #016cff;
        border: 1px solid #016cff;
        color: #ffffff !important;
      }
      //   分页器距离
      ::v-deep .el-pager {
        li {
          margin: 0 5px;
        }
      }
    }
  }
  .page-input {
    ::v-deep .el-range-separator {
      padding-right: 10px;
      line-height: 32px;
    }
    ::v-deep .el-input--medium .el-input__icon {
      line-height: 40px;
    }
    ::v-deep .el-range-editor--medium .el-range__icon,
    .el-range-editor--medium .el-range__close-icon {
      line-height: 32px;
    }
    ::v-deep .el-date-editor .el-range-input {
      width: 34%;
    }
    ::v-deep .el-input__inner,
    ::v-deep .el-date-editor .el-range-input {
      color: #777;
      &::placeholder {
        color: #777;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: #777;
      }

      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        color: #777;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color: #777;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        color: #777;
      }
    }
    ::v-deep .el-select,
    .el-select--medium {
      box-sizing: border-box;
      // padding-left: 2px;
      .el-select__tags {
        flex-wrap: nowrap;
        overflow: hidden;
        margin-left: 5px;
        span {
          z-index: -1 !important;
        }
      }
    }
    .biaojiIP,
    .shixianSHUJU,
    .qiyexinxi {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      -webkit-touch-callout: none; /*系统默认菜单被禁用*/
      -webkit-user-select: none; /*webkit浏览器*/
      -khtml-user-select: none; /*早期浏览器*/
      -moz-user-select: none; /*火狐*/
      -ms-user-select: none; /*IE10*/
      user-select: none;
    }
    .biaojiIP {
      width: 107px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      margin-right: 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
    }
    .shixianSHUJU {
      width: 125px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      margin-right: 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
    }
    .qiyexinxi {
      width: 141px;
      height: 40px;

      border-radius: 4px;

      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .activeClass {
      background: rgba(158, 201, 255, 0.2) !important;
      border: 1px solid #016cff !important;
      color: #016cff !important;
    }
    // max-width: 1680px;
    // width: 1420px;
    width: calc(100% - 100px);
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    height: 100px;
    background: #fff;
    margin: 25px auto 20px;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    // position: relative;
    height: 100px;
    display: flex;
    align-items: center;
    // tab切换搜索
    .shixianNumber {
      width: 141px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgba(158, 201, 255, 0.2);
      border-radius: 2px;
      border: 1px solid #016cff;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #016cff;
    }
    // stop
    .reset {
      width: 60px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #016cff;
      display: inline-block;
      //   margin-left: 20px;
      cursor: pointer;
    }
    .el-col,
    .el-col-12 {
      width: 100%;
      height: 40px;
      margin-right: 30px;
      > div {
        height: 40px !important;
        ::v-deep .el-input--medium .el-input__inner {
          height: 40px !important;
          line-height: 40px !important;
        }
      }
    }
    .el-range__icon {
      display: none;
    }
    ::v-deep .el-input--medium .el-input__inner {
      width: 240px;
      height: 40px;
    }
    .el-select {
      margin-right: 30px;
    }
    .el-range-editor--medium.el-input__inner {
      width: 240px;
      height: 40px;
      margin-right: 30px;
    }
    .el-input,
    .el-input--medium {
      width: 240px;
      margin-right: 30px;
    }
  }
}
</style>

<style lang="scss">
.page-attackip {
  // 密码确认弹窗
  .el-dialog {
    position: relative;
    width: 554px;
    height: 309px;
    background: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 0 !important;
    .el-dialog,
    .el-dialog__body {
      overflow: hidden;
      padding: 0;
    }
    .password_box {
      width: calc(100% - 60px);
      margin: 30px auto 0px;
      .box {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: start;
        align-items: center;
        .box_left {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .box_right {
          flex: 1;
          .el-input {
            width: 100%;
            .el-input__inner {
              width: 100%;
            }
          }
        }
      }
      .msg {
        margin-top: 15px;
        width: 396px;
        height: 40px;
        background: #ffffff;
        box-shadow: 2px 6px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        display: flex;
        justify-content: start;
        align-items: center;
        box-sizing: border-box;
        border-left: 4px solid #fab427;
        > img {
          margin-left: 15px;
          margin-right: 10px;
        }
        .title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin: 0px !important;
        }
      }
    }
    .bottom {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      height: 76px;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: right;
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0px 0px 5px 5px;
      .cancel {
        width: 62px;
        height: 36px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid #dddddd;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .confirm {
        width: 62px;
        height: 36px;
        background: #016cff;
        border-radius: 2px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
.el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}

.page-attackip {
  .dialog-footer {
    width: 554px;
    height: 76px;
    background: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 5px 5px;
  }
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
