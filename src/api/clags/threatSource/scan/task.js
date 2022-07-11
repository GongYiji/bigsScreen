import request from "@/utils/request";

// 主机管理查询
export function getTaskList(query) {
  return request({
    url: "/rzxsystem/execute/list",
    method: "get",
    params:query
  });
}

// 主机管理新增
export function addTask(data) {
  return request({
    url: "/rzxsystem/execute",
    method: "post",
    data: data,
  });
}

// 主机管理删除
export function deleteTask(query) {
  return request({
    url: "/rzxsystem/execute",
    method: "delete",
    params:query
  });
}

// 主机管理执行
export function implementTask(data) {
  return request({
    url: '/rzxsystem/execute/start',
    method: 'post',
    data:data,
  })
}

// 主机管理预览
export function previewTask(query) {
  return request({
    url: '/rzxsystem/result/list',
    method: 'get',
    params:query,
  })
}
