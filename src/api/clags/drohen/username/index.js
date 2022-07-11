import request from "@/utils/request";

export function passwordsKeywordScan() {
    return request({
        // url: "/register",
        url: "/h1/api/threatEntity/asset/passwords/keyword",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function mgScanServiec() {
    return request({
        // url: "/register",
        url: "/h1/api/threatAwareness/service/list",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function scanServiecData() {
    return request({
        // url: "/register",
        url: "/h1/api/threatEntity/asset/passwords/stats",
        // headers: {
        //     isToken: false,
        // },
        method: "get",
    });
}

export function accountAssets(data) {
    return request({
        url: "h1/api/threatEntity/asset/passwords",
        // headers: {
        //     isToken: false,
        // },
        method: "post",
        data: data
    });
}

export function putKeyword(data) {
    return request({
        url: "/h1/api/threatEntity/asset/passwords/keyword",
        // headers: {
        //     isToken: false,
        // },
        method: "put",
        data: data
    });
}

export function exportApi(data) {
    return request({
        url: "/h1/api/threatEntity/asset/passwords/export",
        // headers: {
        //     isToken: false,
        // },
        method: "post",
        data: data
    });
}