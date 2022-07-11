import request from "@/utils/request";

// 通知配置 syslog新增
export function addSyslog(data) {
  return request({
    url: "/alarm/notic/insertNotice",
    method: "post",
    data:data,
  });
}

// 通知配置 syslog测试
export function testSyslog(data) {
  return request({
    url: "/alarm/notic/test",
    method: "post",
    data:data,
  });
}

// 通知配置 删除
export function deleteNotice(query) {
  return request({
    url: "/alarm/notic/delNotice",
    method: "delete",
    params: query,
  });
}

// 通知配置 callback新增
export function addCallback(data) {
  return request({
    url: "/alarm/notic/insertNotice",
    method: "post",
    data:data,
  });
}

// 通知配置 callback测试
export function testCallback(data) {
  return request({
    url: "/alarm/notic/test",
    method: "post",
    data:data,
  });
}

// 通知配置 email新增
export function addEmail(data) {
  return request({
    url: "/alarm/notic/insertNotice",
    method: "post",
    data:data,
  });
}

// 通知配置 email测试
export function testEmail(data) {
  return request({
    url: "/alarm/notic/test",
    method: "post",
    data:data,
  });
}

// 通知配置  修改
export function reviseNotice(data) {
  return request({
    url: '/alarm/notic/updateNotice',
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
