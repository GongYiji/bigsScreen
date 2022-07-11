import request from "@/utils/request";

export function queryNodeInfos() {
    return request({
        url: "/h1/api/threatAwareness/client/list",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function queryProtocolType() {
    return request({
        url: "/h1/api/threatAwareness/scanners/type/list",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function scanQueryFn(data) {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/scanners",
        // headers: {
        //     isToken: false,
        // },
        method: "post",
        data: data,
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