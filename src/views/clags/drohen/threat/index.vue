<template>
  <div class="app-container home" ref="homeHome">
    <header-navigation :submenuArr="arr"></header-navigation>
    <!-- 搜索开始 -->
    <el-card>
      <div class="page-input">
        <div>
          <el-col :span="12">
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="请输入IP内容"
              :trigger-on-focus="false"
              @select="handleSelect"
              prefix-icon="el-icon-search"
              clearable
              @change="searchFn"
            ></el-autocomplete>
          </el-col>
        </div>
        <!-- 时间选择框 -->
        <div>
          <el-date-picker
            v-model="formInline.value1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            :start-placeholder="formInline.value2"
            :end-placeholder="formInline.value3"
            clear-icon
            @change="dateFn"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <!-- 下拉选择框 -->
        <div>
          <el-select
            v-model="SelectValue1"
            placeholder="蜜罐场景"
            @change="mgTotalFn"
          >
            <el-option
              v-for="item in options1"
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
        <div>
          <el-select
            v-model="SelectValue2"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="蜜罐类型"
            @change="mgTypeFn"
          >
            <el-option
              v-for="item in options2"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            v-model="SelectValue3"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="被攻击节点"
            @change="killFn"
          >
            <el-option
              v-for="item in options3"
              :key="item.client_id"
              :label="item.client_name"
              :value="item.client_id"
            >
            </el-option>
          </el-select>
        </div>
        <!-- <div class="data-length"> -->
        <!-- <div class="data-length-select" v-show="inputNumberShow"> -->
        <!-- <div class="data-length-select" style="width: 120px">
            <el-select v-model="SelectValue4" placeholder="请选择" @visible-change="inputNumberShowFn" @change="inputNumberShowFn2">
              <el-option v-for="item in options4" :key="item.SelectValue4" :label="item.label" :value="item.SelectValue4"> </el-option>
            </el-select>
          </div>
          <el-input v-model="inputNumber" placeholder="数据长度(范围)" @focus="inputNumberFocus" @change="inputNumberBlur" @input="inputNumberInput"></el-input>
        </div> -->

        <!-- 重新写的 -->
        <div class="SELECT">
          <el-input
            placeholder="数据长度(范围)"
            @focus="inputNumberFocus"
            @change="inputNumberBlur"
            @input="inputNumberInput"
            v-model="inputNumber"
            clearable
          >
            <el-select
              v-model="SelectValue4"
              placeholder=""
              slot="prepend"
              @visible-change="inputNumberShowFn"
              @change="inputNumberShowFn2"
            >
              <el-option
                v-for="item in options4"
                :key="item.SelectValue4"
                :label="item.label"
                :value="item.SelectValue4"
              >
              </el-option>
            </el-select>
          </el-input>
        </div>

        <div class="bbb">
          <el-input
            v-model="input221"
            placeholder="攻击来源位置"
            @change="killSourceFn"
            clearable
          ></el-input>
        </div>
        <div class="bbb">
          <el-input
            v-model="input222"
            placeholder="威胁情报标签"
            @change="weixieBiaoQian"
            clearable
          ></el-input>
        </div>
        <div class="bbb">
          <el-select
            v-model="SelectValue5"
            class="top20"
            placeholder="高交互蜜罐状态"
            @change="topState"
          >
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div
          class="sign bbb"
          :class="flagBiaoJi == 2 ? 'ccc' : ''"
          @click="flagBiaoJiFn"
        >
          已标记({{ signNumber }}起)
        </div>
        <!-- <div class="reset bbb" @click="resetFn">重置</div> -->
        <el-button @click="resetFn" icon="el-icon-refresh">重置</el-button>
      </div>
    </el-card>
    <!-- 搜索结束 -->
    <el-card>
      <div class="luyou-list" style="" v-loading="loading">
        <!-- 列表头部 -->
        <div class="list-header">
          <!-- <div class="order">显示顺序：</div>
        <div class="order-sle">
          <div class="order-one">
            攻击时间
            <div><i class="top"></i><i class="bottom"></i></div>
          </div>
          <div class="order-two">
            攻击时间
            <div><i class="top top2"></i><i class="bottom bottom2"></i></div>
          </div>
        </div> -->
          <el-row class="el-row">
            <el-col></el-col>
            <el-col class="el-col">
              <el-button
                class="refresh"
                type="primary"
                size="mini"
                icon="el-icon-refresh-right"
                @click="refreshFn"
                >刷新</el-button
              >

              <el-button
                class="export"
                type="primary"
                size="mini"
                icon="el-icon-download"
                >导出</el-button
              >
            </el-col>
          </el-row>
        </div>
        <!-- 列表导航 -->
        <div
          class="list-box"
          v-for="(item, index) in tabDataLists.data.list_infos"
          :key="index"
          ref="main"
        >
          <div class="list-page" @click="zkFn, openLY(index)">
            <div class="list-page-1">
              <div class="list-page-1-img">
                <img :src="openImg" ref="open2" alt="" />
              </div>
              {{ item.service_name }}
              <div class="line"></div>
            </div>
            <div class="list-page-div">
              <div class="top">被攻击数量</div>
              <div class="bottom">{{ item.attack_count }}</div>
              <div class="line"></div>
            </div>
            <div class="list-page-div">
              <div class="top">被扫描节点</div>
              <div class="bottom">{{ item.client_name }}</div>
              <div class="line"></div>
            </div>
            <div class="list-page-div">
              <div class="top">攻击来源</div>
              <div class="bottom">
                <i
                  :class="
                    item.marked == 0
                      ? 'el-icon-circle-check'
                      : 'el-icon-success'
                  "
                  @click.stop="signKillFromApiFn(index)"
                ></i>
                <span>{{ item.attack_ip }}</span>
              </div>
              <div class="line"></div>
            </div>
            <div class="list-page-div">
              <div class="top">威胁情报</div>
              <div class="bottom">--</div>
              <div class="line"></div>
            </div>
            <div class="list-page-time">
              <div class="top">最近被攻击时间</div>
              <div class="bottom">
                {{ item.last_attack_time | dateFormat("YYYY-MM-DD HH:mm:ss") }}
              </div>
              <div class="line"></div>
            </div>
            <div class="list-page-div">
              <div class="top">操作</div>
              <div class="bottom">
                <!-- <img src="@/assets/images/small@.png" alt="" /> -->
                <img
                  src="@/assets/images/download@.png"
                  alt=""
                  style="margin-left: 12px"
                />
              </div>
            </div>
          </div>
          <!-- 列表主体 -->
          <div class="list-main">
            <el-table
              :data="tabDataListsInfoList"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
              @row-click="rowClickFn"
            >
              <el-table-column
                prop="attack_time"
                label="时间"
                sortable
                width="300"
                :formatter="dateFormat3"
              >
              </el-table-column>
              <el-table-column prop="info.method" label="请求类型" width="150">
              </el-table-column>
              <el-table-column
                prop="info.url"
                label="请求详情(url)"
                width="300"
              >
              </el-table-column>
              <el-table-column prop="info.status_code" label="状态">
                <template slot-scope="scope">
                  <i
                    class="killDetails"
                    :class="
                      scope.row.info.status_code == 200 ? 'killDetailsRed' : ''
                    "
                  ></i>

                  {{
                    scope.row.info.status_code == 200
                      ? "200,访问正常"
                      : "200,访问异常"
                  }}
                </template>
              </el-table-column>
              <el-table-column prop="info_len" sortable label="数据长度">
                <template slot-scope="scope">
                  {{ scope.row.info_len }}
                  <span>(字节)</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="攻击详情">
                <template slot-scope="">
                  <i class=""
                    ><img src="@/assets/images/chankanbeifen.png" alt=""
                  /></i>
                </template>
              </el-table-column>
            </el-table>
            <div
              style="
                box-sizing: border-box;
                padding-right: 60px;
                display: flex;
                justify-content: right;
                align-items: center;
                position: absolute;
                bottom: 10px;
                right: 0;
              "
            ></div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
            >
            </el-pagination>
          </div>
        </div>
        <div class="bigListBox"></div>
      </div>
    </el-card>
    <!-- 攻击详情弹出层 -->
    <div class="killDetailsBox" ref="eject">
      <div class="killDetails-box" ref="eject_box">
        <div class="killDetails-box-header">
          <div>攻击详情</div>
          <div class="close" @click="closeFnFn"></div>
        </div>
        <div class="linex"></div>
        <div class="killDetails-box-main">
          <div class="top">
            <div class="text">请求包</div>
            <div class="copy">
              <img
                src="@/assets/images/copyImg.png"
                alt=""
                v-clipboard:copy="textCopy"
                v-clipboard:success="onCopy"
              />
            </div>
          </div>

          <div class="bottom">
            <div>{{ method_ }}{{ url_ }}{{ proto_ }}</div>
            <div>{{ Accept_[0] }}</div>
            <div>{{ Accept_Encoding[0] }}</div>
            <div>{{ Accept_Language[0] }}</div>
            <!-- -------------------------------------------------- -->

            <div>{{ Cache_Control[0] }}</div>
            <div>{{ Content_Length[0] }}</div>
            <div>{{ Content_Type[0] }}</div>
            <div>{{ Cookie[0] }}</div>
            <div>{{ Origin[0] }}</div>
            <div>{{ Referer[0] }}</div>
            <div>{{ Sec_Ch_Ua[0] }}</div>
            <div>{{ Sec_Ch_Ua_Mobile[0] }}</div>
            <div>{{ Sec_Ch_Ua_Platform[0] }}</div>

            <div>{{ Sec_Fetch_Dest[0] }}</div>
            <div>{{ Sec_Fetch_Mode[0] }}</div>
            <div>{{ Sec_Fetch_Site[0] }}</div>
            <div>{{ Sec_Fetch_User[0] }}</div>
            <div>{{ Upgrade_Insecure_Requests[0] }}</div>
            <div>{{ User_Agent[0] }}</div>
            <div
              class="tanStyle"
              :style="auth_info == '' ? 'display:none' : 'display:block'"
            >
              {{ body_ }}
            </div>
            <div
              :style="auth_info == '' ? 'display:none' : 'display:block'"
              class="tanStyle"
            >
              <div class="tanHeader">
                <div>登录账号密码</div>
                <div>
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="auth_info"
                    v-clipboard:success="onCopy"
                  ></i>
                </div>
              </div>
              账号密码：

              <span v-if="auth_info == ''"
                >{{ auth_info }} <i class="el-icon-document-copy"></i
              ></span>
              <span v-else>{{ auth_info }} </span>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="close" @click="closeFnFn">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import headerNavigation from '@/components/header'
import {
  killList,
  killListData,
  mgScene,
  killNode,
  mgType,
  signKillFromApi,
} from "@/api/clags/drohen/threat/index.js";
import loginVue from "../../../login.vue";
import moment from "moment";
import { createLogger } from "vuex";
export default {
  name: "Index",
  // components: {
  //     headerNavigation
  // },
  data() {
    return {
      textCopy: "",
      // 第几页
      currentPageFY: 1,
      // 每页多少条
      page_size: 10,
      total: 5,
      total1: 99,
      arr: [
        { name: "攻击列表" },
        { name: "扫描感知" },
        { name: "攻击来源" },
        { name: "账号资产" },
        { name: "失陷感知" },
      ],
      restaurants: [],
      state2: "",
      formInline: {
        value1: [],
        value2: "",
        value3: "",
      },
      SelectValue1: -1,
      SelectValue2: [],
      SelectValue3: [],
      SelectValue4: "",
      SelectValue5: 0,
      input221: "",
      input222: "",
      locationData: "",
      openImg: require("@/assets/images/open@1.png"),
      options1: [
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
      options2: [],
      options3: [],
      options4: [
        {
          SelectValue4: ">",
          label: ">",
        },
        {
          SelectValue4: "<",
          label: "<",
        },
        {
          SelectValue4: ">=",
          label: ">=",
        },
        {
          SelectValue4: "<=",
          label: "<=",
        },
      ],
      options5: [
        { value: 0, label: "高交互蜜罐状态" },
        { value: 2, label: "登陆成功" },
        { value: 1, label: "登陆失败" },
      ],
      flagBiaoJi: 1,
      signNumber: 1,
      signNumber2: 0,
      attackNumber: 44,
      attackIP: "192.168.4.144",
      attacktime: "2022/04/29 09:00:01",
      tableData: [],

      listMain: false,
      tabDataLists: {
        data: {
          list_infos: {},
        },
      },
      tabDataListsInfoList: [],
      id: [],
      service_type: [],
      attack_ip: "",
      inputNumber: "",
      inputNumberShow: false,
      start_time1: 0,
      end_time1: 0,
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
      loading: false,
      requestDataFlag: true,

      method_: "",
      url_: "",
      proto_: "",
      Accept_: [],
      Accept_Encoding: [],
      Accept_Language: [],
      Cache_Control: [],
      Content_Length: [],
      Content_Type: [],
      Cookie: [],
      Origin: [],
      Referer: [],
      Upgrade_Insecure_Requests: [],
      User_Agent: [],
      body_: "",
      auth_info: "",
      currentPageBig: 1,
      numLength: 0,
      numCondition: "",
      Sec_Ch_Ua: [],
      Sec_Ch_Ua_Mobile: [],
      Sec_Ch_Ua_Platform: [],
      Sec_Fetch_Dest: [],
      Sec_Fetch_Mode: [],
      Sec_Fetch_Site: [],
      Sec_Fetch_User: [],
      service_typeOne: [],
      attack_ipOne: "",
      idOne: [],
    };
  },
  methods: {
    // 标记方法
    signKillFromApiFn(index) {
      this.loading = true;
      // console.log(this.attack_ip);
      this.attack_ip = this.tabDataLists.data.list_infos[index].attack_ip;
      // console.log(this.tabDataLists);
      // console.log(index);
      if (this.tabDataLists.data.list_infos[index].marked == 0) {
        let data = {
          marked: 1, //0:不标记  1：标记
          ip: this.attack_ip,
        };
        this.attack_ip = "";
        this.id = [];
        this.service_type = [];
        signKillFromApi(data)
          .then((res) => {
            if (res.code == 200) {
              this.getListDatas();
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
          ip: this.attack_ip,
        };
        this.attack_ip = "";
        this.id = [];
        this.service_type = [];
        signKillFromApi(data)
          .then((res) => {
            this.getListDatas();
            if (res.code == 200) {
              this.$message("IP已取消标记");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 复制成功回显
    onCopy() {
      this.$message({
        message: "恭喜你，复制成功！",
        type: "success",
      });
    },
    formatter(row, column) {
      return row.address;
    },

    // 标记方法
    flagBiaoJiFn() {
      if (this.flagBiaoJi == 1) {
        this.flagBiaoJi = 2;
        this.signNumber2 = 2;
        this.getListDatas();
      } else {
        this.flagBiaoJi = 1;
        this.signNumber2 = 0;
        this.getListDatas();
      }
    },
    // 刷新方法
    refreshFn() {
      this.getListDatas();
      // this.currentPageBig = 1;
      // if (this.numLength == 0) {
      //   this.numCondition = "";
      // }
      // let data = {
      //   page_no: this.currentPageBig, //页数
      //   page_size: this.page_size, //当前页条数
      //   search: "", //搜索
      //   sort: "attack_time", //分类
      //   order: "", //排序
      //   intranet: this.SelectValue1, //是否内部网络
      //   marked: this.signNumber2, //标记
      //   collected: 0, //搜集
      //   // services: this.service_type, //服务类型
      //   services: [], //服务类型
      //   // client_ids: this.id, //客户端
      //   client_ids: this.id, //客户端
      //   location: "", //ip
      //   labels: "", //标签
      //   condition: this.numCondition, //数据长度范围
      //   start_time: this.start_time1, //开始时间
      //   end_time: this.end_time1, //结束时间
      //   ignore_ips: [], //忽略ip
      //   login_result: this.SelectValue5,
      // };
      // this.loading = true;
      // killListData(data)
      //   .then((res) => {
      //     // console.log(res, 2222222)
      //     this.loading = false;
      //     this.total1 = res.data.list_infos.length;
      //     this.tabDataLists = res;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 分页器每页多少条数据
    handleSizeChange(val) {
      this.page_size = val;
      this.getListDatasList2();
    },
    handleCurrentChange(val) {
      this.currentPageFY = val;
      this.loading = true;
      this.requestDataFlag = false;
      this.getListDatasList2();
    },
    // handleCurrentChange(val) {
    //   // console.log(`当前页: ${val}`);
    //   this.currentPageBig = val
    //   this.loading = true
    //   for (let i = 0; i < this.$refs.main.length; i++) {
    //     this.$refs.main[i].style.height = '83px'
    //     // console.log(this.tabDataLists.data.list_infos[i].client_id);
    //   }
    //   this.getListDatas2()
    //   this.getListDatasList()
    // },
    // ----------------------------------------------------------
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onChange(event) {
      this.setData({ active: event.detail });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [];
    },
    handleSelect(item) {
      // console.log(item);
    },

    // 重置方法
    resetFn() {
      this.state2 = "";
      this.locationData = "";
      this.flagBiaoJi = 1;
      this.SelectValue4 = "";
      this.numLength = 0;
      this.numCondition = "";
      this.signNumber2 = 0;
      this.value1 = "";
      // this.start_time1 = 0;
      // this.end_time1 = 0;

      this.SelectValue1 = -1;

      this.SelectValue2 = [];
      this.service_type = [];

      this.SelectValue3 = [];
      this.id = [];

      this.inputNumber = "";

      this.input221 = "";
      this.input222 = "";
      this.attack_ip = "";

      this.SelectValue5 = 0;

      this.formInline = {
        value1: [],
        value2: "",
        value3: "",
      };
      this.end_time1 = Math.floor(new Date().getTime() / 1000);
      this.start_time1 = this.end_time1 - 3600 * 24 * 7;

      this.formInline.value2 = this.getNowTime()[0];
      this.formInline.value3 = this.getNowTime()[1];
      // console.log(this.formInline);

      this.getListDatas();
    },
    // 范围时间方法
    dateFn(e) {
      this.start_time1 = Math.floor(e[0] / 1000);
      this.end_time1 = Math.floor(e[1] / 1000);

      // console.log(e);
      // console.log(this.start_time1);
      // console.log(this.end_time1);
      if (this.tabDataLists.data.list_infos.length > 0) {
        for (let i = 0; i < this.$refs.main.length; i++) {
          this.$refs.main[i].style.height = "83px";
          // console.log(this.tabDataLists.data.list_infos[i].client_id);
        }
      }
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }

      // if (this.service_type == []) {
      // this.service_type = [];
      // }
      // this.id = [];
      // this.attack_ip = "";
      this.getListDatas();
    },
    // 蜜罐场景方法
    mgTotalFn(e) {
      this.SelectValue1 = e;
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }
      this.getListDatas();
      // this.getListDatasList();
    },
    // 模糊IP搜索方法
    searchFn(e) {
      this.state2 = e;
      this.attack_ip = e;
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }
      // console.log(this.attack_ip);
      // this.start_time1 = 0;
      // this.end_time1 = 0;
      this.getListDatas();
    },
    // 蜜罐类型事件方法
    mgTypeFn(e) {
      this.SelectValue2 = e;
      // console.log(e);
      this.service_type = e;
      this.getListDatas();
      // this.getListDatasList();
    },
    // 被攻击节点方法
    killFn(e) {
      this.SelectValue3 = e;
      this.id = e;
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }
      this.getListDatas();
      // this.getListDatasList();
      // console.log(e);
    },
    // 数据长度方法
    inputNumberFocus() {
      this.inputNumberShow = true;
    },
    inputNumberBlur(e) {
      // 长度数据
      // console.log(e);
      // console.log(this.inputNumber);
      // console.log(this.numCondition);
      if (this.numCondition == ">" || this.numCondition == "<") {
        this.numLength = Number(e);
        // console.log(this.numLength);
        // console.log("lllllllllllllllllll");
      } else {
        this.numLength = Number(e);
        // console.log(typeof this.numLength);
        // console.log(",,,,,,,,,,,,");
      }
      if (this.numLength == 0) {
        this.numCondition = "";
        this.SelectValue4 = "";
        if (this.SelectValue2 != []) {
          this.service_type = this.SelectValue2;
        }
        this.getListDatas();
      } else {
        if (this.SelectValue2 != []) {
          this.service_type = this.SelectValue2;
          // console.log(this.service_type);
        }
        this.getListDatas();
        // this.getListDatasList();
      }
      // this.service_type = [];
      // this.id = [];
      // this.attack_ip = "";
    },
    inputNumberInput() {
      if (this.inputNumber) {
        this.inputNumberShow = false;
      }
    },
    inputNumberShowFn(e) {
      if (e == false) {
        this.inputNumberShow = !this.inputNumberShow;
      }
    },
    inputNumberShowFn2(e) {
      // console.log(e);
      // this.inputNumber = e;

      this.numCondition = e;
      if (this.numLength != "") {
        // this.service_type = [];
        if (this.SelectValue2 != []) {
          this.service_type = this.SelectValue2;
          // console.log(this.service_type);
        }
        this.id = [];
        this.attack_ip = "";
        this.getListDatas();
      }
      // console.log(this.inputNumber);
      // this.getListDatas();
    },
    // 攻击来源位置方法
    killSourceFn(e) {
      this.input221 = e;
      // console.log(e);
      this.locationData = e;
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }
      this.getListDatas();
      // console.log(this.tabDataLists.data.list_infos.length);
      // if (this.tabDataLists.data.list_infos.length != 0) {
      //   this.getListDatasList();
      //   // console.log(111111111111111111111111111111111111111);
      // }
    },
    // 威胁情报标签方法
    weixieBiaoQian(e) {
      this.input222 = e;
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }
      this.getListDatas();
    },
    // 高交互蜜罐状态方法
    topState(e) {
      this.SelectValue5 = e;
      // console.log(this.SelectValue5);
      if (this.SelectValue2 != []) {
        this.service_type = this.SelectValue2;
        // console.log(this.service_type);
      }
      this.getListDatas();
      // this.getListDatasList();
    },
    // 列表时间格式化方法
    dateFormat3: function (row, column, data) {
      return moment.unix(data).format("YYYY/MM/DD HH:mm:ss");
    },
    // 查看详情方法
    rowClickFn(e) {
      this.method_ = "";
      this.url_ = "";
      this.proto_ = "";
      this.Accept_ = [];
      this.Accept_Encoding = [];
      this.Accept_Language = [];
      this.Content_Length = [];
      this.Content_Type = [];
      this.Cookie = [];
      this.Origin = [];
      this.Referer = [];
      this.Upgrade_Insecure_Requests = [];
      this.User_Agent = [];
      this.body_ = "";
      this.auth_info = "";
      this.Cache_Control = [];
      this.Sec_Ch_Ua = [];
      this.Sec_Ch_Ua_Mobile = [];
      this.Sec_Ch_Ua_Platform = [];
      this.Sec_Fetch_Dest = [];
      this.Sec_Fetch_Mode = [];
      this.Sec_Fetch_Site = [];
      this.Sec_Fetch_User = [];

      // console.log(e);
      if (e.info.method) {
        this.method_ = e.info.method;
      }
      if (e.info.url) {
        this.url_ = e.info.url;
      }
      if (e.info.proto) {
        this.proto_ = e.info.proto;
      }

      if (e.info.header.Accept) {
        this.Accept_[0] = `Accept:${e.info.header.Accept}\n`;
      }
      if (e.info.header["Accept-Encoding"]) {
        this.Accept_Encoding[0] = `Accept-Encoding:${e.info.header["Accept-Encoding"]}\n`;
      }

      // console.log(typeof e.info.header["Accept-Encoding"]);
      if (e.info.header["Accept-Language"]) {
        this.Accept_Language[0] = `Accept-Language:${e.info.header["Accept-Language"]}\n`;
      }
      if (e.info.header["Cache-Control"]) {
        this.Cache_Control[0] = `Cache-Control:${e.info.header["Cache-Control"]}\n`;
      }
      if (e.info.header["Content-Length"]) {
        this.Content_Length[0] = `Content-Length:${e.info.header["Content-Length"]}\n`;
      }
      if (e.info.header["Content-Type"]) {
        this.Content_Type[0] = `Content-Type:${e.info.header["Content-Type"]}\n`;
      }
      if (e.info.header["Cookie"]) {
        this.Cookie[0] = `Cookie:${e.info.header["Cookie"]}\n`;
      }
      // console.log(e.info.header["Cookie"]);
      if (e.info.header["Origin"]) {
        this.Origin[0] = `Origin:${e.info.header["Origin"]}\n`;
      }
      if (e.info.header["Referer"]) {
        this.Referer[0] = `Referer:${e.info.header["Referer"]}\n`;
      }
      if (e.info.header["Upgrade-Insecure-Requests"]) {
        this.Upgrade_Insecure_Requests[0] = `Upgrade-Insecure-Requests:${e.info.header["Upgrade-Insecure-Requests"]}\n`;
      }
      if (e.info.header["User-Agent"]) {
        this.User_Agent[0] = `User-Agent:${e.info.header["User-Agent"]}\n`;
      }

      if (e.info.body) {
        this.body_ = `body:${e.info.body}\n`;
      }
      if (e.info.auth_info) {
        this.auth_info = e.info.auth_info;
      }
      // console.log(
      //   this.auth_info,
      //   "-------------------------------------------------------------------------------"
      // );
      if (e.info.header["Sec-Ch-Ua"]) {
        this.Sec_Ch_Ua[0] = `Sec-Ch-Ua:${e.info.header["Sec-Ch-Ua"]}\n`;
      }
      // console.log(e.info.header["Sec-Ch-Ua"] == true);
      if (e.info.header["Sec-Ch-Ua-Mobile"]) {
        this.Sec_Ch_Ua_Mobile[0] = `Sec-Ch-Ua-Mobile:${e.info.header["Sec-Ch-Ua-Mobile"]}\n`;
      }
      if (e.info.header["Sec-Ch-Ua-Platform"]) {
        this.Sec_Ch_Ua_Platform[0] = `Sec-Ch-Ua-Platform:${e.info.header["Sec-Ch-Ua-Platform"]}\n`;
      }
      if (e.info.header["Sec-Fetch-Dest"]) {
        this.Sec_Fetch_Dest[0] = `Sec-Fetch-Dest:${e.info.header["Sec-Fetch-Dest"]}\n`;
      }
      if (e.info.header["Sec-Fetch-Mode"]) {
        this.Sec_Fetch_Mode[0] = `Sec-Fetch-Mode:${e.info.header["Sec-Fetch-Mode"]}\n`;
      }
      if (e.info.header["Sec-Fetch-Site"]) {
        this.Sec_Fetch_Site[0] = `Sec-Fetch-Site:${e.info.header["Sec-Fetch-Site"]}\n`;
      }
      if (e.info.header["Sec-Fetch-User"]) {
        this.Sec_Fetch_User[0] = `Sec-Fetch-User:${e.info.header["Sec-Fetch-User"]}\n`;
      }
      // console.log(
      //   this.Sec_Ch_Ua,
      //   "//////////////////////////////////////////////////////"
      // );

      // if (this.method_ == "") {
      //   this.method_ = "===";
      // }
      // if (this.url_ == "") {
      //   this.url_ = "===";
      // }
      // if (this.proto_ == "") {
      //   this.proto_ = "===";
      // }
      // if (this.Accept_ == "") {
      //   this.Accept_ = "===";
      // }
      if (this.Accept_Encoding[0] == undefined) {
        this.Accept_Encoding[0] = "";
      }
      if (this.Accept_Language[0] == undefined) {
        this.Accept_Language[0] = "";
      }
      if (this.Content_Length[0] == undefined) {
        this.Content_Length[0] = "";
      }
      if (this.Content_Type[0] == undefined) {
        this.Content_Type[0] = "";
      }
      if (this.Cookie[0] == undefined) {
        this.Cookie[0] = "";
      }
      if (this.Origin[0] == undefined) {
        this.Origin[0] = "";
      }
      if (this.Referer[0] == undefined) {
        this.Referer[0] = "";
      }
      if (this.Upgrade_Insecure_Requests[0] == undefined) {
        this.Upgrade_Insecure_Requests[0] = "";
      }
      // if (this.User_Agent[0] == undefined) {
      //   this.User_Agent[0] = "";
      // }
      // if (this.body_[0] == undefined) {
      //   this.body_[0] = "";
      // }
      // if (this.auth_info[0] == undefined) {
      //   this.auth_info[0] = "";
      // }
      if (this.Cache_Control[0] == undefined) {
        this.Cache_Control[0] = "";
      }
      if (this.Sec_Ch_Ua[0] == undefined) {
        this.Sec_Ch_Ua[0] = "";
      }
      if (this.Sec_Ch_Ua_Mobile[0] == undefined) {
        this.Sec_Ch_Ua_Mobile[0] = "";
      }
      if (this.Sec_Ch_Ua_Platform[0] == undefined) {
        this.Sec_Ch_Ua_Platform[0] = "";
      }
      if (this.Sec_Fetch_Dest[0] == undefined) {
        this.Sec_Fetch_Dest[0] = "";
      }
      if (this.Sec_Fetch_Mode[0] == undefined) {
        this.Sec_Fetch_Mode[0] = "";
        // console.log("????????????????????????????????????????????????????");
      }
      if (this.Sec_Fetch_Site[0] == undefined) {
        this.Sec_Fetch_Site[0] = "";
      }
      if (this.Sec_Fetch_User[0] == undefined) {
        this.Sec_Fetch_User[0] = "";
      }
      this.textCopy = `Accept:${this.Accept_[0]}${this.Accept_Encoding[0]}${this.Accept_Language[0]}${this.Cache_Control[0]}${this.Content_Length[0]}${this.Content_Type[0]}${this.Cookie[0]}${this.Origin[0]}${this.Referer[0]}${this.Sec_Ch_Ua[0]}${this.Sec_Ch_Ua_Mobile[0]}${this.Sec_Ch_Ua_Platform[0]}${this.Sec_Fetch_Dest[0]}${this.Sec_Fetch_Mode[0]}${this.Sec_Fetch_Site[0]}${this.Sec_Fetch_User[0]}${this.Upgrade_Insecure_Requests[0]}${this.User_Agent}${this.body_}`;
      // console.log(this.textCopy);

      this.$refs.eject.style.display = "block";
      this.$refs.homeHome.style.overflow = "hidden";
      this.$refs.homeHome.style.height = "100%";

      setTimeout(() => {
        this.$refs.eject_box.style.top = "50%";
        this.$refs.eject.style.opacity = "1";
      }, 200);
    },
    // 弹窗关闭方法
    closeFnFn() {
      this.$refs.eject.style.opacity = "0";
      this.$refs.eject_box.style.top = "45%";
      this.$refs.homeHome.style.overflow = "auto";
      setTimeout(() => {
        this.$refs.eject.style.display = "none";
      }, 500);
    },

    // axios请求数据
    getListDatasList() {
      if (this.numLength == 0) {
        this.numCondition = "";
      }
      let data2 = {
        page_no: this.currentPageFY,
        page_size: this.page_size,
        search: this.attack_ip,
        sort: "attack_time",
        order: "",
        intranet: this.SelectValue1,
        marked: this.signNumber2,
        collected: 0,
        services: this.service_type,
        client_ids: this.id,
        location: "",
        labels: this.input222,
        condition: this.numCondition,
        start_time: this.start_time1,
        end_time: this.end_time1,
        ignore_ips: [],
        login_result: this.SelectValue5,
        length: this.numLength,
      };
      this.loading = true;
      killList(data2)
        .then((res) => {
          // console.log(res, 99999999);

          this.tabDataListsInfoList = res.data.attack_infos;
          this.total = this.tabDataListsInfoList.length;

          // this.total = this.tabDataListsInfoList.total_num
          // total 总数
          this.total = res.data.total_num;
          if (res.code == 200) {
            this.loading = false;
          }
          // console.log(this.tabDataListsInfoList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListDatas() {
      this.currentPageBig = 1;
      if (this.numLength == 0) {
        this.numCondition = "";
      }
      let data = {
        page_no: this.currentPageBig, //页数
        page_size: this.page_size, //当前页条数
        search: this.attack_ip, //搜索
        sort: "attack_time", //分类
        order: "", //排序
        intranet: this.SelectValue1, //是否内部网络
        marked: this.signNumber2, //标记
        collected: 0, //搜集
        // services: this.service_type, //服务类型
        services: this.service_type, //服务类型
        // client_ids: this.id, //客户端
        client_ids: this.id, //客户端
        location: this.locationData, //ip
        labels: this.input222, //标签
        condition: this.numCondition, //数据长度范围
        start_time: this.start_time1, //开始时间
        end_time: this.end_time1, //结束时间
        ignore_ips: [], //忽略ip
        login_result: this.SelectValue5,
        length: this.numLength,
      };
      this.loading = true;
      killListData(data)
        .then((res) => {
          // console.log(res, 2222222);
          this.loading = false;

          this.total1 = res.data.list_infos.length;
          this.tabDataLists = res;
          for (let i = 0; i < this.$refs.main.length; i++) {
            this.$refs.main[i].style.height = "83px"; // console.log(this.tabDataLists.data.list_infos[i].client_id);
            this.$refs.open2[i].src = require("@/assets/images/open@1.png");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListDatas2() {
      if (this.numLength == 0) {
        this.numCondition = "";
      }
      let data = {
        page_no: this.currentPageBig, //页数
        page_size: this.page_size, //当前页条数
        search: "", //搜索
        sort: "attack_time", //分类
        order: "", //排序
        intranet: this.SelectValue1, //是否内部网络
        marked: this.signNumber2,
        collected: 0, //搜集
        // services: this.service_type, //服务类型
        services: [], //服务类型
        // client_ids: this.id, //客户端
        client_ids: [], //客户端
        location: "", //ip
        labels: "", //标签
        condition: this.inputNumber, //数据长度范围
        start_time: this.start_time1, //开始时间
        end_time: this.end_time1, //结束时间
        ignore_ips: [], //忽略ip
        login_result: this.SelectValue5,
      };
      this.loading = true;
      killListData(data)
        .then((res) => {
          // console.log(res, 2222222)
          this.loading = false;
          this.tabDataLists = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListDatasList2() {
      if (this.numLength == 0) {
        this.numCondition = "";
      }
      let data2 = {
        page_no: this.currentPageFY,
        page_size: this.page_size,
        search: this.attack_ipOne,
        sort: "attack_time",
        order: "",
        intranet: this.SelectValue1,
        marked: this.signNumber2,
        collected: 0,
        services: this.service_typeOne,
        client_ids: this.idOne,
        location: "",
        labels: this.input222,
        condition: this.inputNumber,
        start_time: this.start_time1,
        end_time: this.end_time1,
        ignore_ips: [],
        login_result: this.SelectValue5,
      };
      this.loading = true;
      killList(data2)
        .then((res) => {
          // console.log(res, 99999999)
          this.loading = false;
          this.tabDataListsInfoList = res.data.attack_infos;
          // console.log(this.tabDataListsInfoList)
        })
        .catch((err) => {
          // console.log('---------------------')
          console.log(err);
        });
    },

    zkFn() {
      this.loading = true;
      this.currentPageFY = 1;
    },
    // 点击展开
    openLY(index) {
      // console.log("7777777777777"); // console.log(this.$refs.open2); // // 判断重复点击
      this.loading = true;
      // console.log(this.loading);
      if (this.$refs.main[index].style.height == "100%") {
        this.$refs.main[index].setAttribute("style", "height:83px !important");
        this.$refs.open2[index].src = require("@/assets/images/open@1.png");
        this.loading = false;
      } else {
        if (this.tabDataLists.data.list_infos.length > 0) {
          for (let i = 0; i < this.$refs.main.length; i++) {
            this.$refs.main[i].style.height = "83px"; // console.log(this.tabDataLists.data.list_infos[i].client_id);
            this.$refs.open2[i].src = require("@/assets/images/open@1.png");
          }
          this.$refs.open2[index].src = require("@/assets/images/open@2.png");
        }
        this.$refs.main[index].setAttribute("style", "height:100% !important");
        this.id = [];
        this.id.push(this.tabDataLists.data.list_infos[index].client_id);
        this.attack_ip = this.tabDataLists.data.list_infos[index].attack_ip;
        this.service_type = [];
        this.service_type.push(
          this.tabDataLists.data.list_infos[index].service_type
        );
        this.getListDatasList();
      }
      this.service_typeOne = this.service_type;
      this.idOne = this.id;
      this.attack_ipOne = this.attack_ip;
      this.service_type = [];
      this.id = [];
      this.attack_ip = "";
      // console.log(this.id);
      // console.log(this.attack_ip);
      // console.log(this.service_type);
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
    onceFn() {
      mgScene()
        .then((res) => {
          // console.log(res);
          // console.log(999);
          this.signNumber = res.data.marked;
          this.options1[0].kk = res.data.total;
          this.options1[1].kk = res.data.external;
          this.options1[2].kk = res.data.internal;
        })
        .catch((err) => {
          console.log(err);
        });

      mgType()
        .then((res) => {
          // console.log(res);
          this.options2 = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      killNode()
        .then((res) => {
          // console.log(res, 999);
          this.options3 = res.data;
          // console.log(this.options3, 777777777);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.formInline.value2 = this.getNowTime()[0];
    this.formInline.value3 = this.getNowTime()[1];
    this.onceFn();
  },
  mounted() {
    this.restaurants = this.loadAll();
    // document.getElementsByClassName("el-range__close-icon")[0].className +=
    //   " el-icon-date";
    // document.getElementsByClassName(
    //   "el-pagination__jump"
    // )[0].childNodes[0].nodeValue = "跳至";

    this.end_time1 = Math.floor(new Date().getTime() / 1000);
    // console.log(this.end_time1);
    this.start_time1 = this.end_time1 - 3600 * 24 * 7;
    // console.log(this.start_time1);
    this.getListDatas();

    // this.value1 = [this.start_time1, this.end_time1];
    // console.log(this.value1);
    // console.log(this.formInline.value1);
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 0;
}
.el-card {
  margin: 10px 50px;
}
.home {
  width: 100%;
  // height: auto;
  background-color: #f9f9f9 !important;
}
.app-container {
  .killDetailsBox {
    .tanStyle {
      padding: 10px;
      color: rgba(17, 18, 34, 0.9);
      background: rgba(17, 18, 34, 0.05);
      margin-bottom: 10px;
      .tanHeader {
        display: flex;
        justify-content: start;
        i {
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
    width: 100%;
    // height: 100%;
    position: fixed;
    float: left;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    overflow: hidden;
    transition: 0.5s;
    opacity: 0;

    display: none;
    .killDetails-box {
      width: 892px;
      height: 579px;
      background: #ffffff;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 20px 30px;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: 0.5s;
      .linex {
        width: 890px;
        height: 1px;
        background: #eeeeee;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .killDetails-box-header {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 13px;
        .close {
          width: 30px;
          height: 30px;
          // background: #6e6363;
          background: url(./cl.png);
          cursor: pointer;
        }
      }
      .killDetails-box-main {
        width: 100%;
        height: 410px;
        border: 1px solid #9ec9ff;
        margin: 20px auto 20px;
        .top {
          width: 100%;
          height: 42px;
          background: rgba(158, 201, 255, 0.2);
          border-bottom: 1px solid #9ec9ff;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          .text {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          .copy {
            width: 30px;
            height: 30px;
            // background: #000000;
            img {
              cursor: pointer;
            }
          }
        }
        .bottom {
          width: 100%;
          height: 368px;
          box-sizing: border-box;
          padding: 20px 12px 0;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 25px;
          overflow: auto;
          > div {
            width: 100%;
            text-align: left;
            word-break: break-all;
          }
        }
      }
      .footer {
        width: 890px;
        height: 76px;
        background: #ffffff;
        margin-left: 50%;
        transform: translateX(-50%);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 0px 0px 5px 5px;
        display: flex;
        justify-content: right;
        align-items: center;
        .close {
          width: 62px;
          height: 36px;
          background: #ffffff;
          border-radius: 2px;
          border: 1px solid #dddddd;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-right: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .el-autocomplete,
  .inline-input {
    width: 230px;
  }
  .el-select,
  .el-select--medium {
    width: 100%;
  }
  .line {
    width: 1px;
    height: 47px;
    background-color: #dedede;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  margin: 0px;
  padding: 0px !important;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
  .page-input {
    ::v-deep .el-range-separator {
      padding-right: 10px;
      line-height: 32px;
    }
    ::v-deep .el-input-group__prepend {
      padding-right: 0px;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    margin: 10px auto 20px;
    max-width: 1680px;
    // height: 140px;
    background: #ffffff;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    > div {
      width: 230px;
      height: 40px;
      margin-right: 30px;
    }

    ::v-deep .el-range-editor--medium .el-range__icon,
    .el-range-editor--medium .el-range__close-icon {
      line-height: 32px;
    }
    ::v-deep .el-input--medium .el-input__icon {
      line-height: 40px;
    }
    .sign {
      width: 104px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      -webkit-touch-callout: none; /*系统默认菜单被禁用*/
      -webkit-user-select: none; /*webkit浏览器*/
      -khtml-user-select: none; /*早期浏览器*/
      -moz-user-select: none; /*火狐*/
      -ms-user-select: none; /*IE10*/
      user-select: none;
    }
    .ccc {
      width: 104px;
      height: 40px;
      line-height: 40px;
      background-color: red;
      display: inline-block;
      vertical-align: middle;
      background: rgba(158, 201, 255, 0.2);
      border-radius: 2px;
      border: 1px solid #016cff !important;
      text-align: center;
      color: #016cff !important;
    }
    .reset {
      width: 32px;
      height: 40px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #016cff;
      line-height: 40px;
      display: inline-block;
      cursor: pointer;
    }
    .bbb {
      margin-top: 20px;
    }

    .el-col,
    .el-col-12 {
      width: 230px;
      height: 40px;
      // margin-right: 30px;
      // margin-bottom: px;
      > div {
        height: 40px !important;
        ::v-deep .el-input--medium .el-input__inner {
          height: 40px !important;
          line-height: 40px !important;
        }
      }
    }
    ::v-deep .el-range-input {
      color: #777;
      overflow: hidden;
      width: 80px;
    }
    .el-range__icon {
      display: none;
    }
    ::v-deep .el-input--medium .el-input__inner {
      // width: 100%;
      width: 100%;
      height: 40px;
    }
    ::v-deep .el-select,
    .el-select--medium {
      box-sizing: border-box;
      padding-left: 2px;
      .el-select__tags {
        flex-wrap: nowrap;
        overflow: hidden;
        margin-left: 5px;
        span {
          z-index: -1 !important;
        }
      }
    }
    .el-select {
      margin-right: 38px;
    }
    .el-range-editor--medium.el-input__inner {
      width: 230px;
      height: 40px;
      margin-right: 30px;
    }
    .top20 {
      // margin-top: 20px;
    }
    .el-input,
    .el-input--medium {
      // width: 240px;
      margin-right: 30px;
    }
  }

  .data-length {
    display: flex;
    justify-content: space-between;
    width: 230px !important;
    height: 40px;
    background-color: pink;

    .el-input__inner {
      width: 20px;
    }
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

  .luyou-list {
    .bigListBox {
      display: flex;
      justify-content: right;
      align-items: center;
      margin-top: 9.5px;
      margin-right: 30px;
    }
    // width: 1680px;
    // max-width: 1680px;
    height: auto;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    padding-bottom: 9.5px;
    // overflow: hidden;
    .killDetails {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #e6431f;
      border-radius: 50%;
      border: 2px solid rgba(230, 67, 31, 0.35);
      box-sizing: content-box;
      background-clip: padding-box;
      vertical-align: middle;
      margin-right: 5px;
      margin-bottom: 3px;
    }
    .killDetailsRed {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #73c738 !important;
      border: 2px solid rgba(115, 199, 56, 0.35) !important;
    }
    .list-header {
      width: 100%;
      height: 66px;
      // background-color: rgb(221, 131, 131);
      display: flex;
      align-items: center;
      .order {
        width: 80px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-left: 1000px;
      }
      .order-sle {
        width: 180px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          width: 90px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #016cff;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          > div {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            i {
              display: inline-block;
              width: 5px;
              height: 5px;
              margin-left: 6px;
            }
            .top {
              margin-bottom: 2px;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid transparent;
              border-bottom: 5px solid #fff;
            }
            .bottom {
              margin-top: 2px;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid #fff;
              border-bottom: 5px solid transparent;
            }
            .top2 {
              border-bottom: 5px solid #016cff;
            }
            .bottom2 {
              border-top: 5px solid #016cff;
            }
          }
        }
        .order-one {
          background-color: #016cff;
          color: #fff;
          border-radius: 2px 0px 0px 2px;
        }
        .order-two {
          background-color: #fff;
          color: #0044a4;
          border-radius: 0px 2px 2px 0px;
        }
      }
      .el-row {
        display: flex;
        flex: 1;
      }
      .el-col {
        display: flex;
        justify-content: right;
        margin-right: 10px;
      }
      // 刷新按钮
      .refresh {
        margin-left: 90px;
      }
      // 刷新按钮
      //
      .export {
        margin-left: 20px;
      }

      .export {
        width: 69px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .list-page:hover {
      background: #eef5ff !important;
    }
    .list-box {
      height: 83px;
      overflow: hidden;
      transition: 0.2s;
      .list-page {
        // width: 1682px;
        transition: 0.2s;
        height: 83px;
        background: #f9f9f9;
        box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        padding: 12px 20px;
        display: flex;
        justify-content: start;
        align-items: center;
        .list-page-1 {
          width: 21%;
          height: 100%;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          position: relative;
          .list-page-1-img {
            width: 24px;
            height: 24px;
            margin-right: 20px;
            img {
              width: 100%;
            }
          }
        }
        .list-page-div,
        .list-page-time {
          margin-left: 10px;
          width: 12%;
          height: 100%;
          position: relative;
          box-sizing: border-box;
          // padding: 0 25px 0 0px;
          .top {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #777777;
            line-height: 30px;
            text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
          }
          .bottom {
            font-size: 16px;
            // margin-left: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 30px;
            text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
            span {
              display: inline-block;
              padding: 0 0px;
              border-bottom: 1px solid #979797;
            }
            .laiyuan1 {
              display: inline-block;
              width: 16px;
              width: 16px;
              // margin-left: -24px;
              vertical-align: middle;
              img {
                width: 100%;
              }
            }
          }
        }
        .list-page-time {
          width: 16%;
          height: 100%;
        }
      }
      .list-main {
        width: calc(100% - 40px);
        margin: 20px;
        transition: 1s;
        overflow: hidden;
        // .el-pagination {
        //   // position: absolute;
        //   // left: 65%;
        //   // bottom: 20px;
        //   ::v-deep .el-pagination__jump {
        //     margin-left: 0px;
        //   }
        // }
        .total {
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #777777;
          line-height: 17px;
          margin-top: 20px;
          // position: absolute;
          // left: 60%;
          // bottom: 30px;
          span {
            color: #016cff;
          }
        }
        // width: 1500px;
        // height: 738px;
        // height: 100vh;

        // margin: 20px auto;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        position: relative;
        top: 0;

        // !!!
        ::v-deep .el-table--medium .el-table__cell {
          padding: 10px 20px;
          box-sizing: border-box;
          width: 142px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        ::v-deep .el-table_1_column_1,
        .is-leaf .el-table__cell {
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
          margin-right: 16px;
          margin-bottom: 20px;
        }

        ::v-deep.el-pagination > button {
          padding: 0 !important;
          height: 34px !important;
        }

        // ::v-deep .el-pagination span {
        //   color: #646566;
        //   width: 50px;
        //   height: 34px !important;
        //   line-height: 34px !important;
        //   box-sizing: border-box;
        // }

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
        //   ::v-deep .el-pagination .el-pager .number:not(:first-child) {
        //     border-right: none !important;
        //   }
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

    .list-footer:hover {
      background: #eef5ff;
    }
    .list-footer {
      width: 100%;
      height: 83px;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-sizing: border-box;
      padding: 12px 20px;
      display: flex;
      justify-content: start;
      align-items: center;
      transition: 0.2s;
      .list-page-1 {
        width: 20%;
        height: 100%;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        position: relative;
        .list-page-1-img {
          width: 24px;
          height: 24px;
          margin-right: 20px;
          img {
            width: 100%;
          }
        }
      }
      .list-page-div,
      .list-page-time {
        width: 12%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding: 0 30px;
        .top1 {
          color: #eb7d41 !important;
        }
        .top {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #777777;
          line-height: 30px;
          text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
        }
        .bottom {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 30px;
          text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
          span {
            display: inline-block;
            padding: 0 2px;
            border-bottom: 1px solid #979797;
          }
          .laiyuan1 {
            display: inline-block;
            width: 16px;
            width: 16px;
            margin-left: -20px;
            vertical-align: middle;
            img {
              width: 100%;
              color: #eb7d41;
            }
          }
        }
      }
      .list-page-time {
        width: 15%;
        height: 100%;
      }
    }
  }
}
</style>
