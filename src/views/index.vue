<template>
  <div class="app-container home">
    <!-- 头部部分 -->
    <div class="header">
      <div class="header_left">
        <img src="@/assets/images/logtext.png" alt="" />
      </div>
      <div class="header_right">
        <div class="go_client" @click="handleClick" v-if="flog">
          <svg-icon icon-class="loader" class="svg-icon"></svg-icon>
        </div>
        <div class="go-screen" @click="handleScreen">
          <svg-icon icon-class="screen" class="svg-icon"></svg-icon>
        </div>
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

    <!-- 中间部分 -->
    <div class="middle">
      <!-- 蜜罐状态 -->
      <div class="middle_top">
        <div class="middle_top_right">
          <el-dropdown>
            <el-button style="background-color: rgba(225, 225, 225, 0); border: none; color: #fff"> 蜜罐状态：{{ status }} <i
                class="el-icon-arrow-down el-icon--right"></i> </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in arr" @click.native="handleDropdownItem(item)" :key="item.name">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="block">
            <el-date-picker v-model="value1" style="background-color: #08204d; border: none; color: #606266"
              type="datetimerange" value-format="timestamp" range-separator="--" start-placeholder="开始日期"
              :picker-options="pickerOptions" end-placeholder="结束日期"> </el-date-picker>
          </div>
        </div>
      </div>
      <div class="middle_center">
        <!-- 中间内容  左边部分 （节点状态） -->
        <div class="middle_center_left">
          <!-- <div class="img-left">
            <img src="@/assets/images/logoleft.png">
          </div> -->
          <div class="middle_center_left_top">节点状态</div>
          <div class="middle_center_left_bottom">
            <div class="middle_center_left_bottom_left" id="echarts1" ref="chart"></div>
            <div class="middle_center_left_bottom_right">
              <div class="middle_center_left_bottom_right_top">
                <div class="top">
                  <div class="top_icon"></div>
                  <div class="top_title">在线节点:</div>
                  <div style="color: red; font-size: 15px; color: #66ffff">{{ node.offline }}</div>
                </div>
                <div class="bottom">
                  <div class="bottom_item">
                    <div class="icon">
                      <img src="@/assets/images/windows-fill.svg" alt="" />
                    </div>
                    <div class="title">Win:</div>
                    <div class="value">{{ node.windows }}</div>
                  </div>
                  <div class="bottom_item" style="margin-bottom: 0px">
                    <div class="icon"><img src="@/assets/images/linux.svg" alt="" /></div>
                    <div class="title">Linux:</div>
                    <div class="value">{{ node.linux_x86 + node.linux_arm }}</div>
                  </div>
                  <div class="bottom_item_two">
                    <div class="icon"><img src="@/assets/images/linux.svg" alt="" /></div>
                    <div class="title">linux_x86:</div>
                    <div class="value">{{ node.linux_x86 }}</div>
                  </div>
                  <div class="bottom_item_two">
                    <div class="icon"><img src="@/assets/images/linux.svg" alt="" /></div>
                    <div class="title">linux_arm:</div>
                    <div class="value">{{ node.linux_arm }}</div>
                  </div>
                </div>
              </div>
              <div class="middle_center_left_bottom_right_bottom">
                <div class="top">
                  <div class="top_icon"></div>
                  <div class="top_title">离线节点:</div>
                  <div style="color: red; font-size: 15px; color: #66ffff">{{ node.offline }}</div>
                </div>
                <div class="bottom">
                  <!-- <div class="bottom_item">
                                        <div class="icon">
                                            <img src="@/assets/images/windows-fill.svg"
                                                 alt="">
                                        </div>
                                        <div class="title">Win:</div>
                                        <div class="value">2</div>
                                    </div> -->
                  <!-- <div class="bottom_item">
                                        <div class="icon">
                                            <img src="@/assets/images/linux.svg"
                                                 alt="">
                                        </div>
                                        <div class="title">Win:</div>
                                        <div class="value">2</div>
                                    </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间内容  中间部分  （蜜罐状态）-->
        <div class="middle_center_middle">
          <div class="middle_center_middle_top">蜜罐状态</div>
          <div class="middle_center_middle_bottom">
            <div class="left">
              <div class="left_top">
                <img src="@/assets/images/miguan_left.png" alt="" />
              </div>
              <div class="left_bottom">
                <div class="top">{{ honeypotState.online }}</div>
                <div class="bottom">在线蜜罐</div>
              </div>
            </div>
            <div class="right">
              <div class="right_top">
                <img src="@/assets/images/miguan_right.png" alt="" />
              </div>
              <div class="right_bottom">
                <div class="top">{{ honeypotState.offline }}</div>
                <div class="bottom">离线蜜罐</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间内容  右边部分 （攻击链） -->
        <div class="middle_center_right">
          <div class="middle_center_right_top">攻击链</div>
          <div class="middle_center_right_bottom">
            <!-- 左边单个元素部分 -->
            <!-- <div class="left">
             <div class="wrap">
                <svg-icon icon-class="liubianxing" class="img" />
                <div class="wrap_info">
                  <svg-icon icon-class="bianzu" class="img_icon" />
                  <div class="img_title">攻击ip</div>
                  <div class="img_value">{{ attackChainInfo.attack_ip }}</div>
                </div>
              </div>
            </div> -->
            <!-- 右边多个元素部分 -->
            <div class="right">
              <svg-icon icon-class="gongjilian1" class="img" />
              <div class="wrap_info">
                <svg-icon icon-class="bianzu" class="img_icon" />
                <div class="img_title">攻击ip</div>
                <div class="img_value">{{ attackChainInfo.attack_ip }}</div>
              </div>
              <div class="wrap_info1">
                <svg-icon icon-class="saomiao" class="img_icon" />
                <div class="img_title">扫描</div>
                <div class="img_value">{{ attackChainInfo.scan }}</div>
              </div>
              <div class="wrap_info2">
                <svg-icon icon-class="gongji" class="img_icon" />
                <div class="img_title">攻击</div>
                <div class="img_value">{{ attackChainInfo.attack }}</div>
              </div>
              <div class="wrap_info3">
                <div class="img_value">{{ attackChainInfo.login_attempt }}/{{ attackChainInfo.dangerous_login_attempt }}
                </div>
                <div class="img_title">登录/高危登录</div>
                <svg-icon icon-class="dengluyididenglu" class="img_icon" />
              </div>
              <!-- <div class="wrap_info4">
                <svg-icon icon-class="yangbenchuanshu" class="img_icon" />
                <div class="img_title">样本传输</div>
                <div class="img_value">{{ attackChainInfo.file_upload }}</div>
              </div> -->
              <div class="wrap_info5">
                <div class="img_value">{{ attackChainInfo.fail }}</div>
                <div class="img_title">失陷次数</div>
                <svg-icon icon-class="shixiancishu" class="img_icon" />
              </div>
              <div class="wrap_info6">
                <svg-icon icon-class="xinxijiankong" class="img_icon" />
                <div class="img_title">信息监管</div>
                <div class="img_value">{{ attackChainInfo.info_monitor }}</div>
              </div>
              <div class="wrap_info7">
                <svg-icon icon-class="miguanzongshu" class="img_icon" />
                <div class="img_title">蜜罐总数</div>
                <div class="img_value">{{ attackChainInfo.bait_num }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下面部分 -->
    <div class="footer">
      <!-- 一级菜单 -->
      <div class="footer_top">
        <div class="footer_top_item" v-for="(item, index) in level1Menu" @click="hadnleItemClick(index)"
          :class="indexFlog == index ? 'selectedStyle' : ''">
          <div class="left">
            <svg-icon :icon-class="item.meta.icon" class="img" />
          </div>
          <div class="right">{{ item.meta.title }}</div>
        </div>
      </div>
      <!-- 选中一级菜单显示选中的信息展示部分 -->
      <div class="footer_middle">
        <div class="footer_middle_top">{{ theSelectedIdentityEnglish }}</div>
        <div class="footer_middle_foot">{{ theSelectedIdentityChina }}</div>
      </div>
      <!-- 选中一级菜单之后展示显示的二级菜单部分 -->
      <div class="footer_foot">
        <div class="footer_foot_item" v-for="(item, index) in secondaryMenu" @click="handleSkip(index, item)">
          <div class="footer_foot_item_top">
            <svg-icon :icon-class="item.meta.icon" style="fill: currentColor; color: #777777" class="img" />
          </div>
          <div class="footer_foot_item_bottom">{{ item.meta.title }}</div>
        </div>
      </div>
    </div>
    <!-- <button @click="handleClick">tiao</button> -->
  </div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './dashboard/mixins/resize'
  import {
    getRouters
  } from '@/api/menu'
  import {
    getNodeAndHoneyPotState,
    getAttackChainInfo
  } from '@/api/index'
  export default {
    name: 'Index',
    mixins: [resize],
    data() {
      return {
        routers: [],
        chart: null,
        status: '全部', //默认下拉菜单栏 初始默认选中状态的名称
        id: '-1', //默认下拉菜单栏 初始默认选中状态的id值
        honeypotState: {}, //蜜罐状态信息
        node: {}, //节点状态信息
        attackChainInfo: {}, //攻击链信息
        arr: [{
            name: '全部',
            id: '-1'
          },
          {
            name: '全部攻击',
            id: '0'
          },
          {
            name: '内部失陷',
            id: '1'
          }
        ], //下拉菜单栏
        pickerOptions: {
          shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        },
        value1: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date().getTime()], //日期时间选择器的初始默认值
        total: '', //节点状态 部分 总节点
        online: '', //节点状态 部分 在线节点
        dateArr: [], //重新选择 日期时间选择器 将选中的时间的时间戳组成的数组
        flog: true, // 跳转管理端是否显示
        level1Menu: [], //一级菜单的数组
        secondaryMenu: [], //二级菜单的数组
        theSelectedIdentityEnglish: '', //选中一级菜单的英文名字
        theSelectedIdentityChina: '', //选中一级菜单的中文名字
        indexFlog: 0,
        chuandiArr: [],
        nameArr: []
      }
    },
    watch: {
      //监听 日期时间选择器
      value1(newValue, oldValue) {
        //将选择的时间的开始时间，结束时间的时间戳添加到新数组
        this.dateArr[0] = newValue[0] //开始时间
        this.dateArr[1] = newValue[1] //结束时间
        // console.log(this.dateArr)

        let data = {
          intranet: this.id,
          start_time: parseInt((newValue[0] * 1) / 1000),
          end_time: parseInt((newValue[1] * 1) / 1000)
        }
        //调用获取攻击链信息的接口
        getAttackChainInfo(data).then(res => {
          // console.log(res)
          this.attackChainInfo = res.data
        })
      }
    },
    mounted() {},
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    created() {
      this.getAllRouters()
      this.fnGetNodeAndHoneyPotState() //获取攻击链信息接口
      this.fngetAttackChainInfo() //获取节点状态，蜜罐状态
    },
    methods: {
      // getTime (dt) {
      //     var year = dt.getFullYear(); //年
      //     var month = dt.getMonth() + 1; //月
      //     var date = dt.getDate(); //日
      //     month = month < 10 ? "0" + month : month;
      //     date = date < 10 ? "0" + date : date;
      //     var str = year + "-" + month + "-" + date;
      //     return str;
      // },

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

      //获取攻击链的信息
      fngetAttackChainInfo() {
        let data = {
          intranet: this.id,
          start_time: parseInt((this.value1[0] * 1) / 1000),
          end_time: parseInt((this.value1[1] * 1) / 1000)
        }
        getAttackChainInfo(data).then(res => {
          // console.log(res)
          this.attackChainInfo = res.data
        })
      },

      //获取节点状态，蜜罐状态的信息
      fnGetNodeAndHoneyPotState() {
        getNodeAndHoneyPotState().then(res => {
          // console.log(res)
          this.honeypotState = res.data.honeypot
          this.node = res.data.node
          this.total = res.data.node.total
          this.online = res.data.node.online
          //节点状态的图表
          this.initChart(this.total, this.online)
        })
      },

      //下拉菜单，选中下拉菜单之后进行赋值；
      handleDropdownItem(item) {
        // console.log(item.name)
        this.status = item.name
        this.id = item.id

        let data = {
          intranet: this.id,
          start_time: this.dateArr.length == 0 ? parseInt((this.value1[0] * 1) / 1000) : parseInt((this.dateArr[0] *
            1) / 1000),
          end_time: this.dateArr.length == 0 ? parseInt((this.value1[1] * 1) / 1000) : parseInt((this.dateArr[1] *
            1) / 1000)
        }
        //调用获取攻击链信息的接口
        getAttackChainInfo(data).then(res => {
          // console.log(res)
          this.attackChainInfo = res.data
        })
      },

      //节点状态中的Echarts图表
      initChart(total, online) {
        var charts = echarts.init(this.$refs.chart)
        // console.log(total, online)
        var handred = total
        var point = online
        var option = {
          title: {
            // text: point + '%',
            text: '{a|' + online + '}{c| /' + total + ' }',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 20,
                  color: '#ffffff',
                  padding: [5, 0, 0, -5]
                },

                c: {
                  fontSize: 12,
                  color: '#ccc',
                  padding: [0, 0, 0, -5]
                }
              }
            }
          },
          series: [{
            name: 'circle',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [{
                value: point,
                name: '占比',
                itemStyle: {
                  normal: {
                    color: {
                      // 颜色渐变
                      colorStops: [{
                          offset: 0,
                          color: '#66FFFF' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#66FFFF' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '剩余',
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: '#FFA06C'
                  }
                }
              }
            ]
          }]
        }
        charts.setOption(option)
      },
      /**获取路由 */
      getAllRouters() {
        getRouters().then(res => {
          // console.log(res)
          if (res.data.length < 1) {
            //如果res.data的长度小于0，则不显示跳转【管理端】按钮
            this.flog = false
          } else if (res.data.length >= 1) {
            //如果res.data的长度等于1，则遍历如果name == 'Clags' ，则不显示跳转【管理端】按钮

            res.data.forEach(item => {
              if (item.name == 'Clags') {
                this.level1Menu = item.children
                this.secondaryMenu = item.children[0].children
                this.theSelectedIdentityEnglish = item.children[0].name
                this.theSelectedIdentityChina = item.children[0].meta.title
                let patt = this.level1Menu
                sessionStorage.setItem('patt', JSON.stringify(patt))
              }
            })
            if (res.data.length == 1) {
              res.data.forEach(item => {
                if (item.name == 'Clags') {
                  this.flog = false
                }
              })
            } else if (res.data.length > 1) {
              this.flog = true
            }
          }
        })
      },
      //一级菜单的点击事件
      hadnleItemClick(index) {
        // console.log(index)
        // console.log(this.level1Menu)
        this.indexFlog = index
        this.secondaryMenu = this.level1Menu[index].children
        this.theSelectedIdentityEnglish = this.level1Menu[index].name
        this.theSelectedIdentityChina = this.level1Menu[index].meta.title
      },

      //点击跳转客户端
      handleClick() {
        this.$router.push({
          path: '/manageIndex'
        })
      },
      // 跳转大屏
      handleScreen() {
        this.$router.push({
          path: '/screen/index'
        })
      },
      //点击跳转到攻击列表
      handleSkip(index, item1) {
        // console.log(1)
        // console.log(this.level1Menu)
        this.level1Menu.forEach((item, index) => {
          item.children.forEach((v, k) => {
            if (v.meta.title == item1.meta.title) {
              this.chuandiArr = item.children
            }
          })
        })
        // console.log(this.chuandiArr, 'sds12')
        let path1 = this.secondaryMenu[index].component
        // console.log(path1)
        let path2 = path1.substring(path1.lastIndexOf('/', path1.lastIndexOf('/') - 1) + 1)
        // console.log(this.indexFlog)
        let f = this.level1Menu[this.indexFlog].path
        let a = this.secondaryMenu[index].path
        // console.log(f + '/' + a)
        this.$router.push({
          path: '/' + f + '/' + a
          // this.$router.push({ name: path1,params:{
          //  'arr':this.chuandiArr
          // },
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .el-range-input {
    background-color: rgba(225, 225, 225, 0);
    color: #fff;
  }

  ::v-deep .el-range-editor--medium .el-range-separator {
    color: #fff;
  }

  .el-dropdown-menu__item:not(.is-disabled) {
    background-color: rgba(225, 225, 225, 0);
    border: none;
    color: rgb(143 143 143);
  }

  .el-dropdown-menu__item:not(.is-disabled):focus {
    background-color: rgba(225, 225, 225, 0);
    border: none;
    color: rgb(143 143 143);
  }

  .el-button--primary {
    background-color: rgba(225, 225, 225, 0);
    border: none;
    color: rgb(143 143 143);
  }

  .app-container {
    padding: 0 !important;
    min-width: 1400px;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .header {
    width: 100%;
    height: 7vh;
    background: #08204d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 10px;

    .header_left {
      width: 15%;
      height: 40%;

      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }

    .header_right {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .go_client,
      .go-screen {
        // margin-right: 10px;
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
        width: 40px;
        height: 40px;

        .svg-icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }

  .middle {
    width: 100%;
    height: 45vh;
    background: #090e33;

    .middle_top {
      width: 95%;
      height: 5vh;
      margin: 0 auto;
      background: #090e33;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .middle_top_right {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: right;
      }
    }

    .middle_center {
      width: 95%;
      height: 30vh;
      margin: 0 auto;
      // background: #f28f8f;
      display: flex;

      .middle_center_left {
        width: 25%;
        height: 100%;
        // background: #08204d;
        background: url('../assets/images/logoleft.png') no-repeat;
        background-size: 100% 100%;

        .middle_center_left_top {
          color: #ffffff;
          font-size: 14px;
          margin-top: 5px;
          margin-left: 15px;
          height: 20px;
        }

        .middle_center_left_bottom {
          height: calc(100% - 25px);
          display: flex;
          width: 90%;
          margin: 0 auto;

          .middle_center_left_bottom_left {
            flex: 45%;
          }

          .middle_center_left_bottom_right {
            flex: 55%;

            .middle_center_left_bottom_right_top {
              height: 65%;

              .top {
                display: flex;
                align-items: center;
                padding-top: 10px;
                font-size: 12px;
                color: #fff;
                // justify-content: center;
                margin-left: 30px;

                .top_icon {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #66ffff;
                  margin-right: 5px;

                  img {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                  }
                }

                .top_title {
                  margin-right: 15px;
                }
              }

              .bottom {
                box-sizing: border-box;

                .bottom_item {
                  display: flex;
                  align-items: center;
                  margin: 6px 0;
                  justify-content: center;

                  .icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    margin-bottom: 4px;

                    img {
                      display: inline-block;
                      width: 100%;
                      height: 100%;
                    }
                  }

                  .title {
                    font-size: 12px;
                    color: #fff;
                    width: 40px;
                    margin: 0px 5px 0px 0px;
                    line-height: 24px;
                  }

                  .value {
                    font-size: 20px;
                    color: #66ffff;
                  }
                }

                .bottom_item_two {
                  display: flex;
                  align-items: center;
                  margin: 0px 0px 0px 32px;
                  justify-content: center;

                  .icon {
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                    margin-bottom: 4px;

                    img {
                      display: inline-block;
                      width: 100%;
                      height: 100%;
                    }
                  }

                  .title {
                    font-size: 12px;
                    transform: scale(0.9);
                    color: #fff;
                    margin: 0px 5px 0px 0px;
                    line-height: 24px;
                  }

                  .value {
                    font-size: 15px;
                    color: #66ffff;
                  }
                }
              }
            }

            .middle_center_left_bottom_right_bottom {
              height: 35%;

              .top {
                display: flex;
                align-items: center;
                padding-top: 10px;
                font-size: 12px;
                color: #fff;
                // justify-content: center;
                margin-left: 30px;

                .top_icon {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #ffa06c;
                  margin-right: 5px;
                }

                .top_title {
                  margin-right: 15px;
                }
              }

              .bottom {
                box-sizing: border-box;

                .bottom_item {
                  display: flex;
                  align-items: center;
                  margin: 10px 0;
                  justify-content: center;

                  .icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    margin-bottom: 4px;

                    img {
                      display: inline-block;
                      width: 100%;
                      height: 100%;
                    }
                  }

                  .title {
                    font-size: 12px;
                    color: #fff;
                    margin: 0px 5px 0px 0px;
                    // margin-right: 5px;
                    line-height: 24px;
                  }

                  .value {
                    font-size: 20px;
                    color: #66ffff;
                  }
                }
              }
            }
          }
        }
      }

      .middle_center_middle {
        width: 15%;
        height: 100%;
        // background: #08204d;
        margin: 0 2%;
        background: url(~@/assets/images/logocenter.png) no-repeat;
        background-size: 100% 100%;

        .middle_center_middle_top {
          color: #ffffff;
          font-size: 14px;
          margin-top: 5px;
          margin-left: 15px;
          height: 20px;
        }

        .middle_center_middle_bottom {
          // background: pink;
          height: calc(100% - 25px);
          width: 90%;
          margin: 0 auto;
          display: flex;

          .left {
            position: relative;
            flex: 50%;

            .left_top {
              width: 60%;
              height: 60px;
              top: 20%;
              left: 50%;
              position: absolute;
              margin-left: -30px;

              img {
                display: inline-block;
                width: 100%;
                height: 100%;
              }
            }

            .left_bottom {
              width: 60%;
              height: 60px;
              position: absolute;
              left: 50%;
              margin-left: -30px;
              top: 60%;

              .top {
                text-align: center;
                color: #00ffff;
                font-size: 20px;
              }

              .bottom {
                font-size: 12px;
                color: #ffffff;
              }
            }
          }

          .right {
            flex: 50%;
            position: relative;

            .right_top {
              width: 60%;
              height: 60px;
              top: 20%;
              left: 50%;
              position: absolute;
              margin-left: -30px;

              img {
                display: inline-block;
                width: 100%;
                height: 100%;
              }
            }

            .right_bottom {
              width: 60%;
              height: 60px;
              position: absolute;
              left: 50%;
              margin-left: -30px;
              top: 60%;

              .top {
                text-align: center;
                color: #ff4f16;
                font-size: 20px;
              }

              .bottom {
                font-size: 12px;
                color: #ffffff;
              }
            }
          }
        }
      }

      .middle_center_right {
        width: 56%;
        height: 100%;
        // max-width: 895px;
        // background: #08204d;
        background: url(~@/assets/images/logoright.png) no-repeat;
        background-size: 100% 100%;

        .middle_center_right_top {
          color: #ffffff;
          font-size: 14px;
          margin-top: 5px;
          margin-left: 10px;
        }

        .middle_center_right_bottom {
          width: 100%;
          // height: calc(100% - 60px);

          .right {
            // flex: 70%;
            width: 800px;
            height: 195px;
            min-height: 195px;
            max-height: 300px;
            max-width: 800px;
            min-width: 800px;
            position: relative;
            margin: 0 auto;

            .img {
              display: inline-block;
              width: 100%;
              height: 100%;
              position: absolute;
            }

            .wrap_info {
              position: absolute;
              top: 100px;
              left: 52px;
              width: 130px;
              text-align: center;
              z-index: 1;

              &:hover {
                cursor: pointer;
              }

              .img_icon {
                display: inline-block;
                width: 22px;
                height: 22px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
              }

              .img_value {
                color: #00ffff;
                font-size: 20px;
              }
            }

            .wrap_info1 {
              position: absolute;
              top: 100px;
              left: 254px;
              width: 130px;
              text-align: center;
              z-index: 1;

              .img_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
                transform: scale(0.7);
              }

              .img_value {
                color: rgb(243 179 0);
                font-size: 20px;
              }
            }

            .wrap_info2 {
              position: absolute;
              top: 100px;
              left: 348px;
              width: 130px;
              text-align: center;
              z-index: 1;

              .img_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
                transform: scale(0.7);
              }

              .img_value {
                color: rgb(190 117 50);
                font-size: 20px;
              }
            }

            .wrap_info3 {
              position: absolute;
              top: 100px;
              left: 440px;
              width: 130px;
              text-align: center;
              z-index: 1;

              .img_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
                transform: scale(0.7);
              }

              .img_value {
                color: rgb(224 75 39);
                font-size: 20px;
              }
            }

            .wrap_info5 {
              position: absolute;
              top: 100px;
              left: 531px;
              width: 130px;
              text-align: center;
              z-index: 1;

              .img_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
                transform: scale(0.7);
              }

              .img_value {
                color: rgb(243 179 0);
                font-size: 20px;
              }
            }

            .wrap_info7 {
              position: absolute;
              top: 100px;
              left: 628px;
              width: 130px;
              text-align: center;
              z-index: 1;

              .img_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
                transform: scale(0.7);
              }

              .img_value {
                color: rgb(224 75 39);
                font-size: 20px;
              }
            }

            .wrap_info6 {
              position: absolute;
              top: 13px;
              left: 440px;
              width: 130px;
              text-align: center;
              z-index: 1;

              .img_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
              }

              .img_title {
                color: #fff;
                font-size: 12px;
                transform: scale(0.7);
              }

              .img_value {
                color: #00ffff;
                font-size: 20px;
                margin-top: -5px;
              }
            }

            // .wrap_info7 {
            //   position: absolute;
            //   top: 25px;
            //   left: 385px;
            //   width: 130px;
            //   text-align: center;
            //   z-index: 1;

            //   .img_icon {
            //     display: inline-block;
            //     width: 15px;
            //     height: 15px;
            //   }

            //   .img_title {
            //     color: #fff;
            //     font-size: 12px;
            //     transform: scale(0.7);
            //   }

            //   .img_value {
            //     color: #00ffff;
            //     font-size: 20px;
            //     margin-top: -5px;
            //   }
            // }
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 45vh;
    background: #fbfbfc;
    z-index: 9;

    .footer_top {
      width: 1150px;
      min-width: 1150px;
      position: relative;
      top: -5vh;
      height: 10vh;
      background: #ffffff;
      margin: 0 auto;
      z-index: 999;
      display: flex;
      /* wrap:  在必要的时候进行换行*/
      flex-wrap: wrap;
      border-radius: 8px;

      box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.15);
      /* flex-start:  默认从头开始排列*/
      justify-content: center;

      .footer_top_item {
        cursor: pointer;
        color: red;
        /* 18%:  默认每一个列表占18%*/
        flex: 0 0 13%;
        height: 100%;
        line-height: 50px;
        text-align: center;
        /* 右边距，默认使用css函数去计算 */
        margin-right: calc(10% / 4);
        margin-bottom: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &:after {
          content: '';
          display: inline-block;
          width: 1px;
          height: 30px;
          right: 0;
          position: absolute;
          background-color: rgba(169, 126, 105, 0.2);
        }

        &:last-child {
          margin-right: 0px;

          &:after {
            content: '';
            display: inline-block;
            width: 0px;
            height: 0px;
            right: 0;
            position: absolute;
            background-color: rgba(169, 126, 105, 0.2);
          }
        }

        .left {
          width: 35%;
          height: 60%;
          margin-top: 5px;

          .img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }

        .right {
          font-size: 18px;
          color: #1195fe;
        }
      }
    }

    .footer_middle {
      width: 100%;
      height: 15vh;
      text-align: center;
      position: relative;
      top: -2vh;

      .footer_middle_top {
        color: #1195fe;
      }

      .footer_middle_foot {
        margin-top: 10px;
        font-size: 20px;
        font-weight: 400;
      }
    }

    .footer_foot {
      width: 85%;
      height: 20vh;
      margin: 0 auto;
      position: relative;
      top: -5vh;
      display: flex;
      /* wrap:  在必要的时候进行换行*/
      flex-wrap: wrap;
      /* flex-start:  默认从头开始排列*/
      justify-content: center;

      .footer_foot_item {
        /* 18%:  默认每一个列表占18%*/
        flex: 0 0 17%;
        height: 15vh;
        line-height: 50px;
        text-align: center;
        /* 右边距，默认使用css函数去计算 */
        margin-right: calc(10% / 4);
        cursor: pointer;
        margin-bottom: 20px;
        text-align: center;
        box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 8px;

        .footer_foot_item_top {
          margin: 10px auto;
          width: 50px;
          height: 50px;

          .img {
            display: inline-block;
            width: 100%;
            height: 100%;
            color: #00ffff;
          }
        }

        .footer_foot_item_bottom {
          margin-top: -5px;
          color: #333333;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }

  .selectedStyle {
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
  }
</style>
