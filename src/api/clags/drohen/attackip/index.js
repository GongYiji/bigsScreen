import request from "@/utils/request";

export function mgScene() {
    return request({
        url: "/h1/api/threatAwareness/infos/stats",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

// 攻击来源查询
export function SourceOfAttack(data) {
    return request({
        url: "/h1/api/threatEntity/ipaddress/list",
        // headers: {
        //     isToken: false,
        // },
        method: "post",
        data: data,
    });
}

// 收缩条件
export function shousuoTJ() {
    return request({
        url: "/h1/api/threatEntity/ipaddress/stats",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

// 自定义情报
export function customIntelligenceApi(data) {
    return request({
        url: "/h1/api/threatEntity/ipaddress/custom",
        // headers: {
        //     isToken: false,
        // },
        method: "put",
        data: data
    });
}

// 添加白名单
export function addWhiteListApi(data) {
    return request({
        url: "/h1/api/threatEntity/ipaddress/white",
        // headers: {
        //     isToken: false,
        // },
        method: "post",
        data: data
    });
}

// 取消白名单
export function cancelWhiteListApi(data) {
    return request({
        url: "/h1/api/threatEntity/ipaddress/white",
        // headers: {
        //     isToken: false,
        // },
        method: "DELETE",
        data: data
    });
}

// 删除攻击来源
export function deleteAttackSourceApi(data) {
    return request({
        url: "/h1/api/threatEntity/ipaddress",
        // headers: {
        //     isToken: false,
        // },
        method: "DELETE",
        data: data
    });
}

// 溯源信息修改
export function modificationOfTraceabilityInformationApi(data) {
    return request({
        url: "/h1/api/threatEntity/ipaddress/person",
        // headers: {
        //     isToken: false,
        // },
        method: "put",
        data: data
    });
}

// 标记Api
export function signKillFromApi(data) {
    return request({
        url: "/h1/api/threatEntity/info/mark",
        // headers: {
        //     isToken: false,
        // },
        method: "put",
        data: data
    });
}