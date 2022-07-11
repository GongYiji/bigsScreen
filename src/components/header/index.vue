<template>
  <div class="header-wrap">
    <div class="header-top">
      <div class="left">
        <img src="@/assets/images/logtext.png" alt="">
      </div>
      <div class="right">
        <div class="go_client" @click="handleClick">
          <svg-icon icon-class="loader" class="svg-icon"></svg-icon>
        </div>
        <div class="personal_center">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="personal_center">
              <svg-icon icon-class="mylogo" class="svg-icon"></svg-icon>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided @click.native="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="left">
        <div class="left-item" @click="go(index,item)" v-for="(item,index) in submenuArr" :class="item.class">
          <div class="item-icon">
            <svg-icon :icon-class="item.meta.icon" style="fill:currentColor; color:#777;" class="img" />
          </div>
          <div class="item-val">{{item.meta.title}}</div>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" size="medium" @click="goHome()" icon="el-icon-s-home">主页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getRouters
  } from '@/api/menu'
  import {
    getNodeAndHoneyPotState,
    getAttackChainInfo
  } from '@/api/index'
  export default {
    name: 'HeaderSearch',
    props: {},
    data() {
      let path = this.$route.path;
      let patt = JSON.parse(sessionStorage.getItem("patt"));
      let parent = path.substring(1, path.lastIndexOf("/"));
      let son = path.substring(path.lastIndexOf("/") + 1);
      patt.forEach((item, index) => {
        if (parent == item.path) {
          this.submenuArr = item.children;
          this.submenuArr.forEach((item1, index) => {
            if (son == item1.path) {
              item1.class = 'active'
            } else {
              item1.class = ''
            }
          })
          return;
        }
      })
      return {
        // submenus: this.submenuArr,
        parent: parent,
        path: path,
        son: son,
        flag: 1
      }
    },
    methods: {
      //退出登录
      async logout() {
        this.$confirm('确定注销并退出系统吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.href = '/index'
            })
          })
          .catch(() => {})
      },
      go(index, item1) {
        let path = this.submenuArr[index].path
        this.$router.push({
          path: "/" + this.parent + "/" + path
        })
      },
      goHome() {
        this.$router.push('/index')
      },
      handleClick() {
        this.$router.push({
          path: "/manageIndex"
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  body {
    margin: 0;
    padding: 0;
  }

  .svg-icon {
    width: 1.2em;
    height: 1.2em;
  }

  .active {
    background-color: #016CFF;
    color: #fff;

    .svg-icon {
      fill: currentColor;
      color: #fff !important;
    }

  }

  .header-wrap {
    width: 100%;
    height: 15vh;
    padding: 0 !important;

    .header-top {
      width: 100%;
      height: 7vh;
      background: #08204d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding: 0 10px;

      .left {
        width: 15%;
        height: 40%;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .right {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .go_client {
        margin-right: 10px;
        width: 120px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        border-radius: 8px;

        .svg-icon {
          width: 90px;
          height: 32px;
        }
      }

      .personal_center {
        margin-right: 10px;

        .svg-icon {
          width: 40px;
          height: 40px;
        }
      }
    }

    .header-bottom {
      background: #f9f9f9;
      width: 95%;
      margin: 0 auto;
      height: 8vh;
      display: flex;
      justify-content: space-between;

      .left {
        width: calc(100% - 200px);
        height: 100%;
        display: flex;

        .left-item {
          min-width: 90px;
          height: 40px;
          margin: 10px 0 0 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);

          .item-icon {
            margin-right: 5px;

            // background: darkgoldenrod;
            img {
              vertical-align: middle;
              width: 20px;
              height: 20px;
            }
          }

          .item-val {
            font-size: 13px;
            margin-right: 5px;
          }
        }
      }

      .right {
        // position: absolute;
        // right: 80px;
        width: 90px;
        height: 40px;
        // top: 50%;
        // transform: translateY(-50%);
        margin-top: 10px;
        text-align: center;
        line-height: 33px;

        // background: #0044a4;
        display: flex;
        justify-content: center;
        align-items: center;

        .right-icon {
          width: 18px;
          height: 18px;
          background: deeppink;
        }

        .right-name {
          color: #fff;
          margin-left: 7px;
          font-size: 12px;
        }
      }
    }
  }
</style>
