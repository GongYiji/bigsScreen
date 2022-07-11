<!--  -->
<template>
  <div class="page-username" ref="page_username">
    <header-navigation :submenuArr="arr"></header-navigation>
    <div class="page-input">
      <div>
        <el-input
          placeholder="模糊查询IP"
          v-model="searchStateIP"
          clearable
          @change="fuzzyqueryFnFn"
          prefix-icon="el-icon-search"
        >
        </el-input>
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
          @change="dateUsernameFn"
          value-format="timestamp"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div>
        <el-select
          v-model="SelectValueKill"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="被攻击服务"
          @change="mgTypeKillFn"
        >
          <el-option
            v-for="item in optionsKill"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>

      <div
        class="biaojiIP"
        @click="activeClassFn1"
        :class="flag1 == 2 ? 'activeClass' : ''"
      >
        标记IP({{ marked }}起)
      </div>
      <div
        class="shixianSHUJU"
        @click="activeClassFn2"
        :class="flag2 == 2 ? 'activeClass' : ''"
      >
        失陷数据({{ cored }}起)
      </div>
      <div
        class="qiyexinxi shixianSHUJU"
        @click="activeClassFn3"
        :class="flag3 == 2 ? 'activeClass' : ''"
      >
        企业信息监控({{ bait }}起)
      </div>
      <!-- <div class="reset" @click="resetFn">重置</div> -->

      <el-button @click="resetFn" icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="page-main">
      <div class="main-left">
        <div class="main-left-top" v-loading="main_left_top">
          <div class="header">
            <img src="@/assets/images/jiedianguanli_jiantou.png" alt="" />
          </div>
          <div class="header-2"></div>
          <div class="header-title">Top10用户名</div>
          <div class="main" ref="mainOne">
            <ul>
              <li>
                <div class="ranking ranking1">1</div>
                <div class="username" :title="top_user[0].name">
                  {{ top_user[0].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu1' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">100</div>
              </li>
              <li>
                <div class="ranking ranking2">2</div>
                <div class="username" :title="top_user[1].name">
                  {{ top_user[1].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu2' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">90</div>
              </li>
              <li>
                <div class="ranking ranking3">3</div>
                <div class="username" :title="top_user[2].name">
                  {{ top_user[2].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu3' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">80</div>
              </li>
              <li>
                <div class="ranking rankingA">4</div>
                <div class="username" :title="top_user[3].name">
                  {{ top_user[3].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu4' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">70</div>
              </li>
              <li>
                <div class="ranking rankingA">5</div>
                <div class="username" :title="top_user[4].name">
                  {{ top_user[4].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu5' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">60</div>
              </li>
              <li>
                <div class="ranking rankingA">6</div>
                <div class="username" :title="top_user[5].name">
                  {{ top_user[5].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu6' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">50</div>
              </li>
              <li>
                <div class="ranking rankingA">7</div>
                <div class="username" :title="top_user[6].name">
                  {{ top_user[6].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu7' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">40</div>
              </li>
              <li>
                <div class="ranking rankingA">8</div>
                <div class="username" :title="top_user[7].name">
                  {{ top_user[7].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu8' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">30</div>
              </li>
              <li>
                <div class="ranking rankingA">9</div>
                <div class="username" :title="top_user[8].name">
                  {{ top_user[8].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu9' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">20</div>
              </li>
              <li>
                <div class="ranking rankingA">10</div>
                <div class="username" :title="top_user[9].name">
                  {{ top_user[9].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_user_trtr == 1 ? 'zhuu10' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">10</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-left-bottom" v-loading="main_left_bottom">
          <div class="header">
            <img src="@/assets/images/jiedianguanli_jiantou.png" alt="" />
          </div>
          <div class="header-2"></div>
          <div class="header-title">Top10密码</div>
          <div class="main" ref="mainTwo">
            <ul>
              <li>
                <div class="username" :title="top_password[0].name">
                  {{ top_password[0].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu1' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">100</div>
              </li>
              <li>
                <div class="username" :title="top_password[1].name">
                  {{ top_password[1].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu2' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">90</div>
              </li>
              <li>
                <div class="username" :title="top_password[2].name">
                  {{ top_password[2].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu3' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">80</div>
              </li>
              <li>
                <div class="username" :title="top_password[3].name">
                  {{ top_password[3].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu4' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">70</div>
              </li>
              <li>
                <div class="username" :title="top_password[4].name">
                  {{ top_password[4].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu5' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">60</div>
              </li>
              <li>
                <div class="username" :title="top_password[5].name">
                  {{ top_password[5].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu6' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">50</div>
              </li>
              <li>
                <div class="username" :title="top_password[6].name">
                  {{ top_password[6].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu7' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">40</div>
              </li>
              <li>
                <div class="username" :title="top_password[7].name">
                  {{ top_password[7].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu8' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">30</div>
              </li>
              <li>
                <div class="username" :title="top_password[8].name">
                  {{ top_password[8].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu9' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">20</div>
              </li>
              <li>
                <div class="username" :title="top_password[9].name">
                  {{ top_password[9].name }}
                </div>
                <div class="zhu">
                  <div class="zhuu"></div>
                  <div
                    class="trtr"
                    :class="this.top_password_trtr == 1 ? 'zhuu10' : ''"
                  ></div>
                </div>
                <div class="zhuNumber">10</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="main-right">
        <!-- <div class="right-header">
          <div class="blue blue1" >
           
          </div>
          <div class="blue blue2">
            
          </div>
        </div> -->
        <div
          style="
            display: flex;
            justify-content: right;
            box-sizing: border-box;
            height: 60px;
            padding-right: 16px;
            padding-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dfe6ec;
          "
        >
          <el-button
            type="primary"
            icon="el-icon-download"
            @click="exportApiFn"
            style="
              font-size: 12px;
              padding: 7px 15px;
              height: 32px;
              width: 73px;
            "
          >
            <!-- <img src="@/assets/images/export@.png" alt="" /> -->
            导出</el-button
          >

          <el-button
            type="primary"
            icon="el-icon-document"
            @click="qiyeInfoFn"
            style="
              font-size: 12px;
              padding: 7px 15px;
              height: 32px;
              width: 125px;
            "
          >
            <!-- <img src="@/assets/images/jianKong.png" alt="" /> -->
            企业信息监控</el-button
          >
        </div>
        <!-- <el-row class="el-row">
          <el-col></el-col>
          <el-col class="el-col">
            <el-button
              class="refresh"
              type="primary"
              plain
              size="mini"
              icon="el-icon-refresh-right"
              @click="exportApiFn"
              >导出</el-button
            >

            <el-button
              class="export"
              type="primary"
              plain
              size="mini"
              icon="el-icon-download"
              @click="qiyeInfoFn"
              >企业信息监控</el-button
            >
          </el-col>
        </el-row> -->

        <div class="list-page" v-loading="list_page_loading">
          <!-- white -->
          <!-- <div class="foot-di"></div> -->
          <!-- <div class="white1"></div> -->
          <!-- <div class="white2"></div> -->
          <div class="list-main">
            <el-table :data="usernameListData" style="width: 100%">
              <el-table-column prop="username" label="用户名">
              </el-table-column>
              <el-table-column prop="password" label="密码"> </el-table-column>
              <el-table-column
                prop="service_name"
                label="被攻击服务"
                width="260"
              >
              </el-table-column>
              <el-table-column prop="attack_count" label="攻击次数" sortable>
              </el-table-column>
              <el-table-column prop="attack_ips" label="IP"> </el-table-column>
            </el-table>
            <!-- <div
              style="
                width: 100%;
                height: 94px;
                position: absolute;
                left: 0;
                bottom: 0;
                display: flex;
                justify-content: right;
                align-items: center;
                box-sizing: border-box;
                padding-right: 140px;
                flex-direction: row-reverse;
              "
            > -->
            <div
              style="
                width: 100%;
                height: 94px;
                display: flex;
                justify-content: right;
                align-items: center;
                box-sizing: border-box;
                padding-right: 16px;
                flex-direction: row-reverse;
              "
            >
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="9"
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
        </div>
      </div>
    </div>
    <div class="qiyeInfoBox" ref="qiyePop">
      <!-- <div @click="xxx">sfs</div> -->
      <div class="main-box" v-loading="tanchuang" ref="eject_box">
        <div class="box-header">
          <div class="text">企业信息监控</div>
          <div class="close" @click="closeFnFn">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="line"></div>
        <div class="description">
          <div class="title">功能说明：</div>
          <div class="text">
            设置企业信息监控，可对捕获到的所有账号密码进行实时检测。建议可设置为公司名称/公司缩写，或者写入员工姓名，实时监测危险登录信息。
          </div>
        </div>
        <div class="proposal">每行请写一个关键词：</div>
        <div class="mainmain">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            resize="none"
            @keyup.enter.native="enterFn"
            @change="textFnFn"
          >
          </el-input>
        </div>
        <div class="line"></div>
        <div class="button">
          <div class="button1" @click="closeFnFn">取消</div>
          <div class="button2" @click="successFn">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  passwordsKeywordScan,
  mgScanServiec,
  scanServiecData,
  accountAssets,
  putKeyword,
  exportApi,
} from "@/api/clags/drohen/username/index.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      pagBackground: true,
      arr: [],
      searchStateIP: "",
      dataValue: "",
      SelectValueKill: [],
      optionsKill: [],
      top_user: [
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
        {
          name: "暂无数据哦~",
        },
      ],
      top_password: [
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
        {
          name: "暂无数据",
        },
      ],
      top_user_trtr: 0,
      top_password_trtr: 0,
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
      usernameListData: [],
      currentPage: 1,
      total: 199,
      main_left_top: false,
      main_left_bottom: false,
      list_page_loading: false,
      start_timeUser: 0,
      end_timeUser: 0,
      marked: 0,
      cored: 0,
      bait: 0,
      markedData: 0,
      coredData: 0,
      baitData: 0,
      formInline: {
        value1: [],
        value2: "",
        value3: "",
      },
      flag1: 1,
      flag2: 1,
      flag3: 1,
      textarea: "",
      textarea2: [],
      tanchuang: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    successFn() {
      this.$refs.page_username.style.height = "";
      this.$refs.qiyePop.style.display = "none";
      this.$message({
        message: "上传成功",
        type: "success",
      });
    },
    textFnFn(e) {
      // console.log(e);
      let snsArr = e.split(/[(\r\n)\r\n]+/);
      snsArr.forEach((item, index) => {
        if (!item) {
          snsArr.splice(index, 1); //删除空项
        }
      });
      // console.log(snsArr);
      this.textarea2 = snsArr;
      this.putputFn();
    },
    enterFn() {
      // console.log(this.textarea);
      let snsArr = this.textarea.split(/[(\r\n)\r\n]+/);
      snsArr.forEach((item, index) => {
        if (!item) {
          snsArr.splice(index, 1); //删除空项
        }
      });
      // console.log(snsArr);
    },
    // -----------------------------------------------------------------------
    // 弹窗方法
    qiyeInfoFn() {
      // console.log(this);
      this.$refs.page_username.style.height = "100%";
      this.$refs.qiyePop.style.display = "block";

      // this.$refs.eject.style.display = "block";
      // this.$refs.homeHome.style.overflow = "hidden";

      setTimeout(() => {
        this.$refs.eject_box.style.top = "50%";
        this.$refs.qiyePop.style.opacity = "1";
        this.passwordsKeywordScanFn();
      }, 200);
    },
    closeFnFn() {
      this.$refs.qiyePop.style.opacity = "0";
      this.$refs.eject_box.style.top = "45%";
      this.$refs.page_username.style.height = "";
      setTimeout(() => {
        this.$refs.qiyePop.style.display = "none";
      }, 500);
    },
    activeClassFn1() {
      if (this.flag1 == 1) {
        this.flag1 = 2;
        this.markedData = 1;
        this.getDataList();
      } else {
        this.flag1 = 1;
        this.markedData = 0;
        this.getDataList();
      }
    },
    activeClassFn2() {
      if (this.flag2 == 1) {
        this.flag2 = 2;
        this.baitData = 1;
        this.getDataList();
      } else {
        this.flag2 = 1;
        this.baitData = 0;
        this.getDataList();
      }
    },
    activeClassFn3() {
      if (this.flag3 == 1) {
        this.flag3 = 2;
        this.coredData = 1;
        this.getDataList();
      } else {
        this.flag3 = 1;
        this.coredData = 0;
        this.getDataList();
      }
    },
    handleSelect(item) {
      // console.log(item);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      // this.getDataList();
      // this.top_user_trtr = 0;
      // this.top_password_trtr = 0;
      let data = {
        page_no: this.currentPage, //页数
        page_size: 9, //当前页条数
        search: this.searchStateIP, //搜索
        sort: "attack_count", //分类
        order: "", //排序
        marked: this.markedData, //标记
        cored: this.coredData,
        bait: this.baitData,
        services: this.SelectValueKill, //服务类型
        start_time: this.start_timeUser, //开始时间
        end_time: this.end_timeUser, //结束时间
      };
      // console.log(this.start_timeUser);
      // console.log(this.end_timeUser);
      this.list_page_loading = true;

      accountAssets(data)
        .then((res) => {
          // console.log(res);

          this.usernameListData = res.data.list;
          this.main_left_top = false;
          this.main_left_bottom = false;
          this.list_page_loading = false;

          this.total = res.data.total_num;
          // console.log(this.usernameListData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 模糊查询IP方法
    fuzzyqueryFnFn(e) {
      // console.log(e);
      // this.end_timeUser = Math.floor(new Date().getTime() / 1000);
      // this.start_timeUser = this.end_timeUser - 3600 * 24 * 30;
      this.end_timeUser = 0;
      this.start_timeUser = 0;
      this.searchStateIP = e;
      this.currentPage = 1;
      let data = {
        page_no: this.currentPage, //页数
        page_size: 9, //当前页条数
        search: this.searchStateIP, //搜索
        sort: "attack_count", //分类
        order: "", //排序
        marked: this.markedData, //标记
        cored: this.coredData,
        bait: this.baitData,
        services: this.SelectValueKill, //服务类型
        start_time: this.start_timeUser, //开始时间
        end_time: this.end_timeUser, //结束时间
      };
      // console.log(this.start_timeUser);
      // console.log(this.end_timeUser);
      this.list_page_loading = true;

      accountAssets(data)
        .then((res) => {
          // console.log(res);

          this.usernameListData = res.data.list;
          this.main_left_top = false;
          this.main_left_bottom = false;
          this.list_page_loading = false;

          this.total = res.data.total_num;
          // console.log(this.usernameListData);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.end_timeUser = Math.floor(new Date().getTime() / 1000);
      // this.start_timeUser = this.end_timeUser - 3600 * 24 * 7;
    },
    // 时间选择器方法
    dateUsernameFn(e) {
      this.start_timeUser = Math.floor(e[0] / 1000);
      this.end_timeUser = Math.floor(e[1] / 1000);

      this.currentPage = 1;

      // console.log(e);
      // console.log(this.start_timeUser);
      // console.log(this.end_timeUser);
      this.getDataList();
    },

    // 重置方法
    resetFn() {
      this.flag1 = 1;
      this.markedData = 0;
      this.flag2 = 1;
      this.coredData = 0;
      this.flag3 = 1;
      this.baitData = 0;
      this.currentPage = 1;
      this.searchStateIP = "";
      this.SelectValueKill = [];

      this.formInline = {
        value1: [],
        value2: "",
        value3: "",
      };
      this.end_timeUser = Math.floor(new Date().getTime() / 1000);
      this.start_timeUser = this.end_timeUser - 3600 * 24 * 30;

      this.formInline.value2 = this.getNowTime()[0];
      this.formInline.value3 = this.getNowTime()[1];

      this.getDataList();
    },

    // 蜜罐类型事件方法
    mgTypeKillFn(e) {
      this.SelectValueKill = e;
      // console.log(e);
      this.currentPage = 1;
      this.getDataList();
    },

    // axios请i取数据
    getDataList() {
      this.top_user_trtr = 0;
      this.top_password_trtr = 0;
      let data = {
        page_no: this.currentPage, //页数
        page_size: 9, //当前页条数
        search: this.searchStateIP, //搜索
        sort: "attack_count", //分类
        order: "", //排序
        marked: this.markedData, //标记
        cored: this.coredData,
        bait: this.baitData,
        services: this.SelectValueKill, //服务类型
        start_time: this.start_timeUser, //开始时间
        end_time: this.end_timeUser, //结束时间
      };
      // console.log(this.start_timeUser);
      // console.log(this.end_timeUser);
      this.main_left_top = true;
      this.main_left_bottom = true;
      this.list_page_loading = true;

      accountAssets(data)
        .then((res) => {
          // console.log(res);
          for (let i = 0; i < res.data.top_user.length; i++) {
            this.top_user[i].name = res.data.top_user[i].name;
          }
          for (let j = 0; j < res.data.top_pass.length; j++) {
            this.top_password[j].name = res.data.top_pass[j].name;
          }

          // if (res.data.top_user.length == 2) {
          //   this.$refs.mainOne.style.height = "70px";
          // }
          // console.log(res.data.top_user.length);
          // console.log(res.data.top_pass.length);
          let user_h = res.data.top_user.length * 35.5 + "px";
          // console.log(typeof ooo);
          this.$refs.mainOne.style.height = user_h;
          let password_h = res.data.top_pass.length * 27 + "px";
          this.$refs.mainTwo.style.height = password_h;
          this.top_user_trtr = 1;
          this.top_password_trtr = 1;

          this.usernameListData = res.data.list;
          this.main_left_top = false;
          this.main_left_bottom = false;
          this.list_page_loading = false;

          this.total = res.data.total_num;
          // console.log(this.usernameListData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // -----------------------------------------------------------------------
    passwordsKeywordScanFn() {
      this.tanchuang = true;
      passwordsKeywordScan()
        .then((res) => {
          // console.log(res, 909090);
          let arr = "";
          let textareaArr = res.data.map((item) => {
            item += "\n";
            // console.log(item);
            arr += item;
          });

          this.textarea = arr;
          // console.log(this.textarea);
          this.tanchuang = this.false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKillServiecData() {
      mgScanServiec()
        .then((res) => {
          // console.log(res, 99999999);
          this.optionsKill = res.data;
          // this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scanServiecDataFn() {
      scanServiecData()
        .then((res) => {
          // console.log(res);
          this.marked = res.data.marked;
          this.cored = res.data.cored;
          this.bait = res.data.bait;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putputFn() {
      let data = {
        keywords: this.textarea2, //关键字
      };

      putKeyword(data)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exportApiFn() {
      let exportData = {
        page_no: 1, //页数
        page_size: 10, //当前页条数
        search: "", //搜索
        sort: "attack_count", //分类
        order: "", //排序
        marked: 0, //标记
        cored: 0,
        bait: 0,
        services: [], //服务类型
        start_time: 1647792000, //开始时间
        end_time: 1650383999, //结束时间
      };
      exportApi(exportData)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //初始默认执行(重点)
    // getNowTime() {
    //   const start = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
    //     .toISOString()
    //     .replace("T", " ")
    //     .split(".")[0]; //默认开始时间7天前
    //   const end = new Date(new Date().getTime() - 3600 * 1000 * 24)
    //     .toISOString()
    //     .replace("T", " ")
    //     .split(".")[0]; //默认结束时间1天前
    //   console.log([start, end]);
    //   return [start, end];
    // },
    getNowTime() {
      const start = new Date(new Date().getTime() - 3600 * 1000 * 24 * 30)
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
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.formInline.value2 = this.getNowTime()[0];
    this.formInline.value3 = this.getNowTime()[1];
  },
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.end_timeUser = Math.floor(new Date().getTime() / 1000);
    this.start_timeUser = this.end_timeUser - 3600 * 24 * 30;

    // this.passwordsKeywordScanFn();
    this.scanServiecDataFn();
    this.getKillServiecData();
    this.getDataList();
    // this.putputFn();

    // console.log(this.$refs);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
* {
  list-style-type: none;
  ul {
    padding: 0;
  }
}
.page-username {
  width: 100%;
  // height: 100%;
  overflow: hidden;
  .qiyeInfoBox {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
    transition: 0.5s;
    opacity: 0;
    .main-box {
      width: 620px;
      height: 501px;
      background: #ffffff;
      border-radius: 5px;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: 0.5s;
      .box-header {
        width: 100%;
        height: 59px;
        box-sizing: border-box;
        padding: 0 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .close {
          width: 24px;
          height: 24px;
          font-size: 20px;
          // background: #000000;
          cursor: pointer;
        }
      }
      .line {
        width: 620px;
        height: 1px;
        background: #eeeeee;
      }
      .description {
        width: calc(100% - 50px);
        height: 59px;
        box-sizing: border-box;
        margin: 20px auto 0px;
        display: flex;
        .title {
          width: 70px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #016cff;
          line-height: 20px;
        }
        .text {
          width: 500px;
          height: 40px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #016cff;
          line-height: 20px;
        }
      }
      .proposal {
        width: calc(100% - 50px);
        margin: 0 auto 20px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
        box-sizing: border-box;
      }
      .mainmain {
        width: 570px;
        height: 213px;
        border-radius: 5px;
        // border: 1px solid #e2dfdf;
        margin: 0 auto 35px;
        ::v-deep .el-textarea,
        .el-input--medium {
          width: 100%;
          height: 100%;
          .el-textarea__inner {
            width: 100%;
            height: 100%;
          }
        }
      }
      .button {
        width: 100%;
        height: 76px;
        display: flex;
        justify-content: right;
        align-items: center;
        .button1 {
          width: 62px;
          height: 36px;
          background: #ffffff;
          border-radius: 2px;
          border: 1px solid #dddddd;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30px;
          cursor: pointer;
        }
        .button2 {
          width: 62px;
          height: 36px;
          background: #016cff;
          border-radius: 2px;
          color: #fff !important;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 25px;
          cursor: pointer;
        }
      }
    }
  }
  // .foot-di {
  //   width: 100%;
  //   height: 10px;
  //   background-color: #ffffff;
  //   position: absolute;
  //   left: 0;
  //   bottom: -2px;
  // }
  margin: 0px;
  padding: 0px 0px 37px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
  .page-input {
    ::v-deep .el-date-editor .el-range-separator {
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
      width: 34.5%;
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
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      margin-right: 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
      border-radius: 4px;
    }
    .shixianSHUJU {
      width: 135px;
      height: 40px;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      margin-right: 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
      border-radius: 4px;
    }
    .qiyexinxi {
      width: 163px;
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
    height: 100px;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    background: #fff;
    border-radius: 2px;
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
      margin-left: 20px;
      cursor: pointer;
    }
    .el-col,
    .el-col-12 {
      width: 240px;
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
  .page-main {
    // max-width: 1680px;
    // width: 1420px;
    width: calc(100% - 100px);
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    // width: 100%;
    height: 760px;
    margin: 0 auto;
    display: flex;
    justify-content: start;
    .main-left {
      border-radius: 4px;
      max-width: 425px;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      .header {
        width: 6px;
        height: 18px;
        // background: #005bbf;
        position: absolute;
        top: 20px;
        left: 0;
        // display: none;
        img {
          width: 12px;
        }
      }
      // .header-2 {
      //   position: absolute;
      //   top: 20px;
      //   left: 6px;
      //   border-right: 9px solid transparent;
      //   border-left: 9px solid #005bbf;
      //   border-top: 9px solid transparent;
      //   border-bottom: 9px solid transparent;
      // }
      .header-title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .main-left-top {
        height: 412px;
        background-color: #fff;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        .main {
          margin-top: 20px;
          width: 100%;
          overflow: hidden;
          > ul {
            > li {
              width: 100%;
              height: 20px;
              margin-bottom: 14px;
              display: flex;
              align-items: center;
              .zhu {
                width: 157px;
                height: 16px;
                position: relative;
                // background-color: #fff;
              }
              .trtr {
                width: 0px;
                transition: 1s;
                -moz-transition: 1s; /* Firefox 4 */
                -webkit-transition: 1s; /* Safari 和 Chrome */
                -o-transition: 1s; /* Opera */
              }
              .zhuu {
                width: 157px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #0f87fa 100%);
                border-radius: 0px 100px 100px 0px;
                opacity: 0.1;
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu1 {
                width: 157px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu2 {
                width: 145px;
                height: 16px;
                background: linear-gradient(
                  270deg,
                  rgba(0, 192, 254, 0.98) 0%,
                  #005bbf 100%
                );
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu3 {
                width: 135px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu4 {
                width: 127px;
                height: 16px;
                background: linear-gradient(
                  270deg,
                  rgba(0, 192, 254, 0.99) 0%,
                  #005bbf 100%
                );
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu5 {
                width: 123px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu6 {
                width: 117px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu7 {
                width: 111px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu8 {
                width: 102px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu9 {
                width: 98px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu10 {
                width: 91px;
                height: 16px;
                background: linear-gradient(270deg, #00c0fe 0%, #005bbf 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuNumber {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                -webkit-background-clip: text;
                // -webkit-text-fill-color: transparent;
                margin-left: 20px;
              }
              .username {
                width: 70px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-left: 8px;
                margin-right: 35px;
                z-index: 8;
                word-break: break-all;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: default;
              }
              .ranking {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                font-size: 12px;
                font-family: DIN-BoldAlternate, DIN;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
                line-height: 20px;
              }
              .ranking1 {
                background: linear-gradient(360deg, #b620e0 0%, #f7b500 100%);
              }
              .ranking2 {
                background: linear-gradient(180deg, #fedb65 0%, #ff8b31 100%);
              }
              .ranking3 {
                background: linear-gradient(180deg, #00d0f2 0%, #0933d1 100%);
              }
              .rankingA {
                box-sizing: border-box;
                border: 2px solid #005bbf;
                background: #ffffff;
                color: #005bbf !important;
                line-height: 16px !important;
              }
            }
          }
        }
      }
      .main-left-bottom {
        flex: 1;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
        padding-bottom: 0px !important;
        position: relative;
        .main {
          margin-top: 20px;
          width: 100%;
          overflow: hidden;
          > ul {
            > li {
              width: 100%;
              height: 12px;
              margin-bottom: 14px;
              display: flex;
              align-items: center;
              position: relative;
              .trtr {
                width: 0px;
                transition: 1s;
                -moz-transition: 1s; /* Firefox 4 */
                -webkit-transition: 1s; /* Safari 和 Chrome */
                -o-transition: 1s; /* Opera */
              }
              .zhu {
                width: 157px;
                height: 16px;
                position: relative;
                // background-color: #fff;
              }
              .zhuu {
                width: 243px;
                height: 12px;
                background: linear-gradient(270deg, #00c0fe 0%, #0f87fa 100%);
                border-radius: 0px 100px 100px 0px;
                opacity: 0.1;
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu1 {
                width: 243px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu2 {
                width: 213px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);

                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu3 {
                width: 189px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu4 {
                width: 169px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu5 {
                width: 154px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu6 {
                width: 134px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu7 {
                width: 110px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu8 {
                width: 89px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu9 {
                width: 76px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuu10 {
                width: 59px;
                height: 12px;
                background: linear-gradient(90deg, #005bbf 0%, #00c0fe 100%);
                border-radius: 0px 100px 100px 0px;
                position: absolute;
                top: 0;
                left: 0;
              }
              .zhuNumber {
                width: 12px;
                height: 14px;
                font-size: 10px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #ffffff;
                line-height: 12px;
                position: absolute;
                top: 50%;
                left: 85px;
                transform: translateY(-50%);
                z-index: 2;
              }
              .username {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                width: 60px;
                margin-right: 10px;
                text-align: right;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: default;
              }
              .ranking {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                font-size: 12px;
                font-family: DIN-BoldAlternate, DIN;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
    .main-right {
      border-radius: 4px;
      // width: 1124px;
      max-width: 100%;
      flex: 1;
      height: 760px;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      .right-header {
        // width: 100%;
        height: 60px;
        display: flex;
        justify-content: right;
        align-items: center;
        .blue {
          color: #ffffff;
          background: #016cff;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s;
          cursor: pointer;
          border-radius: 10px;
        }
        .blue:hover {
          opacity: 0.6;
        }
        .blue1 {
          width: 69px;
          height: 32px;
          border-radius: 2px;
          margin-right: 30px;
          img {
            margin-right: 4px;
            margin-top: 2px;
          }
        }
        .blue2 {
          width: 123px;
          height: 32px;
          border-radius: 2px;
          margin-right: 48px;
          img {
            margin-right: 2px;
            margin-top: 2px;
          }
        }
      }
      .list-page {
        // max-width: 100%;
        .white1,
        .white2 {
          width: 15px;
          height: 91.3%;
          background-color: #ffffff;
          position: absolute;
          z-index: 99;
          bottom: 0;
        }
        .white1 {
          left: 0;
        }
        .white2 {
          right: 0;
        }
        // height: 696px;
        background: #ffffff;
        border-radius: 2px;
        // border: 1px solid rgba(0, 0, 0, 0.15);
        margin: 0px auto;
        box-sizing: border-box;
        position: relative;
        // tab列表切换
        .tabtype {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: rgba(115, 199, 56, 0.35);
          vertical-align: middle;
          margin-right: 2px;
        }
        // stop
        .list-header {
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: right;
          align-items: center;
          > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .export {
            margin-left: 20px;
            margin-right: 60px;
            border: 1px solid #016cff;
            width: 69px;
            height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 20px;
            background-color: #016cff;
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
          // 列表插入的i标签
          .elelelW {
            width: 14px;
            height: 14px;
            background: rgba(115, 199, 56, 0.35);
            border-radius: 50%;
            vertical-align: middle;
            display: inline-block;
            position: relative;
          }
          .elelelN {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #73c738;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .elelelREDW {
            background: rgba(230, 67, 31, 0.35) !important;
          }
          .elelelREDN {
            background-color: #e6431f !important;
          }
          // 跳至板块间距
          .el-pagination {
            margin-bottom: 20px;
            ::v-deep .el-pagination__jump {
              margin-left: 0px;
            }
          }
          .total {
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #777777;
            line-height: 17px;
            span {
              color: #016cff;
            }
          }
          width: 100%;
          height: 100%;
          background: #ffffff;
          border-radius: 2px;
          position: relative;
          box-sizing: border-box;
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
          }

          ::v-deep.el-pagination > button {
            padding: 0 !important;
            width: 34px !important;
            height: 34px !important;
          }

          ::v-deep .el-pagination span {
            color: #646566;
            width: 50px;
            width: 34px !important;
            height: 34px !important;
            line-height: 34px !important;
            box-sizing: border-box;
          }

          ::v-deep .el-pagination .el-pager .number,
          .el-icon.more.el-icon-more {
            color: #646566 !important;
            border: 1px solid #eaeaea;
            width: 34px !important;
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
          ::v-deep .el-table__row {
            .el-table_1_column_1 {
              > div {
                position: relative;
              }
            }
          }
        }
      }
    }
  }
}
</style>