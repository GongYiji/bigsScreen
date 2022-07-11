<template>
  <div class="authentication">
    <el-button type="text" @click="dialogVisible = true">open</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {addWhiteListApi} from '@/api/clags/drohen/attackip/index.js'
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      
    }
  };
</script>

<style>
</style>
