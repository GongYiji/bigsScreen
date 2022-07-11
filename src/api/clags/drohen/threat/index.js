import request from "@/utils/request";

// 注册方法
export function killNode() {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/client/list",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function mgScene() {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/infos/stats",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function mgType() {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/service/list",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function killListData(data) {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/infos",
        // headers: {
        //     isToken: false,
        // },
        method: "post",
        data: data,
    });
}

export function killList(data) {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/infos/list",
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