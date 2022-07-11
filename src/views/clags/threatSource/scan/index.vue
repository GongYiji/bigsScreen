<template>
  <div class="threan">
    <header-navigation></header-navigation>
    <div class="scan">
      <el-tabs v-model="activeName">
        <el-tab-pane label="任务表" name="first">
          <task></task>
        </el-tab-pane>
        <el-tab-pane label="主机管理" name="second">
          <host></host>
        </el-tab-pane>
        <el-tab-pane label="脚本管理" name="third">
          <cscript></cscript>
        </el-tab-pane>
        <el-tab-pane label="命令集管理" name="fourth">
          <command></command>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import task from './scanItems/task.vue'
  import host from './scanItems/host.vue'
  import cscript from './scanItems/cscript.vue'
  import command from './scanItems/command.vue'
  export default {
    components: {
      task: task,
      host: host,
      cscript: cscript,
      command: command,
    },
    data() {
      return {
        activeName: 'first',
      };
    },
    methods: {

    },
  };
</script>

<style lang="scss" scoped>

  .scan{
    margin: 0 38px;
  }

  .threan{
    height: 100vh;
  }

  ::v-deep .el-tabs__header{
    padding: 10px 0;
    background: #fff;
    margin: 0;
  }
</style>

<style lang="scss">

</style>
