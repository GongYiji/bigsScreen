<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import { CenterClients, InnerClient } from '@/api/screen.js'

const echarts = require('echarts')
export default {
  // import 引入的组件需要注入到对象中才能使用
  name: '',
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {}
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async initCharts() {
      const res = await CenterClients()
      const resp = await InnerClient()
      console.log(resp)
      // console.log(res)
      let RespData = [resp.data]
      let ERArr = [...res.data, ...RespData]
      let myChart = echarts.init(this.$refs.chart)
      let points = ERArr
      let color = ['#ffffff', '#36fff6', '#ffe93a', '#67f95f']
      let oneArr = [
        {
          name: '中心点',
          desc: {
            type: 0
          },
          symbol:
            'path://M544 552.325V800a32 32 0 0 1-32 32 31.375 31.375 0 0 1-32-32V552.325L256 423.037a32 32 0 0 1-11.525-43.512A31.363 31.363 0 0 1 288 368l224 128 222.075-128a31.363 31.363 0 0 1 43.525 11.525 31.988 31.988 0 0 1-11.525 43.513L544 551.038z m0 0,M64 256v512l448 256 448-256V256L512 0z m832 480L512 960 128 736V288L512 64l384 224z m0 0',
          symbolSize: 40,
          clientId: '测试ID'
        }
      ]
      let erArr = points
      let allArr = [...oneArr, ...erArr],
        dataArr = []
      // 点
      allArr.forEach((el, ind) => {
        if (el.desc.type > 0) {
          el.symbolSize = 50
          el.symbol =
            'path://M544 552.325V800a32 32 0 0 1-32 32 31.375 31.375 0 0 1-32-32V552.325L256 423.037a32 32 0 0 1-11.525-43.512A31.363 31.363 0 0 1 288 368l224 128 222.075-128a31.363 31.363 0 0 1 43.525 11.525 31.988 31.988 0 0 1-11.525 43.513L544 551.038z m0 0,M64 256v512l448 256 448-256V256L512 0z m832 480L512 960 128 736V288L512 64l384 224z m0 0'
          el.itemStyle = {
            color: color[el.desc.type]
          }
        }
        el.label = {
          normal: {
            show: true,
            position: 'bottom',
            distance: 10,
            color: color[el.desc.type]
          }
        }
      })

      // 圆形分区
      function CalutePointToSplitCircle(arr, option) {
        const newArray = []
        const { length: arLen } = arr
        let single_angle = (360 / arLen).toFixed(2)
        let UtilCalute = {
          calute_x: (ang, radius) => {
            return (Math.cos((ang * Math.PI) / 180).toFixed(2) * radius).toFixed(2)
          },
          calute_y: (ang, radius) => {
            return (Math.sin((ang * Math.PI) / 180).toFixed(2) * radius).toFixed(2)
          }
        }
        // 正东方向开始 逆时针方向
        arr.forEach((e, index) => {
          let itemDesc = e.desc
          let ang = option.stratAngle + (itemDesc.angle && typeof itemDesc.angle === 'number' ? itemDesc.angle : single_angle * index)
          // 各节点中心点
          const x = UtilCalute.calute_x(ang, option.raduis)
          const y = UtilCalute.calute_y(ang, option.raduis)
          // 各节点连接到中心的线段的起点  减去节点的半径
          const x1 = UtilCalute.calute_x(ang, option.raduis - option.nodeRadius)
          const y1 = UtilCalute.calute_y(ang, option.raduis - option.nodeRadius)
          // 各节点连接到中心的线段的终点
          const x0 = UtilCalute.calute_x(ang, option.emptyCenterRadius)
          const y0 = UtilCalute.calute_y(ang, option.emptyCenterRadius)

          e.value = [x, y] // 节点中心点
          e.lineData = [
            [x1, y1],
            [x0, y0]
          ]
          newArray.push(e)
        })
        return newArray
      }

      // 线配置
      function linesConfig(arr) {
        let dataArr = []

        function getFormatItem(item, start, end) {
          return [
            { coord: item.lineData[start] }, // 起点
            {
              coord: item.lineData[end],
              lineStyle: {
                color: '#0BC6FE',
                curveness: item.desc.type === 3 ? 0.1 : 0
              },
              effect: {
                color: color[item.desc.type]
              }
            } // 终点
          ]
        }

        arr.forEach(el => {
          switch (el.desc.type) {
            case 0:
              break
            case 1:
              // 外到内
              dataArr.push(getFormatItem(el, 0, 1))
              break
            case 2:
              // 内到外
              dataArr.push(getFormatItem(el, 1, 0))
              break
            case 3:
              // 双向
              dataArr.push(getFormatItem(el, 0, 1))
              dataArr.push(getFormatItem(el, 1, 0))
              break
          }
        })
        return dataArr
      }

      // 点分布
      oneArr = CalutePointToSplitCircle(oneArr, {
        stratAngle: 0,
        raduis: 0,
        nodeRadius: 0,
        emptyCenterRadius: 0
      })
      erArr = CalutePointToSplitCircle(erArr, {
        stratAngle: 0,
        raduis: 40,
        nodeRadius: 5,
        emptyCenterRadius: 10
      })

      allArr = [...oneArr, ...erArr]
      console.log('shuju', allArr)
      // 线坐标和配置
      dataArr = linesConfig(allArr)
      // 生成虚线 饼图数据
      function generateData(totalNum, bigvalue, smallvalue, color) {
        let dataArr = []
        for (var i = 0; i < totalNum; i++) {
          if (i % 2 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: bigvalue,
              itemStyle: {
                normal: {
                  color: color,
                  borderWidth: 0
                }
              }
            })
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: smallvalue,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0
                }
              }
            })
          }
        }
        return dataArr
      }

      let dolitData = generateData(100, 25, 20, 'rgb(126,190,255)')
      let threeData = generateData(6, 40, 10, '#2dc0c9')

      function getOption(startAngle, radius) {
        let option = {
          // 背景颜色
          // backgroundColor: '#081c47',
          title: {
            text: '',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            show: false,
            type: 'value',
            max: 50,
            min: -51
          },
          grid: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          },
          yAxis: {
            show: false,
            type: 'value',
            max: 50,
            min: -50
          },
          graphic: {
            elements: [
              {
                type: 'text',
                z: 7,
                style: {
                  // text: '诱捕防御系统',
                  textAlign: 'center',
                  fill: '#fff',
                  font: '30px "Microsoft YaHei"'
                },
                left: 'center',
                top: 'center'
              }
              // {
              //   type: 'image',
              //   z: 4,
              //   style: {
              //     image: './asset/get/s/data-1641374427371-xPKsRNQ2l.png',
              //     width: 170,
              //     height: 170
              //   },
              //   left: 'center',
              //   top: 'center'
              // }
            ]
          },
          series: [
            {
              name: '节点',
              type: 'graph',
              silent: false,
              hoverAnimation: false, // 鼠标悬浮高亮
              cursor: 'default',
              coordinateSystem: 'cartesian2d',
              z: 3,
              lineStyle: {
                width: 2,
                color: 'source',
                type: 'dashed'
              },
              data: allArr
            },
            {
              name: '线图',
              type: 'lines',
              hoverAnimation: false,
              silent: false,
              cursor: 'default',
              coordinateSystem: 'cartesian2d',
              polyline: false, // 多线段
              z: 1,
              lineStyle: {
                width: 2,
                type: 'dashed',
                curveness: 0
              },
              effect: {
                show: true,
                period: 8, //箭头指向速度，值越小速度越快
                trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 6
              },
              emphasis: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              data: dataArr
            },
            {
              name: '不动外圆',
              type: 'pie',
              zlevel: 4,
              silent: true,
              radius: ['60%', '59%'],
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: dolitData
            },
            {
              type: 'pie',
              name: '旋转圆',
              zlevel: 20,
              silent: true,
              radius: ['50%', '49%'],
              hoverAnimation: false,
              startAngle: startAngle,
              data: threeData,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            },
            {
              name: '缩放圆',
              type: 'pie',
              zlevel: 4,
              silent: true,
              radius: [radius + 1 + '%', radius + '%'],
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: dolitData
            }
          ]
        }
        return option
      }

      let startAngle = 50 // 初始旋转角度
      let [minradius, radius, maxradius] = [22, 22, 24] // 最小、初始、最大 缩放尺寸
      let isBig = true // 缩放动画 标识

      function draw() {
        startAngle = startAngle - 5
        if (isBig) {
          radius = radius + 0.5
          if (radius > maxradius) {
            isBig = false
          }
        } else {
          radius = radius - 0.5
          if (radius < minradius) {
            isBig = true
          }
        }
        let option = getOption(startAngle, radius)
        myChart.setOption(option, true)
        // 图标跟随屏幕自动适配
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      }

      setInterval(draw, 200)
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    this.initCharts()
  },
  // 生命周期 - 创建之前
  beforeCreate() {},
  // 生命周期 - 挂载之前
  beforeMount() {},
  // 生命周期 - 更新之前
  beforeUpdate() {},
  // 生命周期 - 更新之后
  updated() {
    this.initCharts()
  },
  // 生命周期 - 销毁之前
  beforeDestroy() {},
  // 生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有 keep-alive 缓存功能，这个函数会触发
  activated() {}
}
</script>
<style lang="scss" scoped>
.chart {
  // width: 600px;
  // height: 700px;
  width: 90%;
  height: 90%;
}
</style>