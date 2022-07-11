<template>
  <div class="app-container home">
    <header-navigation></header-navigation>
    <div class="alarm">
      <el-tabs v-model="activeName">
        <el-tab-pane label="告警策略" name="first">
          <div class="strategy">
            <strategy></strategy>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通知配置" name="second">
          <div class="notice">
            <notice></notice>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
  import strategy from './alarmItems/strategy.vue'
  import notice from './alarmItems/notice.vue'

  export default {
    name: "Index",
    components: {
      strategy: strategy,
      notice: notice,
    },
    created() {
    },
    data() {
      return {
        arr: [],
        activeName: "first", //默认显示
      };
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .el-tabs__header{
    // margin: 0;
  }

  ::v-deep .el-tabs__nav-scroll{
    // background-color: #F9F9F9;
  }

  .alarm {
    margin: 20px 39px;
  }

  .app-container {
    background-color: #fff;
    margin: 0px;
    padding: 0px !important;
    height: 100vh;
  }
</style>
