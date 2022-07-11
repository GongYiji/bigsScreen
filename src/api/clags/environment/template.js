import request from '@/utils/request'

//模板查询
export function getMouldsList(data) {
  return request({
    url: '/h1/api/environmental/moulds',
    method: 'post',
    data:data
  })
}

//模板详细信息
export function getDetailedList(query) {
  return request({
    url:'/h1/api/environmental/mould',
    method:'get',
    params: query,
  })
}

//新增模板
export function addTemplate(data) {
  return request({
    url: '/h1/api/environmental/mould',
    method: 'post',
    data:data
  })
}

// 删除部门
export function delTemplate(data) {
  return request({
    url: '/h1/api/environmental/mould',
    method: "delete",
    data:data
  })
}

// 添加服务(删除修改服务只需调整参数即可)
export function getServeList(data) {
  return request({
    url: '/h1/api/environmental/mould/services',
    method: 'post',
    data:data
  })
}

// 修改模版信息（服务也在）
export function updateTemplate(data) {
  return request({
    url: '/h1/api/environmental/mould',
    method: 'put',
    data: data
  })
}

// 服务类型&监听端口
export function getMonitorList() {
  return request({
    url: '/h1/api/threatAwareness/service/list',
    method: 'get',
  })
}

//新增蜜罐服务
export function getExpandList() {
  return request({
    url: '/h1/api/environmental/service/expand',
    method: 'get',
  })
}

//获取模板内蜜罐数据详情
export function getMouldServices(query) {
  return request({
    url: '/h1/api/environmental/mould/services',
    method: 'get',
    params: query,
  })
}

// 树形菜单
export function getTree() {
  return request({
    url: '/h1/api/environmental/service/expand/tree',
    method: 'get',
  })
}