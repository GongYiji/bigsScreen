<template>
  <div class="decoyData">
    <div class="data-serach">
      <el-form :inline="true" :model="queryParams" ref="queryParams" class="demo-form-inline">
        <el-form-item prop="search">
          <el-input v-model="queryParams.search" placeholder="模糊搜索蜜饵名称" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item prop="value1">
         <!-- <el-date-picker type="datetimerange" :picker-options="pickerOptions" v-model="queryParams.value1"
          range-separator="至" :start-placeholder="queryParams.start_time"
            :end-placeholder="queryParams.end_time"> -->
           <el-date-picker
              v-model="queryParams.value1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              :start-placeholder="queryParams.start_time"
              :end-placeholder="queryParams.end_time"
              clear-icon
              @change="dateUsernameFn"
              value-format="timestamp"
              :picker-options="pickerOptions"
              style="width: 228px;"
            >
            </el-date-picker>
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="fall">
          <el-select v-model="queryParams.fall" placeholder="失陷状态">
            <el-option label="未触发" value="0"></el-option>
            <el-option label="已触发" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="handle_status">
          <el-select v-model="queryParams.handle_status" placeholder="处理状态">
            <el-option label="已处理" value="1"></el-option>
            <el-option label="未处理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
         <el-button @click="handleQuery" icon="el-icon-search">搜索</el-button>
         <el-button @click="resetQuery('queryParams')" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据查询结束 -->
    <div class="data-table">
      <div class="data-export">
        <!-- <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button> -->
        <el-button
            type="primary"
            icon="el-icon-download"
             style="font-size: 12px; padding: 7px 15px; height: 32px; width: 80px"
          >
            导出</el-button
          >
      </div>
      <el-table :data="tableData" v-loading="loading" height="360" style="width: 100%;border:1px solid #f0f0f0">
        <el-table-column prop="fall" label="失陷状态" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.fall == 1">
              <img src="@/assets/images/red.png" class="img">
              <span>已触发</span>
            </div>
            <div v-else>
              <img src="@/assets/images/green.png" class="img">
              <span>未触发</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="device_ip" label="布防设备">
        </el-table-column>
        <el-table-column prop="source_ip" label="攻击来源IP">
          <template slot-scope="scope">
            <div v-if="scope.row.source_ip == 0">
              <span>- -</span>
            </div>
            <div v-else>
              <span>{{scope.row.source_ip}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fall_time" label="失陷时间" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.fall_time == 0">
              <span>- -</span>
            </div>
            <div v-else>
              <span>{{scope.row.fall_time}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="service" label="处置结果">
          <template slot-scope="scope">
            <div v-if="scope.row.service == ''">
              <span>- -</span>
            </div>
            <div v-else>
              <span>{{scope.row.service}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bait_name" label="布防蜜饵" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="布防时间">
          <template slot-scope="scope">
            <div v-if="scope.row.create_time == 0">
              <span>- -</span>
            </div>
            <div v-else>
              <span>{{timestampToTime(scope.row.create_time)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="client_name" label="蜜罐节点">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="删除" placement="right">
              <i class="el-icon-delete" style="margin-right: 20px;" @click="fnRemoveTemp(scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格数据结束 -->
    <div class="block">
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
        @pagination="getDecoyData" />
    </div>
    <!-- 分页管理结束 -->
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
  deleteDecoyData,
} from "@/api/clags/drohen/decoy.js";
export default {
  data() {
    return {
      total: 0, // 总条数
      tableData: [], //表格数据
      loading: false, //请求刷新
      form: {
        user: "",
        region: "",
        timeValue: [new Date(2022, 4, 24, 0, 0), new Date(2022, 5, 23, 23, 59)],
      },
      // 查询数据数据
      queryParams: {
        page_no: 1, //第一页
        page_size: 10, //一页10条
        start_time: "", //开始时间
        end_time: "", //结束时间
        search: undefined,
        handle_status: undefined,
        fall: undefined,
        value1: [],
      },
      // 时间框
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
    };
  },
  methods: {
    // 时间选择器方法
    dateUsernameFn(e) {
      this.start_time = Math.floor(e[0] / 1000);
      this.end_time = Math.floor(e[1] / 1000);
      // console.log(e);
      this.getDecoyData();
    },
    /**删除节点 */
    fnRemoveTemp(row) {
      let data = {
        id: row.id,
      };
      // console.log(row);
      this.$modal
        .confirm("是否确认删除")
        .then(function () {
          return deleteDecoyData(data);
        })
        .then(() => {
          this.getDecoyData();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
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
    // 表格数据
    getDecoyData() {
      var data = {
        page_no: this.queryParams.page_no, //页数
        page_size: this.queryParams.page_size, //条数
        search: this.queryParams.search, //搜索框
        handle_status: this.queryParams.handle_status,
        fall: this.queryParams.fall,
        start_time: this.queryParams.start_time,
        end_time: this.queryParams.end_time,
      };
      this.loading = true;
      getDecoyData(data).then((res) => {
        // console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total_num;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page_no = 1;
      this.getDecoyData();
    },
    // 重置按钮
    resetQuery(formName) {
      this.queryParams.start_time = "";
      this.queryParams.end_time = "";
      this.queryParams.start_time = this.getNowTime()[0];
      this.queryParams.end_time = this.getNowTime()[1];
      this.$refs[formName].resetFields();
      this.handleQuery();
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
    this.getDecoyData();
    this.queryParams.start_time = this.getNowTime()[0];
    this.queryParams.end_time = this.getNowTime()[1];
    // console.log(this.queryParams);
  },
};
</script>

<style lang="scss" scoped>
.data-serach,
.data-table {
  background-color: #fff;
  webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
}

.el-form {
  // padding: 15px 10px;
  padding: 15px;
  webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
}

.el-form-item {
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
  text-align: right;
  box-sizing: border-box;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.img {
  vertical-align: middle;
  margin-right: 5px;
}
::v-deep .page-attackip .page-input[data-v-33b2335c] .el-input__inner,
.page-attackip .page-input[data-v-33b2335c] .el-date-editor .el-range-input {
  color: #777 !important;
}
::v-deep .el-range-separator {
  padding-right: 8px;
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
</style>
