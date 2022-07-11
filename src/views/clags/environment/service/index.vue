<template>
  <div class="app-container home">
    <header-navigation></header-navigation>
    <div class="content-serach">
      <div class="search">
        <el-form :inline="true" :model="queryParams" ref="queryParams" v-show="showSearch" class="demo-form-inline">
          <el-form-item prop="service_name">
            <el-input v-model="queryParams.service_name" size="medium" placeholder="模糊搜索服务名称" @change="handleQuery"
              prefix-icon="el-icon-search">
            </el-input>
          </el-form-item>
          <el-form-item prop="service_class">
            <el-select v-model="queryParams.service_class" @change="handleQuery" collapse-tags multiple clearable
              placeholder="服务类型">
              <el-option v-for="item in select" :key="item.class" :label="item.class" :value="item.class">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="service_ports">
            <el-select v-model="queryParams.service_ports" @change="handleQuery" multiple collapse-tags clearable
              placeholder="监听端口">
              <el-option v-for="item in ports" :key="item.port" :label="item.port" :value="item.port">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button> -->
            <el-button type="primary" icon="el-icon-refresh" @click="resetQuery('queryParams')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 查询条件结束 -->
    <div class="tableData">
      <div class="table-btn">
        <el-button size="mini" icon="el-icon-plus" @click="dialogVisible = true" type="primary">新增模块</el-button>
      </div>
      <el-table v-if="refreshTable" v-loading="loading" class="table" :data="serviceList"
        style="width: 95%;border: 1px solid #f0f0f0;" height="430" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column width="220">
          <template slot="header">
            服务名称
          </template>
          <template slot-scope="scope">
            <strong> {{ scope.row.name }} </strong>
            <!-- <i class="el-icon-edit"></i> -->
          </template>
        </el-table-column>
        <el-table-column prop="class" label="大类/具体服务">
        </el-table-column>
        <el-table-column prop="level" label="交互类型">
          <template slot-scope="scope">
            {{ scope.row.level === 'low' ? '低交互' : '高交互' }}
          </template>
        </el-table-column>
        <el-table-column prop="mould_num" label="被引用模板数" align="center" sortable>
          <template slot-scope="scope">
            <span>
              {{ scope.row.mould_num }} 个
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="port">
          <template slot="header">
            默认监听窗口
            <el-tooltip class="item" effect="dark" content="如需修改端口号,可在模板详情中进行操作" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span>
              {{ scope.row.port }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="describe" width="400" label="描述">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top-end">
              {{ scope.row.describe}}
              <div slot="reference" class="name-wrapper">
                {{ scope.row.describe }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" prop="preview">
          <template slot-scope="scope">
            <div v-if="scope.row.preview==''">
              <span>- -</span>
            </div>
            <div v-else>
              <el-tooltip class="item" effect="dark" content="预览" placement="right">
                <img src="@/assets/images/see.png">
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表单完成 -->
    <div class="service-dialog">
      <el-dialog title="新增模块" :visible.sync="dialogVisible" width="30%">
        <div class="dialog">
          <el-form :model="form">
            <el-form-item label="服务名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入服务名称，长度4-32" style="width: 221px;">
              </el-input>
            </el-form-item>
            <el-form-item label="服务压缩包:" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择服务包">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="TCP端口号:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入端口号，范围1-65535" style="width: 221px;">
              </el-input>
            </el-form-item>
            <el-form-item label="服务大类:" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务类型:" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务描述:" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="form.name" autocomplete="off" placeholder="请输入不超过500个字符"
                style="width: 221px;"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 弹框完成 -->
    <div class="block">
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
        @pagination="getList" />
    </div>
  </div>
</template>

<script>
  import {
    getServiceList,
    getList
  } from "@/api/clags/environment/service"
  // import headerNavigation from '@/components/header'
  export default {
    name: "Index",
    // components: {
    //     headerNavigation
    // },
    data() {
      return {
        formLabelWidth: '120px', //弹框表格长度
        form: {
          name: '',
          region: '',
        },
        dialogVisible: false, //弹框
        refreshTable: true, // 重新渲染表格状态
        showSearch: true, // 显示搜索条件
        loading: true, //加载
        // 查询数据数据
        queryParams: {
          page_no: 1, //第一页
          page_size: 10, //一页10条
          service_class: undefined,
          service_name: undefined,
          service_ports: undefined,
        },
        total: 0, // 总条数
        arr: [],
        // 表格数据
        serviceList: [],
        // select数据
        select: [],
        ports: [],
      };
    },
    methods: {
      // 下拉框数据去重
      getSelect() {
        getList().then(res => {
          let arr1 = this.unique(res.data);
          this.select = arr1;
        });
      },
      getPort() {
        getList().then(res => {
          let arr1 = this.filterPort(res.data);
          this.ports = arr1;
        });
      },
      // 表格数据
      getList() {
        var data = {
          "page_no": this.queryParams.page_no, //页数
          "page_size": this.queryParams.page_size, //条数
          "service_class": this.queryParams.service_class, //服务大类
          "service_ports": this.queryParams.service_ports, //监听端口
          "sort": "mould_num", //排序规则
          "order": "desc", //排序字段
          "service_name": this.queryParams.service_name, //模糊搜索服务名称
        }
        this.loading = true;
        getServiceList(data).then(response => {
          this.serviceList = response.data.data;
          this.total = response.data.total_num;
          this.loading = false;
        });
      },
      //搜索按钮操作
      handleQuery() {
        this.getList();
      },
      // 重置按钮
      resetQuery(formName) {
        this.$refs[formName].resetFields();
        this.handleQuery();
      },
      // 请求数据去重
      unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.class) && res.set(arr.class, 1));
      },
      filterPort(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.port) && res.set(arr.port, 1));
      },
    },
    created() {
      this.getList();
      this.getSelect();
      this.getPort();
    },
  };
</script>

<style scoped lang="scss">
  ::v-deep .pagination-container {
    height: 50px !important;
  }

  .content-serach {
    margin: 0 38px;
    background-color: #fff;
  }

  .el-table .cell,
  .el-table .cell .name-wrapper {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 3; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }

  .block {
    text-align: right;
    margin: 0 38px;
    background: #fff;
  }

  .tableData {
    margin-top: 10px;

    .table-btn {
      display: block;
      text-align: right;
      padding-bottom: 10px;
      margin: 0 39px;
      padding-right: 15px;
      padding-top: 10px;
      background-color: #fff;
    }

    .table {
      margin: 0 38px;
    }
  }

  .search {
    padding: 15px 0 15px 10px;
  }

  .app-container {
    margin: 0px;
    padding: 0px !important;
    background-color: #f0f0f0;
    height: 100vh;
    // box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  }
</style>

<style>
  .search .el-form-item {
    margin-bottom: 0px;
  }

  label {
    font-weight: 500;
  }

  .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  .el-dialog__footer {
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 10%);
  }

  .el-popper[x-placement^=top] {
    width: 400px;
  }

  .cell:empty::before {
    content: '- -';
    color: gray;
  }
</style>
