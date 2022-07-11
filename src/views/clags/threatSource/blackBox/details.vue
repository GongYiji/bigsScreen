<template>
  <div class="box-details">
    <header-navigation></header-navigation>
    <div class="details">
      <div class="details-top">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class=" top top-left">
              <div class="title">
                <span class="icon"></span>
                <p class="title-mess">基本信息</p>
              </div>
              <div class="left-content">
                <ul class="one">
                  <li><span class="label">ID: </span><span class="sub">200000000</span></li>
                  <li><span class="label">名称:</span><span class="sub">200000000</span></li>
                  <li><span class="label">状态:</span><span class="sub">200000000</span></li>
                </ul>
                <ul class="two">
                  <li><span class="label">用户名称:</span><span class="sub">200000000</span></li>
                  <li><span class="label">创建:</span><span class="sub">200000000</span></li>
                  <li><span class="label">是否删除:</span><span class="sub">200000000</span></li>
                  <li><span class="label">密码:</span><span class="sub">200000000</span></li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class=" top top-right">
              <div class="title">
                <span class="icon"></span>
                <p class="title-mess">扫描时间</p>
              </div>
              <div class="right-content">
                <ul class="rg-list">
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                  <li><span class="label">RAD(爬虫):</span><span class="sub">2022/05/27</span></li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="details-bottom">
        <el-row :gutter="20">
          <el-col :span="5">
            <div class=" bottom bottom-left">
              <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <!-- 下左菜单 -->
          <el-col :span="19">
            <div class=" bottom bottom-right">
              <div class="serach">
                <el-form :inline="true" class="demo-form-inline" size="mini">
                  <el-form-item>
                    <el-input placeholder="请输入关键字搜索"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select placeholder="项目名">
                      <el-option label="区域一"></el-option>
                      <el-option label="区域二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">查询</el-button>
                  </el-form-item>
                </el-form>
                <div class="btn">
                  <el-button icon="el-icon-delete" type="danger" size="mini">批量删除</el-button>
                  <el-button icon="el-icon-plus" type="primary" size="mini">添加URL</el-button>
                </div>
              </div>
              <!-- 搜索部分结束 -->
              <el-table style="width: 100%;" max-height="250">
                <el-table-column fixed prop="date" label="日期" width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="province" label="省份" width="120">
                </el-table-column>
                <el-table-column prop="city" label="市区" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" width="300">
                </el-table-column>
                <el-table-column prop="zip" label="邮编" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 表格部分结束 -->
              <div class="pagination">
                <el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
              </div>
              <!-- 分页器 -->
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {

    },
  };
</script>

<style lang="scss" scoped>
  .pagination{
    text-align: right;
    margin: 10px
  }

  .serach {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 0 15px;
    border: 1px solid #f0f0f0;
  }

  .right-content {
    .rg-list {
      display: flex;
      height: 17vh;
      flex-wrap: wrap;
      padding: 10px;

      li {
        margin: 0 10px 10px 0;
      }
    }
  }

  .left-content {
    display: flex;

    .label {
      color: #777777;
      margin-right: 5px;
      font-size: 14px;
    }

    .sub {
      font-size: 16px;
      font-weight: 700;
    }

    .one {
      margin-right: 10px;
    }

    li {
      margin-bottom: 10px;
    }

  }

  .title {
    display: flex;
    padding: 15px 0 0 15px;

    .title-mess {
      margin: 0;
      font-weight: 700;
      height: 20px;
      line-height: 20px;
    }

    .icon {
      margin-right: 5px;
      height: 20px;
      line-height: 20px;
      width: 5px;
      display: inline-block;
      background: #016CFF;
    }
  }

  ul {
    list-style: none;
  }

  .bottom {
    margin-top: 15px;
    height: 55vh;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #F9F9F9;
    overflow-y: auto;
  }

  .top {
    border-radius: 4px;
    height: 25vh;
    background: #fff;
    border: 1px solid #F9F9F9;
  }

  .details {
    height: 83vh;
    margin: 10px 38px;
  }

  .box-details {
    background-color: #F9F9F9;
  }
</style>

<style lang="scss">

</style>
