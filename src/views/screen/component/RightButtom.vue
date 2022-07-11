<template>
  <div class="wordCloud" ref="wordCloud"></div>
</template>
<script>
import { Getservices } from '@/api/screen.js'
export default {
  name: 'word-cloud',
  data() {
    return {
      // 显示文本
      hotWord: [],
      color: ['#a18cd1', '#fad0c4', '#ff8177', '#fecfef', '#fda085', '#f5576c', '#fe9a8b', '#30cfd0', '#38f9d7'],
      wordArr: [],
      timer: null,
      resetTime: 10,
      ContainerSize: ''
    }
  },
  created() {},
  watch: {},
  mounted() {
    this.Getservices()
    this.$nextTick(() => {
      // this.init()
    })
  },
  methods: {
    async Getservices() {
      const res = await Getservices()
      console.log(res)
      let spanDom = [...res.data.first, ...res.data.second, ...res.data.third]
      await this.dealSpan(spanDom)
      await this.initWordPos()
      await this.render()
    },
    dealSpan(hotWord) {
      const wordArr = []
      hotWord.forEach(value => {
        // 根据词云数量生成span数量设置字体颜色和大小
        const spanDom = document.createElement('span')
        spanDom.style.position = 'relative'
        spanDom.style.display = 'inline-block'
        spanDom.style.color = this.randomColor()
        spanDom.style.fontSize = this.randomNumber(15, 30) + 'px'
        spanDom.innerHTML = value
        spanDom.local = {
          position: {
            // 位置
            x: 0,
            y: 0
          },
          direction: {
            // 方向 正数往右 负数往左
            x: 1,
            y: 1
          },
          velocity: {
            // 每次位移初速度
            x: -0.5 + Math.random(),
            y: -0.5 + Math.random()
          }
        }
        this.$refs.wordCloud.appendChild(spanDom)
        wordArr.push(spanDom)
      })
      this.wordArr = wordArr
    },
    randomColor() {
      // 获取随机颜色
      var colorIndex = Math.floor(this.color.length * Math.random())
      return this.color[colorIndex]
    },
    randomNumber(lowerInteger, upperInteger) {
      // 获得一个包含最小值和最大值之间的随机数。
      const choices = upperInteger - lowerInteger + 1
      return Math.floor(Math.random() * choices + lowerInteger)
    },
    render() {
      if (this.resetTime < 100) {
        this.resetTime = this.resetTime + 1
        this.timer = requestAnimationFrame(this.render.bind(this))
        this.resetTime = 0
      }
      this.wordFly(this.wordArr)
    },
    wordFly(wordArr) {
      wordArr.forEach(value => {
        // 设置运动方向 大于边界或者小于边界的时候换方向
        if (value.local.realPos.minx + value.local.position.x < this.ContainerSize.leftPos.x || value.local.realPos.maxx + value.local.position.x > this.ContainerSize.rightPos.x) value.local.direction.x = -value.local.direction.x
        if (value.local.realPos.miny + value.local.position.y < this.ContainerSize.leftPos.y || value.local.realPos.maxy + value.local.position.y > this.ContainerSize.rightPos.y) value.local.direction.y = -value.local.direction.y
        value.local.position.x += value.local.velocity.x * value.local.direction.x
        value.local.position.y += value.local.velocity.y * value.local.direction.y
        // 给每个词云加动画过渡
        value.style.transform = 'translateX(' + value.local.position.x + 'px) translateY(' + value.local.position.y + 'px)'
      })
    },
    initWordPos() {
      // 计算每个词的真实位置和容器的位置
      this.wordArr.forEach(value => {
        value.local.realPos = {
          minx: value.offsetLeft,
          maxx: value.offsetLeft + value.offsetWidth,
          miny: value.offsetTop,
          maxy: value.offsetTop + value.offsetHeight
        }
      })
      this.ContainerSize = this.getContainerSize()
    },
    getContainerSize() {
      // 判断容器大小控制词云位置
      const el = this.$refs.wordCloud
      return {
        leftPos: {
          // 容器左侧的位置和顶部位置
          x: el.offsetLeft,
          y: el.offsetTop
        },
        rightPos: {
          // 容器右侧的位置和底部位置
          x: el.offsetLeft + el.offsetWidth,
          y: el.offsetTop + el.offsetHeight
        }
      }
    }
  },
  updated() {
    this.Getservices()
  },
  destroyed() {
    // 组件销毁，关闭定时执行
    cancelAnimationFrame(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.wordCloud {
  width: 100%;
  height: 90%;

  // width: 350px;
  // height: 300px;
}
</style>
