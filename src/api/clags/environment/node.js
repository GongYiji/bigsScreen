import request from "@/utils/request";

// 获取【节点状态】页面 模版名称
export function getTheNameOfTheTemplate() {
  return request({
    url: "/h1/api/environmental/mould/list",
    method: "get",
  });
}

// 获取【节点状态】页面 节点查询
export function getNodeList(data) {
  return request({
    url: "/h1/api/environmental/clients",
    method: "post",
    data: data,
  });
}

// 获取【节点状态】页面 节点详情
export function getTheNodeDetails(query) {
  return request({
    url: "/h1/api/environmental/client",
    method: "get",
    params: query,
  });
}

// 获取【节点状态】页面 节点详情
export function getDerive(data) {
  return request({
    url: "/h1/api/environmental/clients/export",
    method: "post",
    data: data,
  });
}

// 获取【节点状态】页面 节点详情
export function deleteRemoveNodes(data) {
  return request({
    url: "/h1/api/environmental/client",
    method: "delete",
    data:data
  });
}

// 获取【节点状态】页面 添加节点
export function getTheNewNode(data) {
  return request({
    url: "/h1/api/environmental/node",
    method: "post",
    data: data,
  });
}

// 添加服务(删除修改服务只需调整参数即可)
export function getClentList(data) {
  return request({
    url: '/h1/api/environmental/client/services',
    method: 'post',
    data:data
  })
}

//获取模板内蜜罐数据详情
export function getMouldServices(query) {
  return request({
    url: '/h1/api/environmental/client/services',
    method: 'get',
    params: query,
  })
}

//内置节点启动或暂停
export function innerNode(data) {
  return request({
    url: '/h1/api/environmental/client/innerNode',
    method: 'post',
    data: data,
  })
}

// 获取Linux、Windows下发地址
export function getAdress(query) {
  return request({
    url: '/h1/api/environmental/asset/baits/command',
    method: 'get',
    params: query,
  })
}

// 失陷蜜饵
export function honeyBait() {
  return request({
    url: '/h1/api/environmental/asset/baits/name',
    method: 'get',
  })
}

// 修改节点
export function reviseNode(data) {
  return request({
    url: '/h1/api/environmental/client',
    method: 'put',
    data:data,
  })
}

//节点安装包
export function nodePackage() {
  return request({
    url: '/h1/api/environmental/arch/list',
    method: 'get',
  })
}

// //节点安装包
export function nodeAdress() {
  return request({
    url: '/h1/api/environmental/addr/list',
    method: 'get',
  })
}
