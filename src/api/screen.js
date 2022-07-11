// 大屏可视化 接口
import request from "@/utils/request";

// 本地情报数据
export const InfoLocalCloud = () => {
  return request({
    method: "GET",
    url: "/h1/api/largescreen/index/info_local_cloud",
  });
};

// 本地捕获ip echars格式
export const LocalDataIp = () => {
  return request({
    method: "GET",
    url: "/h1/api/largescreen/index/local_data_ip",
  });
};

// 中间获取节点数据

export const CenterClients = () => {
  return request({
    method: "GET",
    url: "/h1/api/largescreen/index/clients",
  });
};

// 本地数据捕获
export const localData = () => {
  return request({
    method: "GET",
    url: "/h1/api/largescreen/index/local_data",
  });
};
// 频繁攻击蜜罐
export const Getservices = () => {
  return request({
    method: "GET",
    url: "/h1/api/largescreen/index/services",
  });
};

// 获取内置节点数据
export const InnerClient = () => {
  return request({
    method: "GET",
    url: "/h1/api/largescreen/index/inner_client",
  });
};
