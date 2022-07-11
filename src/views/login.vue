<template>
  <div class="login">
    <div class="img">
      <img src="../assets/images/3.png" class="top" width="100%">
      <img src="@/assets/images/1.png" class="left" width="60%">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">诱捕与防御系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="loginForm.captcha" auto-complete="off" placeholder="验证码" style="width: 63%"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="code2Url" @click="getCode2" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">立 即 登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2022-04 诱捕与防御系统</span>
    </div>
  </div>
</template>

<script>
  import {
    getCodeImg,
    getCodeImg2
  } from "@/api/login";
  import Cookies from "js-cookie";
  import rsa from '@/utils/rsa'
  import {
    encrypt,
    decrypt
  } from '@/utils/jsencrypt'

  export default {
    name: "Login",
    data() {
      return {
        codeUrl: "",
        code2Url: "",
        loginForm: {
          username: "",
          password: "",
          rememberMe: false,
          code: "",
          captcha: "",
          uuid: "",
          token: '',
        },
        loginRules: {
          username: [{
            required: true,
            trigger: "blur",
            message: "请输入您的账号"
          }],
          password: [{
            required: true,
            trigger: "blur",
            message: "请输入您的密码"
          }],
          code: [{
            required: true,
            trigger: "change",
            message: "请输入验证码"
          }],
          captcha: [{
            required: true,
            trigger: "change",
            message: "请输入验证码"
          }]
        },
        loading: false,
        // 验证码开关
        captchaOnOff: true,
        // 注册开关
        register: false,
        redirect: undefined
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      this.getCode();
      this.getCode2();
      this.getCookie();
    },
    methods: {
      getCode() {
        getCodeImg().then(res => {
          this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
          if (this.captchaOnOff) {
            this.codeUrl = "data:image/gif;base64," + res.img;
          }
          this.loginForm.uuid = res.uuid;
        });
      },
      getCode2() {
        getCodeImg2().then(res => {
          // console.log(res)
          this.code2Url = res.data.image;
          this.loginForm.token = res.data.token;
        });
      },

      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set("username", this.loginForm.username, {
                expires: 30
              });
              Cookies.set("password", encrypt(this.loginForm.password), {
                expires: 30
              });
              Cookies.set('rememberMe', this.loginForm.rememberMe, {
                expires: 30
              });
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
            // 密码加密
            let _tempForm = JSON.stringify(this.loginForm)
            let tempForm = JSON.parse(_tempForm)
            // console.log(tempForm)
            const key =
              'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0wJz44jaGCBWkjjt5eObfWs6rgc/xNCogla45A6DJDQPGsmYwiAEKh0eRqwp0SZNd5Mi7hMG1kBbQ3BqxmGOX1e26zRZETcPHuc3MvvbxUTJ2YwaneCARq8zhwGMJcV88qaxWfia5qQlR/wjpfczPQe6b6ZrpzoYq3MBZnevITpfl1b9veQzEtkd+TPf2vmDlWBLUSygZNl0CyqZvAJ5OQsHKsqkjZjA5xl8HAk75jlyvtsSMv3RribPQIMxaJSMgU1qSZHabq8yTiJoZw+aYBm/X4VoHpHxNhD7msLgONRlD2LBf/UBp439S4XKGkmVeZGQr1Up2vO8BqWFQrf6gwIDAQAB'
            tempForm.password = rsa.codeEncrypt(
              tempForm.password,
              tempForm.uuid,
              tempForm.token,
              tempForm.captcha,
              key,
            )
            this.$store.dispatch("Login", tempForm).then(() => {
              // console.log(this.redirect, this.redirect || "/")
              this.$router.push({
                path: "/index"
              }).catch(() => {});
            }).catch(() => {
              this.loading = false;
              if (this.captchaOnOff) {
                this.getCode();
              }
              this.getCode2();
              this.loginForm.captcha = ''
            });
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .img {
    .top {
      position: fixed;
      left: 0;
      top: 0;
    }

    .left {
      margin-left: 16%;
    }
  }

  .login {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 100%;
    // background-image: url("../assets/images/bg.png");
    // background-size: cover;
    // background: url("../assets/images/2.png") no-repeat center center;
    background-color: #040915;
    // background-size: 100% 100%;
    // background-attachment: fixed;
    height: 100vh;
  }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #fff;
  }

  .login-form {
    border-radius: 6px;
    // background: #ffffff;
    background: url("../assets/images/login.png") no-repeat center center;
    background-size: 400px 363px;
    width: 400px;
    padding: 25px 25px 5px 25px;
    margin-right: 6%;

    .el-button--primary {
      background-color: #0044A4;
    }

    .el-input__inner {
      background-color: #123156;
      color: #fff;
      border: 1px solid #1273DB;
    }

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .login-code-img {
    height: 38px;
  }
</style>
