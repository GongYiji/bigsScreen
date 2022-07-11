<template>
  <div class="box">
    <div class="visual-container">
      <!-- 最上顶部 -->
      <div class="top">
        <div class="top-bgc"></div>
        <span class="title">TADS诱捕防御系统</span>
        <div class="close" @click="quit">
          <img src="./images/close.png" alt="" />
          <span>退出</span>
        </div>
        <div class="screen" @click="changeScreen">
          <img src="./images/screen.png" alt="" />
          <span>全屏</span>
        </div>
      </div>
      <!-- 视口部分 -->
      <div class="viewport">
        <!-- 左部分 -->
        <div class="column1">
          <div class="panel">
            <!-- <h3>本地情报数据</h3>
            <div class="img">
              <img src="./images/rectangle.png" alt="" />
            </div>
            <h6>日攻击感知数</h6>
            <LeftTop></LeftTop>
            <div class="number">
              <div class="NumbetItem">
                <div class="online">在线节点数</div>
                <LeftTopLeft class="LeftTopLeft"></LeftTopLeft>
              </div>
              <div class="NumbetItem">
                <div class="online">在线蜜罐数</div>
                <LeftTopRight class="LeftTopRight"></LeftTopRight>
              </div>
            </div> -->
          </div>
          <div class="pane2">
            <!-- <h3>本地捕获IP</h3>
            <div class="img">
              <img src="./images/rectangle.png" alt="" />
            </div>
            <LeftButtom></LeftButtom> -->
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="column2">
          <img class="bgc" src="./images/border.png" alt="" />
          <img class="date-img" src="./images/date.png" alt="" />
          <span> {{ NewDate }}</span>
          <!-- <Center class="CenterEchart"></Center> -->
        </div>
        <!-- 右部分 -->
        <div class="column3">
          <div class="panel">
            <!-- <h3>本地数据捕获</h3>
            <div class="img">
              <img src="./images/rectangle.png" alt="" />
            </div>
            <RightTop></RightTop> -->
          </div>
          <div class="pane2">
            <!-- <h3>频繁攻击蜜罐</h3>
            <div class="img">
              <img src="./images/rectangle.png" alt="" />
            </div>
            <RightButtom class="RightButtom"></RightButtom> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 全屏插件
import ScreenFull from 'screenfull'
import dayjs from 'dayjs'
import LeftTop from './component/LeftTop.vue'
import LeftTopLeft from './component/LeftTopLeft.vue'
import LeftTopRight from './component/LeftTopRight.vue'
import LeftButtom from './component/LeftButtom.vue'
import Center from './component/Center.vue'
import RightTop from './component/RightTop.vue'
import RightButtom from './component/RightButtom.vue'

export default {
  name: 'VisualIndex',
  components: {
    LeftTop,
    LeftTopLeft,
    LeftTopRight,
    LeftButtom,
    Center,
    RightTop,
    RightButtom
  },

  props: {},
  data() {
    return {
      // 定义退出全屏 节流
      ChangeScreen: false
    }
  },
  computed: {
    // 当前时间
    NewDate() {
      // return dayjs().format('YYYY年MM月DD日 HH:mm:ss')
      return dayjs().format('YYYY年MM月DD日')
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 退出按钮
    quit() {
      this.$router.push('/')
      if (this.ChangeScreen) {
        !ScreenFull.toggle()
      }
    },
    //   全屏按钮
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      ScreenFull.toggle()
      this.ChangeScreen = true
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  min-width: 1024px;
  max-width: 1920px;
  // width: 1920px;
  // height: 100vh;
  // height: 100%;
  margin: 0 auto;
  background: #020f1c;
}
.visual-container {
  box-sizing: border-box;
}

.top {
  position: relative;

  // 顶部背景图片
  .top-bgc {
    width: 100%;
    height: 83px;
    background: url(./images/top.png) no-repeat;
    background-size: 100% 100%;
  }

  // 标题
  .title {
    position: absolute;
    top: 0px;
    left: 51%;
    transform: translateX(-50%);
    width: 459px;
    height: 59px;
    font-size: 40px;
    font-weight: 600;
    font-family: YouSheBiaoTiHei;
    font-style: oblique;
    color: #ffffff;
    line-height: 59px;
    letter-spacing: 7px;
  }

  // 顶部删除图标
  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #61acf2;
    cursor: pointer;
    width: 80px;
    height: 50px;
    position: absolute;
    top: 5px;
    left: 82%;
    img {
      width: 25px;
      height: 25px;
    }
    .span {
      padding-left: 5px;
    }
  }
  // 全屏按钮
  .screen {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #61acf2;
    cursor: pointer;
    width: 80px;
    height: 50px;
    position: absolute;
    top: 5px;
    left: 87%;
    img {
      width: 25px;
      height: 25px;
    }
    .span {
      padding-left: 5px;
    }
  }
}

// 视口部分
.viewport {
  width: 100%;
  height: 90%;
  display: flex;
  // background-color: pink;
  margin-top: 0px;

  // 左部分
  .column1 {
    width: 28%;
    display: flex;
    flex-direction: column;
    // margin-top: 20px;
    // 第一个盒子
    .panel {
      height: 42%;
      // padding: 5px 0px 0px 0px;
      position: relative;
      // margin-bottom: 5%;

      h3 {
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        font-style: oblique;
        font-family: YouSheBiaoTiHei;
        color: #ffffff;
        margin: 0;
      }

      .img {
        width: 80px;
        height: 10px;
        top: 10%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        img {
          width: 100%;
          height: 100%;
        }
      }
      h6 {
        font-size: 18px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #07eef9;
        margin: 50px 25px;
        // line-height: 24px;
      }

      .title {
        height: 16px;
        font-size: 16px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #07eef9;
        line-height: 24px;
      }

      .number {
        margin-top: 30px;
        width: 100%;
        height: 45%;
        // background-color: #fff;
        display: flex;
      }

      .NumbetItem {
        width: 48%;
        height: 50%;
        // border: 1px solid red;
        .online {
          font-size: 18px;
          font-family: SourceHanSansCN-Bold, SourceHanSansCN;
          font-weight: bold;
          color: #07eef9;
          line-height: 24px;
          margin-left: 20px;
          margin-bottom: 30px;
        }
      }
    }

    // 第二个盒子
    .pane2 {
      height: 50%;
      // padding: 10px 0px 0px 0px;
      // margin-top: 10px;
      position: relative;

      h3 {
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        font-style: oblique;
        font-family: YouSheBiaoTiHei;
        color: #ffffff;
        margin: 0;
      }

      .img {
        width: 80px;
        height: 10px;
        top: 10%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 中间盒子
  .column2 {
    width: 50%;
    height: 60%;
    margin-top: 20px;
    position: relative;

    // 大背景
    .bgc {
      width: 100%;
      height: 60%;
    }

    // 时间背景

    // 急急急
    .date-img {
      width: 100%;
      position: absolute;
      top: 4%;
      left: 0%;
    }

    // 时间日期
    span {
      position: absolute;
      top: 6%;
      left: 48%;
      transform: translateX(-35%);
      width: 260px;
      // width: 360px;
      height: 31px;
      font-size: 25px;
      font-family: YouSheBiaoTiHei;
      font-style: oblique;

      color: #00fff4;
      line-height: 31px;
    }

    // 中间CenterEchart组件
    .CenterEchart {
      width: 90%;
      height: 90%;
      position: absolute;
      top: 15%;
      left: 15%;
    }
    .CenterImg {
      width: 50px;
      height: 50px;
      position: absolute;
      left: 42%;
      top: 42%;
    }
  }

  // 右部分
  .column3 {
    width: 28%;
    margin-left: 1%;
    // margin-top: 20px;

    // 第一个盒子
    .panel {
      height: 42%;
      // padding: 10px 0px 0px 0px;
      position: relative;
      // margin-bottom: 30px;

      h3 {
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        font-style: oblique;
        font-family: YouSheBiaoTiHei;
        color: #ffffff;
        margin: 0;
      }

      .img {
        width: 80px;
        height: 10px;
        top: 10%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    // 第二个盒子
    .pane2 {
      height: 50%;
      padding: 10px 0px 0px 0px;
      // margin-top: 10px;
      position: relative;

      h3 {
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        font-style: oblique;
        font-family: YouSheBiaoTiHei;
        color: #ffffff;
        margin: 0;
      }

      .img {
        width: 80px;
        height: 10px;
        top: 10%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .echart {
        width: 300px;
        height: 250px;
        // background-color: pink;
        position: absolute;
        top: 20%;
        left: 5%;
      }
    }
  }

  // 上边盒子
  .panel {
    width: 95%;
    height: 50%;
    // margin-bottom: 5px;
    // background: url(./images/border3.png) no-repeat;
    background: url(./images/border3.png) no-repeat;
    // background: url(./images/border1.png) no-repeat;
  }

  // 下边盒子
  .pane2 {
    width: 95%;
    height: 50%;
    // background: url(./images/border3.png) no-repeat;
    background: url(./images/border3.png) no-repeat;
    // background: url(./images/border1.png) no-repeat;
  }

  // .RightButtom {
  //   height: 270px;
  // }

  .LeftTopLeft {
    margin-left: -20px;
  }
  .LeftTopRight {
    margin-left: -10px;
  }
}
</style>
