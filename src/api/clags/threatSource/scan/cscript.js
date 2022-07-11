import request from "@/utils/request";

// 脚本管理查询
export function getScriptList(query) {
  return request({
    url: "/rzxsystem/script/scritpList",
    method: "get",
    params: query
  });
}

// 命令集查询
export function getCommandList(query) {
  return request({
    url: "/rzxsystem/script/commandList",
    method: "get",
    params: query
  });
}

// 脚本管理新增
export function addScript(data) {
  return request({
    url: "/rzxsystem/script",
    method: "post",
    data: data,
  });
}

// 脚本管理删除
export function deleteScript(query) {
  return request({
    url: "/rzxsystem/script",
    method: "delete",
    params: query
  });
}

// 脚本管理修改修改
export function reviseScript(data) {
  return request({
    url: '/rzxsystem/script',
    method: 'put',
    data: data,
  })
}

// 命令集 新增
export function addCommand(data) {
  return request({
    url: "/rzxsystem/script/command",
    method: "post",
    data: data
  });
}
