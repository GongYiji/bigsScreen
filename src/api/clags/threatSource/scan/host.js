import request from "@/utils/request";

// 主机管理查询
export function getHostList(query) {
  return request({
    url: "/rzxsystem/hosts/list",
    method: "get",
    params:query
  });
}

// 主机管理新增
export function addHost(data) {
  return request({
    url: "/rzxsystem/hosts",
    method: "post",
    data: data,
  });
}

// 主机管理删除
export function deleteHost(query) {
  return request({
    url: "/rzxsystem/hosts",
    method: "delete",
    params:query
  });
}

// 主机管理修改修改
export function reviseHost(data) {
  return request({
    url: '/rzxsystem/hosts',
    method: 'put',
    data:data,
  })
}
