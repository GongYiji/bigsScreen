import request from "@/utils/request";

// 告警策略 查看详情
export function getStrategyList(query) {
  return request({
    url: "/alarm/policies/getPolicies",
    method: "get",
    params: query,
  });
}

// 告警策略 删除
export function deleteStrategy(query) {
  return request({
    url: "/alarm/policies/deletePolicies",
    method: "delete",
    params: query,
  });
}

// 告警策略 添加
export function insetStrategy(data) {
  return request({
    url: "/alarm/policies/insertPolicies",
    method: "post",
    data: data,
  });
}

// 告警策略  修改节点
export function reviseStrategy(data) {
  return request({
    url: '/alarm/policies/updatePolicies',
    method: 'put',
    data: data,
  })
}

// 通知配置 查询
export function getNoticeList(query) {
  return request({
    url: "/alarm/notic/getNotice",
    method: "get",
    params: query,
  });
}