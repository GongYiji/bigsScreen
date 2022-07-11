import request from "@/utils/request";

// 查询密饵数据
export function getDecoyData(query) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/alerts",
    method: "get",
    params: query,
  });
}

// 查询密饵状态
export function getDecoyState(data) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/stats",
    method: "get",
    data: data,
  });
}

// 密饵管理查询
export function getDecoyManage(query) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/info",
    method: "get",
    params: query,
  });
}

// 新建蜜饵
export function getDecoyBuild(data) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/info",
    method: "post",
    data: data,
  });
}

// 修改蜜饵
export function reviseDecoy(data) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/info",
    method: "put",
    data:data,
  });
}

// 导出蜜饵数据
export function exportDecoy(data) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/export",
    method: "post",
    data: data,
  });
}

// 删除蜜饵管理
export function deleteDecoy(data) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/info",
    method: "delete",
    data: data,
  });
}

// 删除蜜饵数据
export function deleteDecoyData(data) {
  return request({
    url: "/h1/api/threatEntity/asset/baits/alerts",
    method: "delete",
    data: data,
  });
}