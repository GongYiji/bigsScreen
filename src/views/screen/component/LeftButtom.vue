<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import { LocalDataIp } from '@/api/screen.js'
const echarts = require('echarts')
export default {
  data() {
    return {}
  },
  methods: {
    async initCharts() {
      const res = await LocalDataIp()
      let ChartData = res.data
      let myChart = echarts.init(this.$refs.chart)

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

      let option = {
        // backgroundColor: '#1A213E',
        color: colorList,
        // 文字
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
                // console.log(item)
                return '{line|}{circle|●}{name|' + item.name + '}{bd||}{circle|' + item.percent + '}'
              },
              interval: 0,
              inside: true,
              textStyle: {
                color: '#e6f7ff',
                fontSize: 18,
                rich: {
                  name: {
                    color: '#9FACBB',
                    fontSize: 14
                  },
                  bd: {
                    color: '#e6f7ff',
                    padding: [0, 5],
                    fontSize: 14
                  },
                  percent: {
                    color: '#333',
                    fontSize: 14
                  },
                  value: {
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 500,
                    padding: [0, 0, 0, 20]
                  },
                  unit: {
                    fontSize: 14
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
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initCharts()
      setInterval(() => {
      this.initCharts()
    }, 300000);
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 370px;
  height: 245px;
  margin-top: 70px;
  margin-left: 30px;
}
</style>
