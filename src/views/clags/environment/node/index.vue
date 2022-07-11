<template>
  <div class="app-container home">
    <header-navigation></header-navigation>

    <div class="content-wrap">
      <!-- 条件搜索  部分 -->
      <div class="search">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
          <el-form-item prop="search">
            <el-input placeholder="模糊查询ip" v-model="queryParams.search" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="queryParams.status" @change="handleQuery" placeholder="节点状态">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="flow">
            <el-select v-model="queryParams.flow" @change="handleQuery" placeholder="节点流量">
              <el-option v-for="item in flow" :key="item.value" :label="item.label" :value="item.value">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item prop="mould_ids">
            <el-select v-model="queryParams.mould_ids" multiple collapse-tags @change="handleQuery"
              style="margin-left: 20px;" placeholder="模版名称">
              <el-option v-for="item in mould_ids" :key="item.mould_id" :label="item.mould_name" :value="item.mould_id">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
      <!-- 【刷新】、【导出】、【添加节点】部分 -->
      <div class="table-top">
        <el-button type="primary" icon="el-icon-refresh" @click="handleQuery" size="mini">刷新</el-button>
        <el-button type="primary" icon="el-icon-download" @click="fnDerive" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="fnTheNewNode"
          style="margin-right:10px">添加节点</el-button>
      </div>

      <!-- 表格部分 -->
      <div class="table-content">
        <el-table :data="nodeList" v-loading="loading" row-key="client_id" ref="expandstable" :expand-row-keys="expands"
          @row-click="rowClick" style="border:1px solid #dfe6ec" :header-cell-class-name="handlemyclass"
          :row-class-name="getRowClass">
          <el-table-column type="expand" style="padding:0px">
            <template slot-scope="scope">
              <div class="showWrap">
                <div class="left">
                  <div class="left-top">
                    <div class="title">

                      <div class="title-icon">
                        <img src="@/assets/images/jiedianguanli_jiantou.png">
                      </div>
                      <div class="title-name">节点信息</div>
                    </div>
                    <div class="content">
                      <el-descriptions class="margin-top" :column="2" style="margin: 10px 30px" border>
                        <el-descriptions-item>
                          <template slot="label">
                            节点名称
                          </template>
                          <div v-if="flag">
                            <span>{{nodeObj.client_name}} <i class="el-icon-edit" @click="clickInp()"></i>
                            </span>
                          </div>
                          <div v-else>
                            <el-form :model="form" ref="form">
                              <el-form-item prop="client_name">
                                <el-input v-model="form.client_name" style="width: 200px;">
                                </el-input>
                                <el-button type="primary" icon="el-icon-check" @click="reviseNode()"></el-button>
                              </el-form-item>
                            </el-form>
                          </div>
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            节点状态
                          </template>
                          {{nodeObj.status}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            创建时间
                          </template>
                          {{timestampToTime(nodeObj.create_time)}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            更新时间
                          </template>
                          {{timestampToTime(nodeObj.update_time)}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            部署时间
                          </template>
                          --
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            部署位置
                          </template>
                          <div v-if="flag1">
                            <span> {{nodeObj.location}} <i class="el-icon-edit" @click="clickInp1()"></i>
                            </span>
                          </div>
                          <div v-else>
                            <el-form :model="form" ref="form">
                              <el-form-item prop="location">
                                <el-input v-model="form.location" style="width: 200px;">
                                </el-input>
                                <el-button type="primary" icon="el-icon-check" @click="reviseNode()"></el-button>
                              </el-form-item>
                            </el-form>
                          </div>

                        </el-descriptions-item>

                      </el-descriptions>
                    </div>
                  </div>
                  <div class="left-bottom">
                    <div class="title">
                      <div class="title-icon"> <img src="@/assets/images/jiedianguanli_jiantou.png"></div>
                      <div class="title-name">宿主机信息</div>
                    </div>
                    <div class="content">
                      <el-descriptions class="margin-top" :column="2" style="margin: 10px 30px" border>
                        <el-descriptions-item>
                          <template slot="label">
                            操作系统
                          </template>
                          {{nodeObj.platform}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            指令架构
                          </template>
                          {{nodeObj.os_arch}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            时区设定
                          </template>
                          {{nodeObj.time_zone}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            ip地址
                          </template>
                          {{nodeObj.client_ip}}
                        </el-descriptions-item>
                        <el-descriptions-item v-if="nodeObj.net_info">
                          <template slot="label">
                            掩码地址
                          </template>
                          {{nodeObj.net_info[0].netmask}}
                        </el-descriptions-item>
                        <el-descriptions-item v-if="nodeObj.dns_info">
                          <template slot="label">
                            DNS地址
                          </template>
                          {{nodeObj.dns_info[0] == " "? '':nodeObj.dns_info[0]}}
                        </el-descriptions-item>
                        <el-descriptions-item v-if="nodeObj.net_info">
                          <template slot="label">
                            MAC地址
                          </template>
                          {{nodeObj.net_info[0].mac}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            硬件配置
                          </template>
                          <!-- {{nodeObj.cpu_num+"cpu"+'|'+ nodeObj.mem_total/(1024*3)+'内存'+'|'nodeObj.disk_total/(1024*3)+'磁盘' }} -->
                        </el-descriptions-item>

                      </el-descriptions>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="title">
                    <div class="title-icon"> <img src="@/assets/images/jiedianguanli_jiantou.png"></div>
                    <div class="title-name">蜜罐服务信息</div>
                  </div>
                  <div style="display:flex;align-items: center;margin-top:5px;margin-bottom:5px">
                    <div class="secondLevelTitle">模版名称：</div>
                    <div>
                      <el-form :model="form">
                        <el-form-item prop="mould_id">
                          <el-select v-model="form.mould_id" @change="reviseNode" size="mini"
                            popper-class='select-style' placeholder="请选择">
                            <el-option v-for="item in mould_ids" :key="item.mould_name" :label="item.mould_name"
                              :value="item.mould_id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </div>
                  </div>
                  <div class="secondLevelTitle">服务状态：</div>
                  <div>
                    <el-table :data="serviceState"
                      style="width: 90%;margin: 10px  auto 0px auto;border:1px solid rgba(17,18,34,0.13)">
                      <el-table-column prop="name" label="服务名称" width="180">
                      </el-table-column>
                      <el-table-column prop="port" label="监听端口" width="180">
                        <template slot-scope="scope">
                          <div v-if="index!=scope.$index">
                            {{scope.row.port}} <i class="el-icon-edit" @click="clickPort(scope.row,scope.$index)"></i>
                          </div>
                          <div style="display: flex;justify-content: space-between;" v-else>
                            <p style="margin: 0;height: 36px;line-height: 36px;">{{port[0]}} /</p>
                            <el-input-number controls-position="right" v-model="port[1]" style="width: 105px;">
                            </el-input-number>
                            <i class="el-icon-edit" style="height: 36px;line-height: 36px;"
                              @click="resPort(scope.row)"></i>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="https" label="协议传输">
                        <template slot-scope="scope">
                          <div>
                            <el-radio-group v-if="scope.row.class=='WEB服务'" v-model="scope.row.https"
                              @change="httpClick(scope.row)">
                              <el-radio label="false">http</el-radio>
                              <el-radio label="true">https</el-radio>
                            </el-radio-group>
                            <span v-else>- -</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="status" :formatter="isStatus" label="状态">
                        <template slot-scope="scope">
                          <span v-if="scope.row.status===2" style="color: green;font-weight:500">在线</span>
                          <span v-else-if="scope.row.status===1" style="color: green;font-weight:500">启用中</span>
                          <span v-else style="color: red;font-weight:500">离线</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button size="mini" @click.native.prevent="deleteRow(scope.$index, serviceState)">删除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="add"
                      style="width: 90%;margin: 0 auto;height:35px;border-bottom:1px solid rgba(17,18,34,0.13);border-left:1px solid rgba(17,18,34,0.13);border-right:1px solid rgba(17,18,34,0.13);display:flex;align-items: center;justify-content: center;background: #fff;">
                      <div style="width:15px;height:15px"> <img style="display: inline-block;width:100%;height: 100%"
                          src="@/assets/images/jiedianguanli_tianjia.png" alt=""></div>
                      <div style="margin-left:10px" @click="openDetail"> 添加蜜罐服务</div>
                    </div>
                  </div>
                  <div style="dispaly:flex">
                    <div class="honeyTheBaitStatus">
                      <span>失陷蜜饵状态：</span>
                      <el-tooltip class="item" effect="dark"
                        content="失陷蜜饵是部署在业务主机上的蜜饵。在主机失陷情况下，通过部署虚假的账号、本地证书等失陷蜜饵，诱导攻击者转移攻击目标，并触发失陷告警。" placement="top">
                        <i class="el-icon-question" />
                      </el-tooltip>
                    </div>
                    <div class="content">
                      <div class="item1">
                        <el-form :model="form">
                          <el-form-item prop="bait_id">
                            <el-select v-model="form.bait_id" @change="getAdress" placeholder="请选择" :disabled="disable">
                              <el-option v-for="item in honeyList" :key="item.id" :label="item.bait_name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                            </el-button>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="item">
                        <span v-if="windowText == ''">Windows <i class="el-icon-document-copy"></i></span>
                        <span v-else>Windows <i class="el-icon-document-copy" v-clipboard:copy="windowText"
                            v-clipboard:success="onCopy"></i></span>
                      </div>
                      <div class="item">
                        <span v-if="linuxText == ''">Linux <i class="el-icon-document-copy"></i></span>
                        <span v-else>Linux <i class="el-icon-document-copy" v-clipboard:copy="linuxText"
                            v-clipboard:success="onCopy"></i></span>
                      </div>
                      <div class="item">TCP/7878</div>
                      <div class="item1" style="margin-left: 10px;">
                        <el-form :model="form">
                          <el-form-item prop="bait_status">
                            <el-switch v-model="form.bait_status" @change="turnSwitch()" active-color="#13ce66"
                              inactive-color="#ff4949">
                            </el-switch>
                          </el-form-item>
                        </el-form>

                      </div>
                    </div>
                  </div>
                  <div class="wranning">
                    <div style="margin-top: 10px;"> <img
                        style="display:display: inline-block;width: 12px;height: 12px;margin-left:5px;"
                        src="@/assets/images/jiedianguanli_jinggao.png" alt=""> 注意</div>
                    <p style="margin:5px"> <span style="color:red">*</span> 使用之前，请确定相关服务端口策略已放通;</p>
                    <p style="margin:5px 5px 10px 5px"> <span style="color:red">*</span> 出于安全原因，蜜饵分发完毕后请关闭相关端口;</p>
                  </div>

                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="client_name" label="节点名称" align="center" :render-header="labelHead" width="180">
          </el-table-column>
          <el-table-column prop="name" label="节点流量" align="center" :render-header="labelHead">
            <template slot-scope="scope">
              <div style="height: 40px;width:100%；z-index:-9999;" @click="handle111(scope)"
                :ref="'echarts'+scope.row.client_id"></div>
            </template>
          </el-table-column>
          <el-table-column prop="client_ip" label="节点地址" align="center" :render-header="labelHead">
          </el-table-column>

          <el-table-column prop="platform" label="主机类型" align="center" :render-header="labelHead">
            <template slot-scope="scope">
              <div v-if="scope.row.platform == 'centos'">
                <img src="@/assets/images/linux.svg" alt="">
              </div>
              <div v-else>
                <img src="@/assets/images/windows-fill.svg" alt="">
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="节点状态" align="center" :render-header="labelHead">
            <template slot-scope="scope">
              <span v-if="scope.row.status===4" style="color: green;font-weight:500">在线</span>
              <span v-else-if="scope.row.status===3" style="color: red;font-weight:500">离线</span>
            </template>
          </el-table-column>

          <el-table-column prop="mould_name" label="模版名称" align="center" :render-header="labelHead">
            <template slot-scope="scope">
              <div v-if="scope.row.mould_name == ''">
                <span>- -</span>
              </div>
              <div v-else>
                {{scope.row.mould_name}}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" :render-header="labelHead" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.is_inner_client == false">
                <el-button type="text" style="color:red;font-weight:500" class="btnHover"
                  @click="expendHandle(scope.row)">
                  展开</el-button>
                <!-- <el-button type="text" style="color:red;font-weight:500" class="btnHover" v-else
                  @click="closeHandle(scope.row)">收起</el-button> -->
                <el-button type="text" class="btnHover" style="color:red;font-weight:500"
                  @click.stop="fnRemoveNodes(scope.row)">删除</el-button>
              </div>
              <div v-else>
                <el-button type="text" style="color:red;font-weight:500" class="btnHover"
                  @click="expendHandle(scope.row)">
                  展开</el-button>
                <el-button type="text" class="btnHover" style="color:red;font-weight:500" @click.stop="innerNode()"
                  v-if="scope.row.status==4">暂停</el-button>
                <el-button type="text" class="btnHover" style="color:red;font-weight:500" @click.stop="clickNode()"
                  v-else>启用
                </el-button>
              </div>
            </template>

          </el-table-column>
        </el-table>

      </div>
      <!-- 弹框完成 -->
    </div>
    <div class="pagination">
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.page_no" :limit.sync="queryParams.page_size"
        @pagination="fngetNodeList" />
    </div>
    <!-- 添加或修改用户配置对话框 -->
    <div class="node-dialog">
      <el-dialog title="添加节点" :visible.sync="open1" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="节点安装包：" prop="node_arch">
                <el-select v-model="form.node_arch" clearable style="width:300px" placeholder="节点安装包">
                  <el-option v-for="item in nodeInstallationPackage" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top:25px">
            <el-col :span="24">
              <el-form-item label="管理端地址：" prop="node_addr">
                <el-select v-model="form.node_addr" clearable style="width:300px" placeholder="管理端地址">
                  <el-option v-for="item in managementAddress" :key="item" :label="item" :value="item">
                  </el-option>
                  <div style="display:flex;align-items: center;">
                    <el-input placeholder="模糊查询ip" v-model="form.node_add" clearable size="small"
                      style="width: calc(100% - 90px);margin-right: 20px;height:25px;margin-left:20px;margin-bottom:10px" />
                    <div class="btnHover" @click="handleAdd" style="color: #e93636;font-size: 13px;font-weight: 500;">添加
                    </div>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
          <el-button @click="open1=false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增节点成功的提示 -->
    <el-dialog :title="this.form.node_arch" :visible.sync="open2" width="600px" append-to-body>
      <div class="dialog">
        <div class="dialog-text">
          <p class="el-icon-success p1"></p>
          <p class="p2">生成节点安装包成功</p>
          <p class="p3">在节点主机执行命令/脚本，可自动部署节点，并实现节点开机自启动</p>
        </div>
        <div class="dialog-copy">
          <div class="mt">
            <span>{{getNode}}</span><i class="el-icon-document-copy copy" v-clipboard:success="onCopy"
              v-clipboard:copy="getNode"></i>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open2=false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 新增模板管理 -->
    <div class="template-dialog-two">
      <el-dialog title="添加蜜罐服务" :visible.sync="open" width="48%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item prop="is_add">
            <div class="tranferbox">
              <div class="conbox">
                <div class="box-body">
                  <div class="titbox">
                    <span>全部服务 | 44</span>
                  </div>
                  <div class="wordbox">
                    <el-tree @check="getData" show-checkbox class="filter-tree" node-key="id" :data="fileArr"
                      v-model="form.is_add" :default-checked-keys="idArr" :props="defaultProps" ref="tree"></el-tree>
                  </div>
                </div>
              </div>
              <img src="@/assets/images/right.png" class="icon">
              <div class="conbox">
                <div class="box-body">
                  <div class="titbox">
                    <span v-if="keyarr.length<21">已选服务 | {{keyarr.length}}/20</span>
                    <span v-else>已选服务 | <span style="color: red;">{{keyarr.length}}</span>/20</span>
                  </div>
                  <div class="wordbox">
                    <ul>
                      <li v-for="(item,index) in keyarr" :key="index">
                        <div class="inli">
                          <i class="el-icon-s-custom"></i>
                          <span>{{item.label}}</span>
                          <i class="el-icon-close" @click="removeData(item)"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width: 100%;display:block; text-align: right;">
          <el-button @click="cancel1">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 新增结束 -->
    <div class="switch-dialog">
      <el-dialog title="蜜饵分发" :visible.sync="open3" width="30%">
        <div class="switch-content">
          <div class="switch-text">
            <ul>
              <li>
                <p class="one"><span class="pic"></span>脚本说明:</p>
                <p class="two">该脚本可使主机至指定蜜罐节点下载蜜饵并进行安装。</p>
              </li>
              <li>
                <p class="one"><span class="pic"></span>使用方法:</p>
                <p class="two">1.确认节点的7878端口已开启。复制安装命令在主机执行安装，确认文件下载成功</p>
                <p class="three">2.前往对应节点的详情页，关闭蜜饵功能。关闭7878端口。</p>
              </li>
              <li>
                <p class="one"><span class="pic"></span>数据说明:</p>
                <p class="two">蜜饵数据会更新到 账号资产-蜜饵数据, 可下载该文件并与实际监测数据做比对，一旦发现文件中的用户名密码被使用，即说明该账号的对应的主机已被攻陷，应立即阻断。</p>
              </li>
            </ul>
          </div>
          <div class="switch-notice">
            <p class="four"><span class="s1"><i class="el-icon-warning"></i>注意:</span>需确保蜜饵安装主机与节点端可以顺利通信。</p>
          </div>
          <div class="switch-serach">
            <p>蜜饵选择:</p>
            <el-form :model="form">
              <el-form-item prop="bait_id">
                <el-select v-model="form.bait_id" @change="getAdress" placeholder="请选择" :disabled="disable"
                  style="width: 100%;">
                  <el-option v-for="item in honeyList" :key="item.id" :label="item.bait_name" :value="item.id">
                  </el-option>
                </el-select>
                <!-- <el-button type="primary" icon="el-icon-check" @click="reviseNode" :disabled="disable"> -->
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="switch-copy">
            <ul>
              <li class="li1">
                <p>下拉指令</p>
              </li>
              <li class="li2">
                <span>windows:</span>
                <p>
                  {{windowText}}
                  <i class="el-icon-document-copy" v-clipboard:copy="windowText" v-clipboard:success="onCopy"></i>
                </p>
              </li>
              <li class="li3">
                <span>linux:</span>
                <p>
                  {{linuxText}}
                  <i class="el-icon-document-copy" v-clipboard:copy="linuxText" v-clipboard:success="onCopy"></i>
                </p>
              </li>
            </ul>

          </div>
        </div>
        <span slot="footer" class="switch-footer">
          <el-button @click="open3 = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  // import headerNavigation from '@/components/header'
  let echarts = require('echarts')
  import resize from '@/views/dashboard/mixins/resize'
  import {
    getTheNameOfTheTemplate,
    getNodeList,
    getTheNodeDetails,
    getDerive,
    deleteRemoveNodes,
    getTheNewNode,
    getMouldServices,
    getClentList,
    innerNode,
    getAdress,
    honeyBait,
    reviseNode,
    nodePackage,
    nodeAdress
  } from '@/api/clags/environment/node'
  import {
    getKbFormatting,
    getFormatFileSize
  } from '@/utils/ruoyi'
  export default {
    name: 'Index',
    mixins: [resize],
    // components: {
    //     headerNavigation
    // },
    data() {
      return {
        total: 0, //分页
        close: true, //展开/收起切换
        close1: true,
        disable: null, //禁用状态
        linuxText: '', //linux地址
        windowText: '', //window地址
        honeyList: [], //失陷蜜饵
        // 穿梭框数据展示
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        idArr: [], //默认选中节点
        fileArr: [], //添加蜜罐服务
        checkList: [], //左边数据集合
        keyarr: [], //选中数据集合
        tableData: [],
        arr: [],
        status: [{
            value: 0,
            label: '全部'
          },
          {
            value: 5,
            label: '升级失败'
          },
          {
            value: 3,
            label: '离线'
          },
          {
            value: 4,
            label: '在线'
          }
        ],
        flow: [{
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '24小时内无流量'
          },
          {
            value: 2,
            label: '24小时内有流量'
          }
        ],
        mould_ids: [],
        value: true,
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        // 遮罩层
        loading: false,
        // 要展开的行，数值的元素是row的key值
        expands: [],
        // 查询参数
        queryParams: {
          page_no: 1, //页数
          page_size: 10, //条数
          search: null, //搜索节点ip关键字
          sort: '', //排序规则
          order: '', //排序字段
          mould_ids: [], //模版id
          status: null, //节点状态：0 全部，3 离线， 4在线， 5 升级失败
          flow: null //节点流量：0 全部，1 24小时内无流量， 2 24小时内有流量
        },
        nodeList: [], //表格的初始化数组
        nodeObj: {}, //点击表格中的每一行，显示详情的对象
        serviceState: [], //服务状态的数组
        // 新增节点的弹出层标题
        title: '添加节点',
        // 新增节点的是否显示弹出层
        open: false,
        //新增节点成功后的弹出层标题
        open1: false,
        // 新增节点成功后的是否显示弹出层
        open2: false,
        // 失陷蜜饵switch
        open3: false,
        state: [], //删除子节点存放数组
        form: {
          node_addr: null,
          node_arch: null,
          node_add: null,
          client_id: undefined,
          location: null,
          mould_id: null,
          bait_id: null,
          client_ip: null,
          id: [],
          client_name: null,
          mould_name: null,
          bait_status: null,
          bait_name: null,
        },
        //节点安装包
        nodeInstallationPackage: [],
        //管理端地址
        managementAddress: [],
        buildState: [], //发送添加蜜罐
        flag: true, //控制编辑按钮
        flag1: true,
        is_inner_node_open: 1,
        getNode: '', //获取节点
        // 认证信息
        rules: {
          node_arch: [{
            required: true,
            message: ' ',
            trigger: 'change'
          }],
          node_addr: [{
            required: true,
            // message: '请选择一个管理端地址',
            message: ' ',
            trigger: 'change'
          }]
        },
        port: '',
        index: null,
      }
    },
    mounted() {
      this.init()
    },
    created() {
      this.fnTheNameOfTheTemplate()
      this.fnNodeAdress()
      this.fnNodePackage()
    },
    methods: {
      clickPort(row, index) {
        this.index = index
        this.port = row.port.split('/')
      },
      // 端口修改
      resPort(row) {
        row.port = this.port.join('/')
        let data = {
          client_id: this.form.client_id,
          services: this.serviceState
        }
        getClentList(data).then(res => {
          this.$notify({
            message: '修改成功',
            type: 'success'
          })
        })
        this.index = null
        console.log(this.port)
      },
      // http状态修改
      httpClick(row) {
        let data = {
          client_id: this.form.client_id,
          services: this.serviceState
        }
        getClentList(data).then(res => {
          this.$notify({
            message: '修改成功',
            type: 'success'
          })
        })
      },
      fnNodePackage() {
        nodePackage().then(res => {
          this.nodeInstallationPackage = res.data
        })
      },
      fnNodeAdress() {
        nodeAdress().then(res => {
          this.managementAddress = res.data
        })
      },
      clickInp1() {
        this.flag1 = false
      },
      clickInp() {
        this.flag = false
      },
      clickNode() {
        this.is_inner_node_open = 1
        let data = {
          is_inner_node_open: this.is_inner_node_open
        }
        innerNode(data).then(res => {})
        this.fngetNodeList()
      },
      // 启动/暂停
      innerNode() {
        this.is_inner_node_open = 0
        let data = {
          is_inner_node_open: this.is_inner_node_open
        }
        innerNode(data).then(res => {})
        this.fngetNodeList()
      },
      // switch转换
      turnSwitch() {
        if (this.form.bait_status == true) {
          this.disable = false
          this.open3 = true
        } else {
          this.form.bait_status == false ? 0 : 1
          this.disable = true
        }
        this.reviseNode()
      },
      // 修改节点信息
      reviseNode() {
        let data = {
          client_name: this.form.client_name, //节点名称
          mould_id: this.form.mould_id, //模版id
          location: this.form.location,
          client_id: this.form.client_id,
          bait_id: this.form.bait_id, //选择配置文件id
          bait_status: this.form.bait_status ? 1 : 0 //失陷蜜饵状态 0否1是
        }
        reviseNode(data).then(res => {})
        this.$notify({
          message: '修改成功',
          type: 'success'
        })
        this.flag = true
        this.flag1 = true
        this.fngetNodeList()
        this.getTheNodeDetails()
      },
      // 获取失陷节点地址
      getAdress() {
        if (this.form.bait_id !== 0) {
          let data = {
            bait_id: this.form.bait_id,
            ip: this.form.client_ip
          }
          getAdress(data).then(res => {
            this.linuxText = res.data.linux
            this.windowText = res.data.windows
          })
        } else {
          this.disable = true
        }
        // this.reviseNode()
      },
      // 复制成功回显
      onCopy() {
        this.$message({
          message: '恭喜你，复制成功！',
          type: 'success'
        })
      },
      // 添加节点
      submit() {
        this.$refs['form'].clearValidate()
        this.$refs['form'].validate(valid => {
          if (valid) {
            let data = {
              location: '',
              mould_id: '',
              node_addr: this.form.node_addr,
              node_arch: this.form.node_arch
            }
            getTheNewNode(data).then(res => {
              this.getNode = res.data.command
            })
            this.open1 = false
            this.open2 = true
          }
        })
      },
      // 添加蜜罐服务
      submitForm() {
        if (this.buildState.length < 21) {
          this.serviceState = this.buildState
          let data = {
            client_id: this.form.client_id,
            services: this.serviceState
          }
          getClentList(data).then(res => {})
          this.fnTheNameOfTheTemplate()
          this.open = false
        } else {
          this.openError()
          return false
        }
      },
      openError() {
        this.$notify.error({
          message: '最多应用20个蜜罐服务，已超出'
        })
      },
      // 遍历穿梭框数据
      getData() {
        this.keyarr = []
        this.checkList = this.$refs.tree.getCheckedNodes()
        if (this.checkList.length != 0) {
          for (var i = 0; i < this.checkList.length; i++) {
            if (!this.checkList[i].children) {
              this.form.is_add = this.checkList[i].is_add = true
              this.keyarr.push(this.checkList[i])
              this.buildState = this.keyarr
            }
          }
        } else {
          this.keyarr = []
        }
      },
      // 监听选中节点
      setCheckedNodes(arr) {
        this.$refs.tree.setCheckedNodes(arr)
      },
      // 移出节点
      removeData(data) {
        let checklist = this.keyarr
        for (var i = 0; i < checklist.length; i++) {
          if (checklist[i].label === data.label) {
            checklist.splice(i, 1)
          }
        }
        this.keyarr = checklist
        this.setCheckedNodes(this.keyarr)
      },
      // 删除子节点
      deleteRow(index, rows) {
        rows.splice(index, 1)
        let data = {
          client_id: this.form.client_id,
          services: this.serviceState
        }
        getClentList(data).then(res => {
          this.state = this.serviceState
        })
        this.getTheNodeDetails()
        this.fngetNodeList()
        this.fnTheNameOfTheTemplate()
      },
      // 穿梭框数据请求
      openDetail() {
        let data = {
          client_id: this.form.client_id
        }
        this.open = true
        getMouldServices(data).then(res => {
          this.fileArr = res.data.treeList
          this.idArr = res.data.cocher
          this.keyarr = res.data.cocherList
        })
      },
      // 时间戳转换
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      // 取消按钮
      cancel1() {
        this.buildState.length = this.serviceState.length
        this.open = false
      },
      cancel() {
        this.open = false
        this.open1 = false
        this.reset()
      },
      // 重置表单
      reset() {
        this.form = {
          node_addr: null,
          node_arch: null,
          node_add: null,
          client_id: undefined,
          location: null,
          mould_id: null
        }
      },
      //下拉框中将输入框的内容添加到下拉框中
      handleAdd() {
        this.managementAddress.push(this.form.node_add)
        this.form.node_add = null
      },

      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.page_no = 1
        this.fngetNodeList()
        this.getEcharts()
      },
      // 操作收起
      closeHandle(row) {
        this.$refs.expandstable.toggleRowExpansion(row)
        this.close = true
      },
      //**操作-- 展开按钮 展开表格中的行，显示详情 */
      closeHandle1(row) {
        this.$refs.expandstable.toggleRowExpansion(row)
        this.close1 = true
      },
      expendHandle(row) {
        this.$refs.expandstable.toggleRowExpansion(row)
        // this.close1 = true
      },

      /**导出按钮 */
      fnDerive() {
        getDerive(this.queryParams).then(res => {})
      },
      //数据转化 -->节点详情中的是否是https 回显单选按钮
      // isHttps (row, column) {
      //     const https = row.https
      //     if (https == 'flase') {
      //         return 1
      //     } else if (https == 'true') {
      //         return 2
      //     }
      // },
      //数据转化 --> 根据状态显示  【在线】或者是【离线】
      isStatus(row, column) {
        const status = row.status
        if (status == 2) {
          return '在线'
        } else if (status == 3) {
          return '离线'
        }
      },

      /**添加节点 */
      fnTheNewNode() {
        this.open1 = true
      },

      /***点击每一行的时候 只展开当前点击的行 */
      rowClick(row, event, column) {
        Array.prototype.remove = function(val) {
          let index = this.indexOf(val)
          if (index > -1) {
            this.splice(index, 1)
          }
        }

        if (this.expands.indexOf(row.client_id) < 0) {
          this.expands = []
          this.expands.push(row.client_id)
          let data = {
            client_id: row.client_id
          }
          getTheNodeDetails(data).then(res => {
            this.nodeObj = res.data
            this.serviceState = res.data.mould_status
            this.form.client_id = res.data.client_id
            this.form.bait_status = res.data.bait_status == 1 ? true : false
            this.form.client_name = res.data.client_name
            this.form.location = res.data.location
            this.form.bait_id = res.data.bait_id
            this.form.client_ip = res.data.client_ip
            this.form.bait_name = res.data.bait_name
            this.form.mould_id = res.data.mould_id
            this.form.mould_name = res.data.mould_name
            this.honeyBait()
            this.getAdress()
          })
        } else {
          this.expands.remove(row.client_id)
        }
      },
      // 详情
      getTheNodeDetails() {
        let data = {
          client_id: this.form.client_id
        }
        getTheNodeDetails(data).then(res => {
          this.nodeObj = res.data
          this.serviceState = res.data.mould_status
          this.form.client_id = res.data.client_id
          this.form.bait_status = res.data.bait_status == 1 ? true : false
          this.form.client_name = res.data.client_name
          this.form.location = res.data.location
          this.form.bait_id = res.data.bait_id
          this.form.bait_name = res.data.bait_name
          this.form.mould_id = res.data.mould_id
          this.form.mould_name = res.data.mould_name
        })
      },
      honeyBait() {
        // 获取失陷蜜饵
        honeyBait().then(res => {
          this.honeyList = res.data
          this.honeyList.forEach((item, index) => {
            this.form.id.push(item.id)
          })
        })
      },

      /**删除节点 */
      fnRemoveNodes(row) {
        let data = {
          client_id: row.client_id
        }
        this.$modal
          .confirm('是否确认删除')
          .then(function() {
            return deleteRemoveNodes(data)
          })
          .then(() => {
            this.$modal.msgSuccess('删除成功')
          })
          .catch(() => {})
      },

      /** 查询日常监督内外部检查发现问题列表 */
      fngetNodeList() {
        this.loading = true
        let data = {
          "page_no": this.queryParams.page_no, //页数
          "page_size": this.queryParams.page_size, //条数
        }
        getNodeList(data).then(response => {
          // this.auditList = response.rows;
          // this.total = response.total;
          this.nodeList = response.data.data
          this.total = response.data.total_num;
          this.loading = false
        })
      },

      /**获取模版名称接口 */
      fnTheNameOfTheTemplate() {
        getTheNameOfTheTemplate().then(res => {
          this.mould_ids = res.data
        })
      },

      /** 处理表格的表头部分，一行显示*/
      labelHead: function(h, {
        column,
        $index
      }) {
        let l = column.label.length
        let f = 16
        column.minWidth = f * (l + 2) //加上一个文字长度
        return h(
          'div', {
            class: 'table-head',
            style: {
              width: '100%'
            }
          },
          [column.label]
        )
      },
      /** 设置表格表头的公共样式*/
      handlemyclass: function(row, column, rowIndex, columnIndex) {
        return 'tableStyle'
      },
      /**给每一行添加样式，隐藏展开的箭头图标 */
      getRowClass(row, rowIndex) {
        let data = row.row
        let res = []
        if (data.list && data.list.length > 0) {
          res.push('row-expand-has')
          return res
        } else {
          res.push('row-expand-unhas')
          return res
        }
      },
      hadnleItemClick() {},
      handle111(scope) {},
      init() {
        this.fngetNodeList()
        this.getEcharts()
      },
      /**echarts图表 */
      getEcharts() {
        setTimeout(_ => {
          this.nodeList.forEach(e => {
            let maxNum = 0;
            let arr = e.flow_list
            let xData = [];
            let legendData = ["第一产业", "第三产业"]; //图例
            let firstIndustry = []; //第一产业
            let thirdIndustry = []; //第三产业
            e.flow_list.forEach(item => {
              xData.push(item.date_time);
              let bytes_recv = getKbFormatting(item.bytes_recv) * 1
              let bytes_send = getKbFormatting(item.bytes_send) * 1
              let byMax = 0;
              if (bytes_recv > bytes_send) {
                byMax = bytes_recv;
              } else {
                byMax = bytes_send;
              }

              if (byMax > maxNum) {
                maxNum = byMax;
              }
              firstIndustry.push(
                bytes_recv
              )
              thirdIndustry.push(
                bytes_send)

            })
            let myChart = echarts.init(this.$refs['echarts' + e.client_id]);
            myChart.setOption({

              grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
                top: '15%',
                bottom: '20%',
                containLabel: true,
              },
              tooltip: {
                show: true,
                position: [0, 40],
                trigger: 'axis',
                extraCssText: 'z-index:8;padding:0px',
                formatter: (item, arr) => {
                  var tipHtml = "";
                  tipHtml =
                    '<div  style="width:150px;height:90px;position:absolute;background:#fff;box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);padding:0px">' +

                    '<div style="position:absolute;top:7px;left:-16px;border-color:transparent #999999 transparent transparent;border-style:dashed dashed solid dashed;border-width:8px;">  </div>' +
                    '<div style="position:absolute;border-color:transparent #ffffff transparent transparent;border-style:dashed dashed solid dashed;border-width:8px;top:7px;left:-16px;"> </div>' +
                    '<div style="width:120px;height:10px;line-height:10px">' +
                    "</div>" +
                    '<div style="width:100%;height:100%;background:red>' +
                    '<p style="color:#ccc;font-size:0.15rem;display:flex" >' +
                    '<p style="color:#ccc;font-size:0.15rem; display: flex;align-items: center;justify-content: center;background:red;margin-top:-10px;background: #e9e9e9;border-bottom: 1px solid #cecece;" >' +

                    '<span style="color:#030303;;margin-left:10px;width:90px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                    item[0].axisValue +
                    "</span>" +
                    "</p>" +
                    '<p style="color:#ccc;font-size:0.15rem; display: flex;align-items: center;justify-content: center;" >' +
                    '<span style=" display: inline-block;width:15px;height:10px;background:  rgb(91, 143, 249);margin-left:10px;border-radius: 50%;">' +
                    "</span>" +
                    '<span style="color:#030303;;margin-left:10px;width:90px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                    '接收字节数' +
                    "</span>" +
                    '<span style="color:#030303;margin-left:-10px; width:90px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                    getFormatFileSize(item[0].value) +
                    "</span>" +
                    "</p>" +

                    '<p style="color:#ccc;font-size:0.15rem; display: flex;align-items: center;justify-content: center;" >' +
                    '<span style=" display: inline-block;width: 15px;height: 10px;background:  rgb(90, 216, 166);margin-left:10px;border-radius: 50%;">' +
                    "</span>" +
                    '<span style="color:#030303;;margin-left:10px;width:90px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                    '接收字节数' +
                    "</span>" +
                    '<span style="color:#030303;width:90px;margin-left:-10px; display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                    getFormatFileSize(item[1].value) +
                    "</span>" +
                    "</p>" +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                  return tipHtml;
                },


              },
              legend: {
                show: false
              },
              xAxis: [{
                type: 'category',
                axisTick: {
                  show: false,
                },

                axisLabel: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                data: xData,
              }],
              yAxis: [{
                  type: 'value',
                  name: '',
                  min: 0,
                  max: maxNum + 10240,
                  interval: 20,

                  axisLabel: {
                    show: false
                  },
                  axisTick: {
                    show: false,
                  },
                  axisLine: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  },
                  //坐标轴线样式
                },
                {
                  type: 'value',
                  name: '',
                  min: 0,
                  max: maxNum + 10240,
                  interval: 20,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisLabel: {
                    show: false
                  },
                  //坐标轴线样式
                  splitLine: {
                    show: false,

                  },
                }
              ],
              series: [{
                  name: "第一产业",
                  data: firstIndustry,
                  type: 'line',
                  smooth: true, //true曲线; false折线
                  symbol: "none",
                  areaStyle: {
                    //折线图颜色半透明
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(255,198,0, 0.5)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(255,198,0, 0.1)' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                },
                {
                  name: "第三产业",
                  data: thirdIndustry,
                  type: 'line',
                  smooth: true, //true曲线; false折线
                  symbol: "none",
                  areaStyle: {
                    //折线图颜色半透明
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(36,173,254, 0.5)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(52,112,252, 0.1)' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                }
              ]

            });
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          })
        }, 1000)
      },
    },
  }
</script>

<style scoped lang="scss">
  ::v-deep .pagination-container {
    height: 50px;
  }

  .pagination {
    padding: 30px;
    padding-top: 0;
  }

  .switch-dialog {
    .switch-copy {
      ul {
        list-style: none;
        background: #f0f0f0;
        padding: 0 10px;
      }

      .li1 {
        font-weight: 700;
      }

      .li3 {
        span {
          width: 78px;
        }

        p {
          margin: 0;
          padding-bottom: 10px;
        }
      }

      .li2 {
        span {
          width: 150px;
        }

        p {
          margin: 0;
          padding-bottom: 10px;
        }
      }

      .li1,
      .li2,
      .li3 {
        display: flex;
        margin-bottom: 10px;
        border-bottom: 1px solid #d8d8da;
        padding: 0 10px;
      }
    }

    .switch-content {
      height: 510px;
      overflow-y: auto;
    }

    .switch-footer {
      text-align: center;
    }

    .switch-notice {
      height: 40px;
      border: 1px solid #f70;
      background: #fffbf2;

      .four {
        margin: 0;
        padding-top: 10px;
        line-height: 15px;
      }

      .s1 {
        font-size: 15px;
        font-weight: 700;
        height: 15px;
        line-height: 15px;
        margin-right: 5px;
        margin-left: 10px;

        i {
          color: #ffa903;
          font-size: 18px;
          padding-right: 5px;
          height: 15px;
          line-height: 15px;
        }
      }
    }

    .switch-text {
      ul {
        list-style: none;
        background: #f0f0f0;
        padding: 15px;
      }

      .one {
        font-weight: 700;
      }

      .pic {
        display: inline-block;
        width: 5px;
        height: 15px;
        background: #f70;
        margin-right: 8px;
      }
    }
  }

  .dialog {
    .dialog-copy {
      margin-top: 15px;
      width: 100%;
      text-align: center;
      height: 50px;
      background-color: #fafafb;
      border: 1px solid #dcdcdf;
      font-size: 15px;

      .mt {
        margin-top: 3%;
      }

      .copy {
        margin-left: 20px;
      }
    }

    .dialog-text {
      .p1 {
        font-size: 65px;
        color: #73c738;
        margin: 0;
        text-align: center;
        width: 100%;
      }

      .p2 {
        color: #73c738;
        margin: 0;
        margin-top: 10px;
        text-align: center;
        width: 100%;
        font-size: 22px;
      }

      .p3 {
        margin: 0;
        margin-top: 10px;
        text-align: center;
        width: 100%;
        font-size: 15px;
      }
    }
  }

  .tranferbox {
    display: flex;
    height: 350px;

    .wordbox {
      height: 300px;
      overflow-y: auto;
    }

    ul {
      list-style: none;
      padding-left: 10px;
    }

    .titbox {
      margin-bottom: 10px;
      background: #f0f0f0;

      span {
        margin-left: 10px;
        font-size: 15px;
        font-weight: 600;
      }
    }

    .conbox:nth-child(1) {
      margin-left: 25px;
    }

    .conbox {
      width: 275px;
      background-color: #fff;
      border: 1px solid #f0f0f0;

      .box-body {
        height: 300px;
        background: #fff;
      }
    }

    .icon {
      width: 50px;
      height: 50px;
      margin: 20% 10px;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }

  ::v-deep .el-table .cell {
    overflow: visible;
  }

  ::v-deep .el-table {
    overflow: visible;
  }

  ::v-deep .el-table__body {
    overflow: visible;
  }

  ::v-deep .el-table__body-wrapper {
    overflow: visible;
  }

  .select-style {
    background: darkcyan;
  }

  .app-container {
    margin: 0px;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    padding: 0px !important;

    .content-wrap {
      width: 95%;
      margin: 0 auto;

      .search {
        background: #ffffff;
        display: flex;
        align-items: center;
        height: 7vh;

        .el-form {
          margin: 15px 0 15px 10px;
        }
      }

      .table-top {
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        height: 6vh;
        width: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .showWrap {
        display: flex;
        margin-top: -10px !important;
        background: #f4f4f4;
        padding-top: 15px;

        // height: 350px;
        .left {
          flex: 1;

          // background: pink;
          .left-bottom {
            // height: 50%;
            padding-bottom: 20px;

            // background: darkcyan;
            .title {
              display: flex;
              align-items: center;
              padding-left: 20px;

              .title-icon {
                width: 13px;
                height: 13px;
                margin-right: 7px;

                // background: darkgreen;
                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
              }

              .title-name {
                font-weight: 500;
                color: #000 !important;
              }
            }
          }

          .left-top {
            // height: 50%;
            // background: darkgoldenrod;
            padding-bottom: 20px;

            .title {
              display: flex;
              align-items: center;
              padding-left: 20px;

              .title-icon {
                width: 13px;
                height: 13px;
                margin-right: 7px;

                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }

                // background: darkgreen;
              }

              .title-name {
                font-weight: 500;
                color: #000 !important;
              }
            }
          }
        }

        .right {
          // background: deeppink;
          flex: 1;

          .title {
            display: flex;
            align-items: center;
            padding-left: 20px;

            .title-icon {
              width: 13px;
              height: 13px;
              margin-right: 7px;

              // background: darkgreen;
              img {
                display: inline-block;
                width: 100%;
                height: 100%;
              }
            }

            .title-name {
              font-weight: 500;
              color: #000 !important;
            }
          }

          .secondLevelTitle {
            padding-left: 40px;
            font-size: 13px;
            font-weight: 500;
          }

          .honeyTheBaitStatus {
            margin-top: 10px;
            margin-bottom: 10px;
            padding-left: 40px;
            font-size: 13px;
            font-weight: 500;
          }

          .content {
            display: flex;
            width: 90%;
            margin: 0 auto;
            line-height: 70px;
            border: 1px solid #dfe6ec;
            background: #fff;
            padding: 0px 20px;

            .item1 {
              margin-right: 15px;
              margin-top: 17px;
            }

            .item {
              flex: 1;
            }
          }

          .wranning {
            width: 55%;
            margin-left: 40px;
            margin-top: 10px;
            margin-bottom: 10px;
            background: #fffbf2;
            border: 1px solid rgba(255, 169, 3, 0.3);
          }
        }
      }
    }
  }

  .add {
    &:hover {
      color: red;
      font-weight: 500;
    }
  }

  .btnHover {
    &:hover {
      text-decoration: underline;
    }
  }

  ::v-deep .el-dialog__footer {
    padding: 15px;
    text-align: center;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }

  ::v-deep .el-dialog__header .el-dialog__title {
    font-weight: 700;
  }

  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  ::v-deep .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  ::v-deep .el-form-item--medium .el-form-item__label {
    width: 130px !important;
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }
</style>

<style lang="scss">
  .el-tooltip__popper {
    width: 200px;
  }

  .content .el-form-item__content {
    display: flex;
    justify-content: space-between;
  }

  .switch-dialog .el-dialog:not(.is-fullscreen) {
    margin-top: 0 !important;
  }

  .switch-dialog .el-dialog__body {
    padding: 0 20px 20px;
  }

  .el-popover.popoverDiv {
    padding: 0px;

    .title {
      background: #ececec;
      color: #000;

      padding-left: 10px;
      font-weight: 400;
      border-top: 1px solid rgb(229, 229, 229);
      border-bottom: 1px solid rgb(229, 229, 229);
    }

    .div2 {
      display: flex;
      margin-top: 15px;
      align-items: center;

      .top-left-icon {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        margin-right: 7px;
        border-radius: 50%;
        background: pink;
      }
    }

    .div3 {
      display: flex;
      margin-top: 15px;
      margin-bottom: 10px;
      align-items: center;

      .bottom-left-icon {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        margin-right: 7px;
        border-radius: 50%;
        background: pink;
      }
    }
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table .cell {
    overflow: visible;
  }

  .el-table {
    overflow: visible;
  }

  .el-table__body {
    overflow: visible;
  }

  .row-expand-unhas .el-table__expand-column {
    pointer-events: none;
  }

  .row-expand-unhas .el-table__expand-column .el-icon {
    visibility: hidden;
  }
</style>
