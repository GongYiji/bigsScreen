<template>
  <div class="blackbox">
    <header-navigation></header-navigation>
    <div class="box-serach">
      <el-form :inline="true" :model="formInline" class="box-form">
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="状态码">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="CMS系统">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="服务">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button>选择文件</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain>批量添加项目</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" plain>下载模板</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-content">
      <div class="box-btn">
        <div class="btn">
          <el-select placeholder="操作全部数据" size="small">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
        </div>
      </div>
      <el-table style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看{{ scope }}</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.box-btn {
  margin: 10px 0;
  display: flex;
  justify-content: end;

  .btn {
    margin-right: 15px;
  }
}

.box-content {
  width: 95%;
  margin: 0 auto;
  height: 70vh;
  background-color: #fff;
  overflow: hidden;
}

.box-serach {
  width: 95%;
  margin: 15px auto;
  background-color: #fff;

  .box-form {
    padding: 15px;
  }
}

::v-deep .el-form-item {
  margin-bottom: 0;
}

.blackbox {
  height: 100vh;
  overflow: hidden;
  background-color: #f9f9f9;
}
</style>
