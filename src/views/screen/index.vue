<template>
  <div class="screen">
    <!-- 顶部 -->
    <div class="screen-top">
      <img src="@/assets/image/top.png" class="img-top" />
      <span class="title">TADS诱捕防御系统</span>
      <div class="close" @click="quit">
        <img src="./images/close.png" alt="" />
        <span>退出</span>
      </div>
      <div class="ScreenBtn" @click="changeScreen">
        <img src="./images/screen.png" alt="" />
        <span>全屏</span>
      </div>
    </div>
    <!-- 主题 -->
    <div class="screen-main">
      <!-- 左边盒子 -->
      <div class="left">
        <div class="left-top">
          <img src="@/assets/image/frame1.png" class="img-left-top" />
          <div class="left-top-title">
            <p>本地情报数据</p>
            <img src="@/assets/image/marshalling3.png" />
          </div>
          <h4>日攻击感知数</h4>
          <LeftTop class="EchartLeftTop"></LeftTop>

          <div class="number">
            <div class="NumbetItem">
              <div class="online">在线节点数</div>
              <LeftTopLeft class="LeftTopLeft"></LeftTopLeft>
            </div>
            <div class="NumbetItem">
              <div class="online">在线蜜罐数</div>
              <LeftTopRight class="LeftTopRight"></LeftTopRight>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <img src="@/assets/image/frame2.png" class="img-left-bottom" />
          <div class="right-top-title">
            <p>本地数据捕获</p>
            <img src="@/assets/image/marshalling3.png" />
          </div>
          <!-- echart -->
          <div class="chart" ref="chart"></div>
        </div>
      </div>
      <!-- 中间盒子 -->
      <div class="center">
        <img src="@/assets/image/border.png" class="img-center" />
        <div class="center-title">
          <img src="@/assets/image/marshalling14.png" />
          <span class="Date"> {{ NewDate }}</span>
        </div>
        <!-- <Center class="CenterEchart"></Center> -->
        <Center1 class="CenterEchart"></Center1>
      </div>
      <!-- 右边盒子 -->
      <div class="right">
        <div class="right-top">
          <img src="@/assets/image/frame1.png" class="img-right-top" />
          <div class="right-top-title">
            <p>本地捕获IP</p>
            <img src="@/assets/image/marshalling3.png" />
          </div>
          <!-- echart -->
          <div id="right-top-main"></div>
        </div>
        <div class="right-bottom">
          <img src="@/assets/image/frame1.png" class="img-right-bottom" />
          <div class="right-top-title">
            <p>频繁攻击蜜罐</p>
            <img src="@/assets/image/marshalling3.png" />
          </div>
          <!-- echart -->
          <RightButtom class="RightButtom"></RightButtom>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 覆盖样式
import '@/assets/css/reset.css'
// 全屏插件
import ScreenFull from 'screenfull'
import dayjs from 'dayjs'
// import * as echarts from 'echarts'
const echarts = require('echarts')
import LeftTop from './component/LeftTop.vue'
import LeftTopLeft from './component/LeftTopLeft.vue'
import LeftTopRight from './component/LeftTopRight.vue'
import Center from './component/Center.vue'
import Center1 from './component/Center1.vue'

import center3 from './component/center3.vue'
import RightButtom from './component/RightButtom.vue'
import RightTop from './component/RightTop.vue'
import { localData, LocalDataIp } from '@/api/screen.js'
export default {
  data() {
    return {
      chartPie: null,
      ChangeScreen: false
    }
  },
  components: { LeftTop, LeftTopLeft, LeftTopRight, RightButtom, RightTop, Center, Center1 },
  computed: {
    // 当前时间
    NewDate() {
      // return dayjs().format('YYYY年MM月DD日 HH:mm:ss')
      return dayjs().format('YYYY年MM月DD日')
    }
  },
  methods: {
    // 退出按钮
    quit() {
      this.$router.push('/')
      if (this.ChangeScreen) {
        !ScreenFull.toggle()
      }
    },
    // 全屏按钮
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      ScreenFull.toggle()
      this.ChangeScreen = true
    },
    // 本地捕获IP  右上
    async drawEcharts() {
      const res = await LocalDataIp()
      let ChartData = res.data
      this.chartPie = echarts.init(document.getElementById('right-top-main'))
      let color = ['#40a9ff', '#597ef7', '#36cfc9', '#9254de', '#f759ab']
      let colorop = ['#0050b3', '#10239e', '#006d75', '#391085', '#9e1068']
      const colorList = [
        new echarts.graphic.LinearGradient(0.3, 1, 0.8, 0.1, [
          {
            offset: 0,
            color: '#40a9ff'
          },
          {
            offset: 1,
            color: '#096dd9'
          }
        ]),
        new echarts.graphic.LinearGradient(0, 0.5, 1, 0.7, [
          {
            offset: 0,
            color: '#597ef7'
          },
          {
            offset: 1,
            color: '#1d39c4'
          }
        ]),
        new echarts.graphic.LinearGradient(0.1, 0, 0.1, 1, [
          {
            offset: 0,
            color: '#36cfc9'
          },
          {
            offset: 1,
            color: '#08979c'
          }
        ]),
        new echarts.graphic.LinearGradient(1, 0.5, 0, 0.7, [
          {
            offset: 0,
            color: '#9254de'
          },
          {
            offset: 1,
            color: '#531dab'
          }
        ]),
        new echarts.graphic.LinearGradient(1, 0.7, 0.6, 0.1, [
          {
            offset: 0,
            color: '#f759ab'
          },
          {
            offset: 1,
            color: '#c41d7f'
          }
        ])
      ]
      let chartData = ChartData
      let arrName = []
      let arrValue = []
      let sum = 0
      let pieSeries = [],
        lineYAxis = []

      // 数据处理
      chartData.forEach((v, i) => {
        arrName.push(v.name)
        arrValue.push(v.value)
        sum = sum + v.value
      })

      // 图表option整理
      chartData.forEach((v, i) => {
        pieSeries.push({
          name: '设备',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: [63 - i * 15 + '%', 57 - i * 15 + '%'],
          center: ['30%', '50%'],
          label: {
            show: false
          },
          data: [
            {
              value: v.value * 4,
              name: v.name,
              itemStyle: {
                shadowColor: colorop[i],
                shadowBlur: 24,
                shadowOffsetX: '5',
                shadowOffsetY: '5'
              }
            },
            {
              value: sum - v.value,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)'
              }
            }
          ]
        })
        pieSeries.push({
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [63 - i * 15 + '%', 57 - i * 15 + '%'],
          center: ['30%', '50%'],
          label: {
            show: false
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: '#293755'
              }
            },
            {
              value: 2.5,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)'
              }
            }
          ]
        })
        v.percent = v.value
        lineYAxis.push({
          value: i,
          textStyle: {
            rich: {
              circle: {
                color: color[i],
                padding: [0, 5],
                fontSize: 16
              }
            }
          }
        })
      })
      this.chartPie.setOption({
        // backgroundColor: '#1A213E',
        color: colorList,
        grid: {
          top: '15%',
          bottom: '49%',
          left: '35%',
          containLabel: false
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: function (params) {
                let item = chartData[params]

                return '{line|}{circle|●}{name|' + item.name + '}{bd||}{circle|' + item.percent + '}'
              },
              interval: 0,
              inside: true,
              textStyle: {
                color: '#e6f7ff',
                fontSize: 14,
                rich: {
                  name: {
                    color: '#9FACBB',
                    fontSize: 15
                  },
                  bd: {
                    color: '#e6f7ff',
                    padding: [0, 5],
                    fontSize: 15
                  },
                  percent: {
                    color: '#333',
                    fontSize: 15
                  },
                  value: {
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 500,
                    padding: [0, 0, 0, 20]
                  },
                  unit: {
                    fontSize: 15
                  }
                }
              },
              show: true
            },
            data: lineYAxis
          }
        ],
        xAxis: [
          {
            show: false
          }
        ],
        series: pieSeries
      })
    },

    async initCharts() {
      const res = await localData()
      let trafficWAY = res.data
      let myChart = echarts.init(this.$refs.chart)
      // 绘制图表
      var data = [],
        data2 = []
      var trafficWay = trafficWAY
      var color = ['#2A8BFD', '#BAFF7F', '#00FAC1', '#00CAFF', '#FDE056', '#4ED33C', '#FF8A26', '#FF5252', '#9689FF', '#CB00FF']
      for (var i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 8,
                shadowBlur: 20,
                borderRadius: 20,
                borderColor: color[i],
                shadowColor: color[i]
              }
            }
          },
          {
            value: 5,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
              }
            }
          }
        )
        data2.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name
          },
          {
            value: 5,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
                opacity: 0.2
              }
            }
          }
        )
      }

      let angle = 0 //角度，用来做简单的动画效果的
      var option = {
        // backgroundColor: '#061740',
        color: color,
        legend: {
          right: '10%',
          top: '20%',
          icon: 'rect',
          itemWidth: 15,
          itemHeight: 15,
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            //外线1
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 3,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //内线1
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 3,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //外线2
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 3,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //外线2
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 3,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //绿点1
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 3
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
              let point = getCirlPoint(x0, y0, r, 90 + -angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //绿点2
            name: '', //绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 3
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
              let point = getCirlPoint(x0, y0, r, 270 + -angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //绿点3
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 3
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6
              let point = getCirlPoint(x0, y0, r, 90 + angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //绿点4
            name: '', //绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 3
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6
              let point = getCirlPoint(x0, y0, r, 270 + angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: ['98%', '95%'],
            hoverAnimation: false,
            center: ['33.33%', '50%'],
            top: 'center',
            itemStyle: {
              normal: {
                label: {
                  show: false
                }
              }
            },
            data: data
          },
          {
            type: 'pie',
            top: 'center',
            startAngle: 90,
            clockwise: false,
            center: ['33.33%', '50%'],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ['94%', '55%'],
            itemStyle: {
              opacity: 0.15
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: data2
          },
          {
            name: '',
            type: 'pie',
            clockWise: false,
            center: ['33.33%', '50%'],
            radius: ['39%', '38%'],
            hoverAnimation: false,
            top: 'center',
            itemStyle: {
              normal: {
                label: {
                  show: false
                }
              }
            },
            data: data
          }
        ]
      }

      //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
        let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
        return {
          x: x1,
          y: y1
        }
      }

      function draw() {
        angle = angle + 3
        myChart.setOption(option, true)
        // 图标跟随屏幕自动适配
        window.addEventListener('resize', function () {
          myChart.resize()
        })
        //window.requestAnimationFrame(draw);
      }

      setInterval(function () {
        //用setInterval做动画感觉有问题
        draw()
      }, 100)
    }
  },
  mounted: function () {
    this.drawEcharts()
    this.initCharts()
  },
  updated: function () {
    this.drawEcharts()
    this.initCharts()
  }
}
</script>

<style lang="scss" scoped>
#right-top-main {
  width: 75%;
  height: 33vh;
  position: absolute;
  top: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0 auto;
}

.left {
  .left-top {
    position: relative;
    h4 {
      position: absolute;
      color: #ffffff;
      left: 10%;
      top: 17%;
      font-weight: 600;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #07eef9;
    }
    .number {
      display: flex;
      position: absolute;
      width: 90%;
      height: 45%;
      left: 3%;
      top: 45%;
      margin-top: 20px;
    }
    .NumbetItem {
      width: 48%;
      height: 90%;
      // border: 1px solid red;
      .online {
        font-size: 18px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #07eef9;
        line-height: 24px;
        margin-left: 40px;
        margin-bottom: 20px;
      }
    }
    .EchartLeftTop {
      position: absolute;
      width: 80%;
      height: 20%;
      top: 25%;
      left: 10%;
    }
    .left-top-title {
      position: absolute;

      p {
        color: white;
        margin: 1vh 0;
      }

      img {
        margin-left: 15px;
      }
    }

    .img-left-top {
      width: 86%;
      height: 43vh;
    }

    width: 100%;
    height: 45vh;
    display: flex;
    position: relative;
    justify-content: center;
  }

  .left-bottom {
    position: relative;
    .chart {
      position: absolute;
      width: 75%;
      height: 33vh;
      top: 8vh;
    }
    .RightTop {
      position: absolute;
    }
    .right-top-title {
      position: absolute;
      p {
        color: white;
        margin: 1vh 0;
      }

      img {
        margin-left: 15px;
      }
    }
    .img-left-bottom {
      width: 86%;
      height: 43vh;
    }

    width: 100%;
    height: 45vh;
    display: flex;
    justify-content: center;
  }

  width: 30%;
  height: 90vh;
}

.right {
  .right-top {
    .right-top-title {
      position: absolute;
      p {
        color: white;
        margin: 1vh 0;
      }

      img {
        margin-left: 15px;
      }
    }

    .img-right-top {
      width: 86%;
      height: 43vh;
    }

    width: 100%;
    height: 45vh;
    display: flex;
    position: relative;
    justify-content: center;
  }

  .right-bottom {
    position: relative;
    .RightButtom {
      width: 85%;
      height: 90%;
      padding-top: 30px;
      position: absolute;
    }
    .img-right-bottom {
      width: 86%;
      height: 43vh;
    }
    .right-top-title {
      position: absolute;
      p {
        color: white;
        margin: 1vh 0;
      }

      img {
        margin-left: 15px;
      }
    }

    width: 100%;
    height: 45vh;
    display: flex;
    justify-content: center;
  }

  width: 30%;
  height: 90vh;
}

.center {
  position: relative;
  .CenterEchart {
    position: absolute;
    width: 90%;
    height: 84vh;
    top: 5vh;
    left: 7vh;
  }
  .center-title {
    position: absolute;
    top: 5vh;

    img {
      width: 100%;
    }
    .Date {
      position: absolute;
      top: 10%;
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
  }

  .img-center {
    width: 100%;
    height: 86vh;
  }

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 90vh;
}

.screen-main {
  display: flex;
}

.screen-top {
  position: relative;
  .img-top {
    width: 100%;
    height: 10vh;
  }
  .title {
    position: absolute;
    top: 2px;
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
  // 退出按钮
  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #61acf2;
    cursor: pointer;
    width: 70px;
    height: 30px;
    position: absolute;
    top: 8px;
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
  .ScreenBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #61acf2;
    cursor: pointer;
    width: 70px;
    height: 30px;
    position: absolute;
    top: 8px;

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

.screen {
  width: 100%;
  height: 100vh;
  background: #020f1c;
}
</style>
