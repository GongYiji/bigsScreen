<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import { InfoLocalCloud } from '@/api/screen.js'
const echarts = require('echarts')
export default {
  data() {
    return {}
  },
  methods: {
    async initCharts() {
      const res = await InfoLocalCloud()
      let NUM = res.data.local.daily_attack_count
      let NUm = NUM
      let aaa = 40
      // let NUm = '001004'
      let myChart = echarts.init(this.$refs.chart)
      // 绘制图表
      function initNum(i) {
        return {
          type: 'group',
          left: i * 60,
          top: 0,
          width: 0,
          height: 0,

          bounding: 'raw',
          children: [
            // 背景图
            {
              type: 'rect',
              left: 'center',
              top: 0,
              style: {
                fill: '#165894'
              },
              shape: {
                width: aaa,
                height: aaa
              }
            },
            // 数字
            {
              id: 'num-' + i,
              type: 'text',
              left: 'center',
              // top: 'middle',
              top: 10,
              style: {
                fill: '#07EEF9',
                text: 0,
                font: '20px Microsoft YaHei'
              }
            }
          ]
        }
      }

      function initGraphic(num) {
        var str = num + ''

        var graphics = {
          type: 'group',
          left: 'center',
          top: 'middle',
          width: str.length * 60,
          children: []
        }

        // 生成数字
        for (var i = 0; i < str.length; i++) {
          graphics.children.push(initNum(i))
        }

        return graphics
      }

      // 显示的数据
      var num = NUm + ''
      // var num = NUm + 1000000

      let option = {
        // backgroundColor: "#5B5C6E",
        graphic: initGraphic(num)
      }

      //防止图形未渲染
      setTimeout(function () {
        start()
      }, 0)

      function start() {
        var index = num - 200
        index = index < 0 ? 0 : index

        var timer = setInterval(function () {
          if (++index == num) {
            clearInterval(timer)
          }

          var graphics = {
            type: 'group',
            children: []
          }

          let str = index + ''
          let indexOf = ''
          for (let i = 0; i < num.length; i++) {
            if (num[i] > 0) {
              indexOf = i
              break
            }
          }

          let array = []
          for (let i = 0; i < indexOf; i++) {
            array.push(0)
          }

          str = array.join('') + index
          // var str = index + ''

          for (var i = 0; i < str.length; i++) {
            graphics.children.push({
              id: 'num-' + i,
              type: 'text',
              style: {
                text: str[i]
              }
            })
          }

          myChart.setOption({
            graphic: graphics
          })
        }, 10)
      }

      myChart.setOption(option)
      // 图标跟随屏幕自动适配
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  },
  mounted() {
    this.initCharts()
    
  },
  updated() {
    this.initCharts()
  }
}
</script>
<style lang="scss" scoped>
.chart {
  // width: 300px;
  width: 100%;
  height: 50px;
  // margin-top: 20px;
}
</style>
