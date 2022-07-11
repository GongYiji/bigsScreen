<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="user.newPassword" placeholder="请输入新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";
import rsa from '@/utils/rsa'

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const uuid = '5a07c1786d4342729eb3349bb5551623'
          const key =
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0wJz44jaGCBWkjjt5eObfWs6rgc/xNCogla45A6DJDQPGsmYwiAEKh0eRqwp0SZNd5Mi7hMG1kBbQ3BqxmGOX1e26zRZETcPHuc3MvvbxUTJ2YwaneCARq8zhwGMJcV88qaxWfia5qQlR/wjpfczPQe6b6ZrpzoYq3MBZnevITpfl1b9veQzEtkd+TPf2vmDlWBLUSygZNl0CyqZvAJ5OQsHKsqkjZjA5xl8HAk75jlyvtsSMv3RribPQIMxaJSMgU1qSZHabq8yTiJoZw+aYBm/X4VoHpHxNhD7msLgONRlD2LBf/UBp439S4XKGkmVeZGQr1Up2vO8BqWFQrf6gwIDAQAB'
          let oldPsd = ''
          let newPsd = ''
          oldPsd = rsa.codeEncrypt(this.user.oldPassword, uuid)
          newPsd = rsa.codeEncrypt(this.user.newPassword, uuid)
          updateUserPwd(oldPsd, newPsd).then(response => {
            this.$modal.msgSuccess("修改成功");
          });
        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>
