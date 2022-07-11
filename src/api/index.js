import request from "@/utils/request";

// 获取【首页】节点状态，蜜罐状态
export function getNodeAndHoneyPotState() {
  return request({
    url: "/h1/api/homepage/dashboard/deployment_status",
    method: "get",
  });
}

// 获取【首页】攻击链的信息
export function getAttackChainInfo(query) {
  return request({
    url: "/h1/api/homepage/dashboard/attack_chain",
    method: "get",
    params: query,
  });
}
