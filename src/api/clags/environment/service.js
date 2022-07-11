import request from '@/utils/request'

// 查询服务
export function getServiceList(data) {
  return request({
    url: '/h1/api/environmental/services',
    method: 'post',
    data:data
  })
}

// 服务类型&监听端口
export function getList() {
  return request({
    url: '/h1/api/threatAwareness/service/list',
    method: 'get',
  })
}
