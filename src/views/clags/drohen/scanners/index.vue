<!--  -->
<template>
  <div class="page-scanners">
    <header-navigation :submenuArr="arr"></header-navigation>
    <el-card>
      <div class="page-input">
        <el-input
          placeholder="模糊查询IP"
          v-model="searchState"
          clearable
          @change="fuzzyqueryFn"
          prefix-icon="el-icon-search"
        >
        </el-input>
        <!-- 时间选择框 -->
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
        <!-- 下拉选择框 -->
        <el-select
          v-model="SelectValueJD"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="节点选择"
          @change="selectJDfn"
        >
          <el-option
            v-for="item in options2"
            :key="item.client_id"
            :label="item.client_name"
            :value="item.client_id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="scanValue"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="扫描类型"
          @change="scanTypeFn"
        >
          <el-option
            v-for="item in options"
            :key="item.index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <!-- 旧数据 -->
        <!-- <div class="data-length">
          <el-input v-model="inputNumber" placeholder="扫描持续时间" @focus="inputNumberFocus" @change="inputNumberBlur" @input="inputNumberInput"></el-input>

          <div class="data-length-select" v-show="inputNumberShow">
            <el-select v-model="SelectValue4" placeholder="请先选择范围" @visible-change="inputNumberShowFn" @change="inputNumberShowFn2">
              <el-option v-for="item in options4" :key="item.SelectValue4" :label="item.label" :value="item.SelectValue4"> </el-option>
            </el-select>
          </div>
        </div> -->
        <!-- 新数据 -->
        <div class="SELECT">
          <el-input
            placeholder="被扫描端口"
            @focus="inputNumberFocus"
            @change="inputNumberBlur"
            @input="inputNumberInput"
            v-model="inputNumber"
            clearable
          >
            <el-select
              style="width: 55px"
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

        <!-- <div class="data-length">
          <el-input v-model="inputNumber2" placeholder="被扫描端口" @focus="inputNumberFocus2" @change="inputNumberBlur2" @input="inputNumberInput2"></el-input>
          <div class="data-length-select" v-show="inputNumberShow2">
            <el-select v-model="SelectValue4_" placeholder="请先选择范围" @visible-change="inputNumberShowFn3" @change="inputNumberShowFn33">
              <el-option v-for="item in options4_" :key="item.SelectValue4_" :label="item.label" :value="item.SelectValue4_"> </el-option>
            </el-select>
          </div>
        </div> -->

        <div class="SELECT">
          <el-input
            placeholder="扫描时间长度"
            @focus="inputNumberFocus2"
            @change="inputNumberBlur2"
            @input="inputNumberInput2"
            v-model="inputNumber2"
            clearable
          >
            <el-select
              style="width: 55px"
              v-model="SelectValue4_"
              placeholder=""
              slot="prepend"
              @visible-change="inputNumberShowFn"
              @change="inputNumberShowFn33"
            >
              <el-option
                v-for="item in options4_"
                :key="item.SelectValue4_"
                :label="item.label"
                :value="item.SelectValue4_"
              >
              </el-option>
            </el-select>
          </el-input>
        </div>

        <!-- <div class="reset" @click="resetFn">重置</div> -->
        <el-button
          @click="resetFn"
          icon="el-icon-refresh"
          style="height: 36.8px"
          >重置</el-button
        >
      </div>
    </el-card>
    <el-card>
      <div class="page-list">
        <!-- 列表头部 -->
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
        <el-row class="el-row">
          <el-col></el-col>
          <el-col class="el-col">
            <el-button
              class="refresh"
              type="primary"
              icon="el-icon-refresh-right"
              @click="refreshFn"
              >刷新</el-button
            >

            <el-button class="export" type="primary" icon="el-icon-download"
              >导出</el-button
            >
          </el-col>
        </el-row>
        <!-- 列表主体 -->
        <div class="list-main" v-loading="loadingData">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="source_ip"
              label="扫描IP"
              width="200"
              align="left"
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
                {{ scope.row.source_ip }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="威胁情报" align="center">
            </el-table-column>
            <el-table-column
              prop="client_name"
              label="被扫描节点"
              width="160"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="dest_ip" label="被扫描IP" align="center">
            </el-table-column>
            <el-table-column prop="scan_type" label="扫描类型" align="center">
            </el-table-column>
            <!-- <el-table-column prop="dest_port" label="被扫描端口" width="160"> </el-table-column> -->
            <el-table-column
              prop="location"
              label="节点位置"
              width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="扫描开始时间"
              sortable
              width="200"
              :formatter="dateFormat3"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="update_time"
              label="扫描持续时间"
              sortable
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.update_time }}s
              </template>
            </el-table-column>
          </el-table>

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
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  queryProtocolType,
  queryNodeInfos,
  scanQueryFn,
  signKillFromApi,
} from "@/api/clags/drohen/scanners/index.js";
import moment from "moment";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: "aaa",
  data() {
    //这里存放数据
    return {
      // 每页多少条
      page_size: 10,
      // 当前页
      currentPage1: 1,
      // 总条数
      total: 99,
      arr: [
        { name: "攻击列表" },
        { name: "扫描感知" },
        { name: "攻击来源" },
        { name: "账号资产" },
        { name: "失陷感知" },
      ],
      options: [],
      options2: [],
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
      options4_: [
        {
          SelectValue4_: ">",
          label: ">",
        },
        {
          SelectValue4_: "<",
          label: "<",
        },
        {
          SelectValue4_: ">=",
          label: ">=",
        },
        {
          SelectValue4_: "<=",
          label: "<=",
        },
      ],
      options5: [],
      tableData: [],
      searchState: "",
      scanValue: [],
      dataValue: "",
      SelectValueJD: [],
      SelectValueDK: "",

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
      formInline: {
        value1: [],
        value2: "",
        value3: "",
      },
      loadingData: false,
      dateValue: "",
      inputNumber: "",
      inputNumberShow: false,
      inputNumberNumber: 0,
      portCond: "",
      SelectValue4: "",
      twoFlag: false,

      inputNumber2: "",
      inputNumberShow2: false,
      inputNumberNumber2: 0,
      portCond2: "",
      SelectValue4_: "",
      twoFlag2: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 标记方法
    signKillFromApiFn(row) {
      this.loadingData = true;
      // console.log(row);
      if (row.marked == 0) {
        let data = {
          marked: 1, //0:不标记  1：标记
          ip: row.source_ip,
        };
        signKillFromApi(data)
          .then((res) => {
            // console.log(res, 99999999);
            if (res.code == 200) {
              this.getDataFnPost();
              // this.mgSceneData();
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
          ip: row.source_ip,
        };
        signKillFromApi(data)
          .then((res) => {
            this.getDataFnPost();
            // this.mgSceneData();
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
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page_size = val;
      this.getDataFnPost();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage1 = val;
      this.getDataFnPost();
    },
    // handleSelect(item) {
    //   console.log(item)
    // },
    // 重置方法
    resetFn() {
      this.SelectValue4 = "";
      this.SelectValue4_ = "";
      this.inputNumber2 = "";
      this.inputNumber = "";
      this.searchState = "";
      this.SelectValueJD = [];
      this.currentPage1 = 1;
      this.scanValue = [];
      this.portCond = "";
      this.portCond2 = "";
      this.inputNumberNumber = 0;
      this.inputNumberNumber2 = 0;
      this.inputNumberShow = false;
      this.inputNumberShow2 = false;
      this.formInline = {
        value1: [],
        value2: "",
        value3: "",
      };
      this.formInline.value2 = this.getNowTime()[0];
      this.formInline.value3 = this.getNowTime()[1];

      this.end_time1 = Math.floor(new Date().getTime() / 1000);
      this.start_time1 = this.end_time1 - 3600 * 24 * 7;
      this.getDataFnPost();
    },
    // 模糊查询IP方法
    fuzzyqueryFn(e) {
      // console.log(e);
      this.searchState = e;
      this.start_time1 = 0;
      this.end_time1 = 0;
      this.getDataFnPost();
    },
    // 范围时间方法
    dateFn(e) {
      this.start_time1 = Math.floor(e[0] / 1000);
      this.end_time1 = Math.floor(e[1] / 1000);

      this.currentPage1 = 1;

      // console.log(e);
      // console.log(this.start_time1);
      // console.log(this.end_time1);
      this.getDataFnPost();
    },

    // 节点选择方法
    selectJDfn(e) {
      // console.log(e);
      this.SelectValueJD = e;
      this.currentPage1 = 1;
      this.getDataFnPost();
    },
    // 扫描类型方法
    scanTypeFn(e) {
      this.scanValue = e;
      // console.log(e);
      this.currentPage1 = 1;
      this.getDataFnPost();
    },

    // 端口长度方法------------------------------------------------------------------------
    inputNumberFocus() {
      this.inputNumberShow = true;
    },
    inputNumberBlur(e) {
      // console.log(e);
      // 长度数据
      this.inputNumberNumber2 = Number(e);
      if (this.inputNumberNumber2 == 0) {
        this.portCond2 = "";
      }

      // console.log(typeof this.inputNumber);
      // this.numtransferStation = e;

      // // 大于号

      // if (this.twoFlag) {
      //   this.portCond = this.numtransferStation.substr(0, 2);
      //   // this.twoFlag = false;
      // } else {
      //   this.portCond = this.numtransferStation.substr(0, 1);
      // }
      // console.log(this.portCond);

      // this.inputNumberNumber = this.numtransferStation.match(/\d+(.\d+)?/g); // arr: ["2.75","3.65"]
      // // console.log(this.inputNumber);

      // // 范围数字
      // this.inputNumberNumber = Number(this.inputNumberNumber);
      // console.log(this.inputNumberNumber);

      // if (
      //   this.portCond == ">" ||
      //   this.portCond == "<" ||
      //   this.portCond == "<=" ||
      //   this.portCond == ">="
      // ) {
      //   console.log(222222);
      // } else {
      //   this.portCond = "";
      //   this.inputNumber = "";
      //   this.inputNumberNumber = 0;
      //   console.log(111111);
      // }

      this.currentPage1 = 1;
      this.getDataFnPost();
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
      this.portCond2 = e;
      if (this.inputNumber != "") {
        this.getDataFnPost();
      }
      // this.inputNumber = e;
      // if (e == "<=" || e == ">=") {
      //   this.twoFlag = true;
      // } else {
      //   this.twoFlag = false;
      // }
    },

    // 时间长度方法---------------------------------------------------------------------
    inputNumberFocus2() {
      this.inputNumberShow2 = true;
    },
    inputNumberBlur2(e) {
      // 长度数据
      // console.log(e);
      this.inputNumberNumber = Number(e);
      if (this.inputNumberNumber == 0) {
        this.portCond = "";
      }

      // // 大于号
      // if (this.twoFlag2) {
      //   this.portCond2 = this.inputNumber2.substr(0, 2);
      //   // this.twoFlag2 = false;
      // } else {
      //   this.portCond2 = this.inputNumber2.substr(0, 1);
      // }
      // console.log(this.portCond2);

      // this.inputNumberNumber2 = this.inputNumber2.match(/\d+(.\d+)?/g); // arr: ["2.75","3.65"]
      // // console.log(this.inputNumber2);

      // // 范围数字
      // this.inputNumberNumber2 = Number(this.inputNumberNumber2);
      // console.log(this.inputNumberNumber2);

      // if (
      //   this.portCond2 == ">" ||
      //   this.portCond2 == "<" ||
      //   this.portCond2 == "<=" ||
      //   this.portCond2 == ">="
      // ) {
      //   console.log(222222);
      // } else {
      //   this.portCond2 = "";
      //   this.inputNumber2 = "";
      //   this.inputNumberNumber2 = 0;
      //   console.log(111111);
      // }

      // this.currentPage1 = 1;
      this.getDataFnPost();
    },
    inputNumberInput2() {
      if (this.inputNumber2) {
        this.inputNumberShow2 = false;
      }
    },
    inputNumberShowFn3(e) {
      if (e == false) {
        this.inputNumberShow2 = !this.inputNumberShow2;
      }
    },
    inputNumberShowFn33(e) {
      // console.log(e);
      this.portCond = e;
      if (this.inputNumber2 != "") {
        this.getDataFnPost();
      }
      // this.inputNumber2 = e;
      // if (e == "<=" || e == ">=") {
      //   this.twoFlag2 = true;
      // } else {
      //   this.twoFlag2 = false;
      // }
    },
    // 列表时间格式化方法
    dateFormat3: function (row, column, data) {
      return moment.unix(data).format("YYYY/MM/DD HH:mm:ss");
    },
    // 刷新方法
    refreshFn() {
      this.getDataFnPost();
    },

    // ---------------------------------------------------------------------------------
    // axios请求数据
    getDataFn() {
      queryProtocolType()
        .then((res) => {
          this.options = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      queryNodeInfos()
        .then((res) => {
          this.options2 = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataFnPost() {
      this.loadingData = true;
      let data = {
        page_no: this.currentPage1, //页数
        page_size: this.page_size, //当前页条数
        search: this.searchState, //搜索
        sort: "", //分类
        order: "desc", //排序
        client_ids: this.SelectValueJD, //客户端
        port_cond: this.portCond2, //端口取值范围
        scan_port: this.inputNumberNumber2, //端口范围值
        time_cond: this.portCond, //扫描时间取值范围
        scan_time: this.inputNumberNumber, //扫描时间范围值
        start_time: this.start_time1, //开始时间
        end_time: this.end_time1, //结束时间
        scan_types: this.scanValue, //协议类型
      };
      // 请求回来的数据
      scanQueryFn(data)
        .then((res) => {
          // console.log(res);
          this.tableData = res.data.scanners;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].update_time =
              this.tableData[i].update_time - this.tableData[i].create_time;
          }
          this.total = res.data.total_num;
          this.loadingData = false;
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
  },
  created() {
    this.formInline.value2 = this.getNowTime()[0];
    this.formInline.value3 = this.getNowTime()[1];
  },
  mounted() {
    document.getElementsByClassName(
      "el-pagination__jump"
    )[0].childNodes[0].nodeValue = "跳至";

    this.end_time1 = Math.floor(new Date().getTime() / 1000);
    this.start_time1 = this.end_time1 - 3600 * 24 * 7;

    this.getDataFnPost();
    this.getDataFn();
  },
};
</script>
<style lang="scss" scoped>
.SELECTaaa {
  width: 55px;
}
.el-row {
  display: flex;
  flex: 1;
}
.el-col {
  display: flex;
  // margin-left: 450px;
  justify-content: right;
  margin-right: 10px;
}
// .el-card {
//   margin: 5px;
// }
.el-card {
  width: calc(100% - 100px);
  margin: 25px auto;
}
.el-button {
  margin: 10px;
  height: 32px;
  width: 73px;
  // text-align: center;
  padding: 7px 15px;
  font-size: 12px;
}
.page-scanners {
  ::v-deep .el-card__body {
    padding: 0;
  }
  margin: 0px;
  padding: 0px !important;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
  .page-input {
    ::v-deep .el-input {
      .el-input__inner {
        width: 150px !important;
      }
    }

    ::v-deep .el-input-group__prepend {
      .el-select {
        .el-input {
          .el-input__inner {
            width: 120% !important;
          }
          .el-input__suffix {
            right: 0px;
          }
        }
      }
    }
    ::v-deep .el-input__inner,
    ::v-deep .el-date-editor .el-range-input {
      width: 72px;
      color: #777;
    }
    ::v-deep .el-range-separator {
      padding-right: 10px;
      line-height: 32px;
    }
    ::v-deep .el-range-editor--medium .el-range__icon,
    .el-range-editor--medium .el-range__close-icon {
      line-height: 32px;
    }
    ::v-deep .el-input--medium .el-input__icon {
      line-height: 40px;
    }
    .data-length {
      width: 220px;
      height: 40px;
      // margin-right: 10px;
      margin-right: 5px;

      box-sizing: border-box;
      display: inline-block;
      // margin-right: 30px;
      // background-color: #0044a4;
      position: relative;
      ::v-deep .data-length-select {
        width: 160px;
        height: 40px;
        // background-color: #0044a4;
        position: absolute;
        left: 0;
        bottom: -40px;
        .el-range-editor--medium.el-input__inner {
          width: 100px !important;
          height: 40px;
        }

        > .el-select,
        .el-select--medium {
          > div {
            > .el-input__inner {
              width: 160px;
            }
          }
        }
      }
    }
    ::v-deep .el-input--medium .el-input__inner {
      width: 100%;
      height: 40px;
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
    // max-width: 1680px;
    height: 100px;
    background: #ffffff;
    border-radius: 2px;
    margin: 0px auto;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .reset {
      min-width: 32px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #016cff;
      display: inline-block;
      white-space: nowrap;
      cursor: pointer;
      //   margin-left: 20px;
    }
    .el-col,
    .el-col-12 {
      width: 300px;
      height: 40px;
      // margin-right: 30px;
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
      // width: 240px;
      width: 160px;
      height: 40px;
      // color: red;
    }
    .el-select {
      // margin-right: 10px;
      margin-right: 5px;
    }
    .el-range-editor--medium.el-input__inner {
      width: 240px;
      // width: 360px;
      height: 40px;
      margin: 5px;
    }
    .el-input,
    .el-input--medium {
      // width: 240px;
      width: 150px;
      margin-left: 5px;
      // color: pink;
      // margin-right: 30px;
    }
  }
  ::v-deep .el-range-editor--medium .el-range__icon,
  .el-range-editor--medium .el-range__close-icon {
    line-height: 32px;
  }
  ::v-deep .el-input__inner,
  ::v-deep .el-date-editor .el-range-input {
    width: 80px;
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
  .page-list {
    .scanIPIP {
      display: inline-block;
      width: 18px;
      height: 18px;
      vertical-align: middle;
      img {
        width: 100%;
      }
      // background-color: blue;
    }
    // max-width: 1680px;
    height: 741px;
    height: auto;
    background: #ffffff;
    border-radius: 2px;
    // border: 1px solid rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    // margin-top: -1px;
    // margin-left: -1px;;
    .el-pagination {
      // position: absolute;
      // left: 65%;
      // bottom: 20px;
      ::v-deep .el-pagination__jump {
        margin-left: 0px;
      }
    }
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
      .refresh {
        // margin-left: 90px;
        width: 69px;
        height: 32px;
        font-size: 14px;
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
          line-height: 20px;
          text-align: center;
        }
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
      ::v-deep
        .el-table--enable-row-hover
        .el-table__body
        tr:hover
        > .el-table_1_column_1 {
        color: #eb7d41 !important;
        &:hover .scanIPIP {
          // background-color: #eb7d41 !important;
        }
      }

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
      width: 100%;
      height: auto;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 2px;
      // border: 1px solid rgba(0, 0, 0, 0.15);
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
              // padding-left: 24px;
              // text-align: center;
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
            text-align: center;
            box-sizing: border-box;
            padding: 0 25px;
          }
        }
      }
      ::v-deep .el-table__row {
        td {
          height: 60px !important;
          // text-align: center;
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
}
</style>