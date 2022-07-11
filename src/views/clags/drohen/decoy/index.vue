<template>
    <div class="app-container home">
        <header-navigation :submenuArr='arr'></header-navigation>
       <div class="decoy">
      <el-tabs v-model="activeName">
        <el-tab-pane label="蜜饵数据" name="first">
          <div class="decoyData">
            <decoyData></decoyData>
          </div>
        </el-tab-pane>
        <el-tab-pane label="蜜饵管理" name="second">
          <div class="decoyManage">
            <decoyManage></decoyManage>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
    </div>
</template>

<script>
  import decoyData from './decoyItems/decoyData.vue'
  import decoyManage from './decoyItems/decoyManage.vue'
// import headerNavigation from '@/components/header'
export default {
    name: "Index",
    // components: {
    //     headerNavigation
    // },
     components: {
      decoyData:decoyData,
      decoyManage:decoyManage,
    },
    data () {
        return {
            arr: [{ name: '攻击列表1' }, { name: '攻击列表2' }, { name: '攻击列表3' }, { name: '攻击列表4' }],
            activeName:'first',//默认选中
        };
    },
    methods: {

    },
};
</script>

<style scoped lang="scss">
.decoy{
    margin: 0 39px;
}

.app-container {
    margin: 0px;
    padding: 0px !important;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    background-color: #F9F9F9;
}::v-deep .page-attackip .page-input[data-v-33b2335c] .el-input__inner,
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
