// 黑盒接口
import request from "@/utils/request";

// 黑盒扫描-目标管理   查询
export const GetApiapp = () => {
  return request({
    method: "GET",
    url: "/q1/scan/blackBox/apiapp/index",
  });
};
