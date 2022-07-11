<template>
  <div class="empower">
    <div class="empower-content">
      <div class="wrap-preload circle-ball">
        <div class="overlay"></div>
        <div class="wrap-content">
          <div class="wrap-circle-ball">
            <div class="wrap-ball">
              <div class="ball ball-top"></div>
              <div class="ball ball-top"></div>
            </div>
            <div class="wrap-ball">
              <div class="ball ball-bot"></div>
              <div class="ball ball-bot"></div>
            </div>
            <div class="wrap-effect">
              <div class="wrap-circle">
                <div class="circle-effect left"></div>
                <div class="circle-effect left"></div>
              </div>
              <div class="wrap-circle">
                <div class="circle-effect right"></div>
                <div class="circle-effect right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading动画 -->
      <div class="text1">
        <div class="top">
          <p>恭喜您！蜜罐设备已成功上线</p>
        </div>
        <div class="bottom">
          <p>当前正在重启设备，请您耐心等待 <span>{{minute}}:{{second}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 30,

      }
    },
    mounted() {
      this.add();
    },
    watch: {
      // 监听数值变化
      second: {
        handler(newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler(newVal) {
          this.num(newVal)
        }
      },
      hour: {
        handler(newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      // 初始化数据
      second() {
        return this.num(this.seconds)
      },
      minute() {
        return this.num(this.minutes)
      },
      hour() {
        return this.num(this.hours)
      }
    },
    methods: {
      // 防止数值小于10时，出现一位数
      num(n) {
        return n < 10 ? '0' + n : '' + n
      },
      // 倒计时函数
      add() {
        let time = window.setInterval(() => {
          if (this.hours !== 0 && this.minutes === 0 && this.seconds === 0) {
            this.hours -= 1;
            this.minutes = 59;
            this.seconds = 59;
          } else if (this.hours === 0 && this.minutes !== 0 && this.seconds ===
            0) {
            this.minutes -= 1;
            this.seconds = 59;
          } else if (this.hours === 0 && this.minutes === 0 && this.seconds ===
            0) {
            this.seconds = 0
            window.clearInterval(time)
          } else if (this.hours !== 0 && this.minutes !== 0 && this.seconds ===
            0) {
            this.minutes -= 1;
            this.seconds = 59;
          } else {
            this.seconds -= 1;
          }
          if (this.seconds <= 0) {
            // this.delCookie()
            this.$router.push('/index')
          }
        }, 1000)
      },
      // 清除cookie
      delCookie() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        if (cookies.length > 0) {
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            var domain = location.host.substr(location.host.indexOf("."));
            document.cookie =
              name +
              "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +
              domain;
          }
        }
      },
    },
  }
</script>

<style scoped="scoped" lang="scss">
  .text1 {
    margin: 0 auto;
    position: absolute;
    top: 50%;
    width: 100%;
  }

  .bottom {
    span {
      color: #00e0de;
    }

    p {
      color: #fff;
      line-height: 22px;
      height: 22px;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      margin-top: 0;
    }
  }

  .top {
    p {
      font-weight: 500;
      color: #7CF198;
      line-height: 37px;
      height: 37px;
      font-size: 22px;
      text-align: center;
    }
  }

  .empower-content {
    width: 30%;
    height: 100%;
    position: relative;
  }

  .empower {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #0D72B3 0%, #594FAB 100%);
  }
</style>

<style scoped="scoped" lang="scss">
  @-webkit-keyframes ball-top {
    0% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    25% {
      -webkit-transform: rotate(-13deg);
      -moz-transform: rotate(-13deg);
      -ms-transform: rotate(-13deg);
      -o-transform: rotate(-13deg);
      transform: rotate(-13deg);
    }

    75% {
      -webkit-transform: rotate(193deg);
      -moz-transform: rotate(193deg);
      -ms-transform: rotate(193deg);
      -o-transform: rotate(193deg);
      transform: rotate(193deg);
    }

    100% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  @-moz-keyframes ball-top {
    0% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    25% {
      -webkit-transform: rotate(-13deg);
      -moz-transform: rotate(-13deg);
      -ms-transform: rotate(-13deg);
      -o-transform: rotate(-13deg);
      transform: rotate(-13deg);
    }

    75% {
      -webkit-transform: rotate(193deg);
      -moz-transform: rotate(193deg);
      -ms-transform: rotate(193deg);
      -o-transform: rotate(193deg);
      transform: rotate(193deg);
    }

    100% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  @-o-keyframes ball-top {
    0% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    25% {
      -webkit-transform: rotate(-13deg);
      -moz-transform: rotate(-13deg);
      -ms-transform: rotate(-13deg);
      -o-transform: rotate(-13deg);
      transform: rotate(-13deg);
    }

    75% {
      -webkit-transform: rotate(193deg);
      -moz-transform: rotate(193deg);
      -ms-transform: rotate(193deg);
      -o-transform: rotate(193deg);
      transform: rotate(193deg);
    }

    100% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  @keyframes ball-top {
    0% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    25% {
      -webkit-transform: rotate(-13deg);
      -moz-transform: rotate(-13deg);
      -ms-transform: rotate(-13deg);
      -o-transform: rotate(-13deg);
      transform: rotate(-13deg);
    }

    75% {
      -webkit-transform: rotate(193deg);
      -moz-transform: rotate(193deg);
      -ms-transform: rotate(193deg);
      -o-transform: rotate(193deg);
      transform: rotate(193deg);
    }

    100% {
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  @-webkit-keyframes ball-bot {
    0% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }

    25% {
      -webkit-transform: rotate(345deg);
      -moz-transform: rotate(345deg);
      -ms-transform: rotate(345deg);
      -o-transform: rotate(345deg);
      transform: rotate(345deg);
    }

    75% {
      -webkit-transform: rotate(195deg);
      -moz-transform: rotate(195deg);
      -ms-transform: rotate(195deg);
      -o-transform: rotate(195deg);
      transform: rotate(195deg);
    }

    100% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }

  @-moz-keyframes ball-bot {
    0% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }

    25% {
      -webkit-transform: rotate(345deg);
      -moz-transform: rotate(345deg);
      -ms-transform: rotate(345deg);
      -o-transform: rotate(345deg);
      transform: rotate(345deg);
    }

    75% {
      -webkit-transform: rotate(195deg);
      -moz-transform: rotate(195deg);
      -ms-transform: rotate(195deg);
      -o-transform: rotate(195deg);
      transform: rotate(195deg);
    }

    100% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }

  @-o-keyframes ball-bot {
    0% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }

    25% {
      -webkit-transform: rotate(345deg);
      -moz-transform: rotate(345deg);
      -ms-transform: rotate(345deg);
      -o-transform: rotate(345deg);
      transform: rotate(345deg);
    }

    75% {
      -webkit-transform: rotate(195deg);
      -moz-transform: rotate(195deg);
      -ms-transform: rotate(195deg);
      -o-transform: rotate(195deg);
      transform: rotate(195deg);
    }

    100% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }

  @keyframes ball-bot {
    0% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }

    25% {
      -webkit-transform: rotate(345deg);
      -moz-transform: rotate(345deg);
      -ms-transform: rotate(345deg);
      -o-transform: rotate(345deg);
      transform: rotate(345deg);
    }

    75% {
      -webkit-transform: rotate(195deg);
      -moz-transform: rotate(195deg);
      -ms-transform: rotate(195deg);
      -o-transform: rotate(195deg);
      transform: rotate(195deg);
    }

    100% {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }

  @-webkit-keyframes circle-effect-left {
    0% {
      opacity: 0;
    }

    24.99% {
      opacity: 0;
    }

    25% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    40% {
      border-color: rgba(255, 255, 255, 0);
    }

    45% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes circle-effect-left {
    0% {
      opacity: 0;
    }

    24.99% {
      opacity: 0;
    }

    25% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    40% {
      border-color: rgba(255, 255, 255, 0);
    }

    45% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @-o-keyframes circle-effect-left {
    0% {
      opacity: 0;
    }

    24.99% {
      opacity: 0;
    }

    25% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    40% {
      border-color: rgba(255, 255, 255, 0);
    }

    45% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes circle-effect-left {
    0% {
      opacity: 0;
    }

    24.99% {
      opacity: 0;
    }

    25% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    40% {
      border-color: rgba(255, 255, 255, 0);
    }

    45% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes circle-effect-right {
    0% {
      opacity: 0;
    }

    74.99% {
      opacity: 0;
    }

    75% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    90% {
      border-color: rgba(255, 255, 255, 0);
    }

    95% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes circle-effect-right {
    0% {
      opacity: 0;
    }

    74.99% {
      opacity: 0;
    }

    75% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    90% {
      border-color: rgba(255, 255, 255, 0);
    }

    95% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @-o-keyframes circle-effect-right {
    0% {
      opacity: 0;
    }

    74.99% {
      opacity: 0;
    }

    75% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    90% {
      border-color: rgba(255, 255, 255, 0);
    }

    95% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes circle-effect-right {
    0% {
      opacity: 0;
    }

    74.99% {
      opacity: 0;
    }

    75% {
      opacity: 1;
      border-color: rgba(255, 255, 255, 0.6);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }

    90% {
      border-color: rgba(255, 255, 255, 0);
    }

    95% {
      opacity: 0;
      border-color: rgba(255, 255, 255, 0);
      -webkit-transform: scale(3, 1);
      -moz-transform: scale(3, 1);
      -ms-transform: scale(3, 1);
      -o-transform: scale(3, 1);
      transform: scale(3, 1);
    }

    100% {
      opacity: 0;
    }
  }

  .wrap-preload {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    margin: 0;
    opacity: 1;
    visibility: visible;
    width: 100%;
    height: 100%;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  .wrap-preload.circle-ball .wrap-content {
    position: absolute;
    top: 35%;
    left: 50%;
    z-index: 1;
    width: 128px;
    height: 128px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .ball {
    position: absolute;
    top: 50%;
    margin-top: -8px;
    border-radius: 100%;
    width: 16px;
    height: 16px;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .ball.ball-top {
    z-index: 1;
    background: #3CEC66;
    -webkit-transform-origin: 64px 50%;
    -moz-transform-origin: 64px 50%;
    -ms-transform-origin: 64px 50%;
    -o-transform-origin: 64px 50%;
    transform-origin: 64px 50%;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: ball-top 3s linear 0s infinite;
    -moz-animation: ball-top 3s linear 0s infinite;
    -ms-animation: ball-top 3s linear 0s infinite;
    -o-animation: ball-top 3s linear 0s infinite;
    animation: ball-top 3s linear 0s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .ball.ball-top:nth-of-type(2) {
    background: #3CEC66;
    width: 8px;
    height: 8px;
    -webkit-animation: ball-top 3s linear 0.6s infinite;
    -moz-animation: ball-top 3s linear 0.6s infinite;
    -ms-animation: ball-top 3s linear 0.6s infinite;
    -o-animation: ball-top 3s linear 0.6s infinite;
    animation: ball-top 3s linear 0.6s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .ball.ball-bot {
    opacity: 0.4;
    background: #FFB869;
    -webkit-transform-origin: 64px 50%;
    -moz-transform-origin: 64px 50%;
    -ms-transform-origin: 64px 50%;
    -o-transform-origin: 64px 50%;
    transform-origin: 64px 50%;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation: ball-bot 3s linear 0s infinite;
    -moz-animation: ball-bot 3s linear 0s infinite;
    -ms-animation: ball-bot 3s linear 0s infinite;
    -o-animation: ball-bot 3s linear 0s infinite;
    animation: ball-bot 3s linear 0s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .ball.ball-bot:nth-of-type(2) {
    background: #BCA67F;
    width: 8px;
    height: 8px;
    -webkit-animation: ball-bot 3s linear 0.6s infinite;
    -moz-animation: ball-bot 3s linear 0.6s infinite;
    -ms-animation: ball-bot 3s linear 0.6s infinite;
    -o-animation: ball-bot 3s linear 0.6s infinite;
    animation: ball-bot 3s linear 0.6s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect {
    position: absolute;
    top: 50%;
    margin-top: -8px;
    left: -8px;
    right: -8px;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect {
    opacity: 0;
    position: absolute;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.6);
    width: 32px;
    height: 32px;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect:nth-of-type(2):before {
    border: none;
    background: rgba(255, 255, 255, 0.2);
    width: 8px;
    height: 8px;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 16px;
    height: 16px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect.left {
    left: 0;
    -webkit-animation: circle-effect-left 3s linear 0s infinite;
    -moz-animation: circle-effect-left 3s linear 0s infinite;
    -ms-animation: circle-effect-left 3s linear 0s infinite;
    -o-animation: circle-effect-left 3s linear 0s infinite;
    animation: circle-effect-left 3s linear 0s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect.left:nth-of-type(2) {
    top: 8px;
    left: 4px;
    width: 16px;
    height: 16px;
    -webkit-animation: circle-effect-left 3s linear 0.6s infinite;
    -moz-animation: circle-effect-left 3s linear 0.6s infinite;
    -ms-animation: circle-effect-left 3s linear 0.6s infinite;
    -o-animation: circle-effect-left 3s linear 0.6s infinite;
    animation: circle-effect-left 3s linear 0.6s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect.right {
    right: 0;
    -webkit-animation: circle-effect-right 3s linear 0s infinite;
    -moz-animation: circle-effect-right 3s linear 0s infinite;
    -ms-animation: circle-effect-right 3s linear 0s infinite;
    -o-animation: circle-effect-right 3s linear 0s infinite;
    animation: circle-effect-right 3s linear 0s infinite;
  }

  .wrap-preload.circle-ball .wrap-content .wrap-circle-ball .wrap-effect .circle-effect.right:nth-of-type(2) {
    top: 8px;
    right: 4px;
    width: 16px;
    height: 16px;
    -webkit-animation: circle-effect-right 3s linear 0.6s infinite;
    -moz-animation: circle-effect-right 3s linear 0.6s infinite;
    -ms-animation: circle-effect-right 3s linear 0.6s infinite;
    -o-animation: circle-effect-right 3s linear 0.6s infinite;
    animation: circle-effect-right 3s linear 0.6s infinite;
  }

  .wrap-preload.hide-out {
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    -o-transform: scale(2);
    transform: scale(2);
  }

  .wrap-preload .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    display: none;
    width: 100%;
    height: 100%;
  }
</style>
