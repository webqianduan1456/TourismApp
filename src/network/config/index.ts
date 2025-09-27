let BASE_URL: string = "https://api.yqqlike.xin";
const SET_TIMEOUT: number = 8000;
// http://codercba.com:1888/api
if (import.meta.env.MODE === "development") {
  // 开发环境
  BASE_URL = "https://api.yqqlike.xin";
} else {
  // 生产环境
  BASE_URL = "";
}
export { BASE_URL, SET_TIMEOUT };
// 注意:上面的开发环境的BASE_URL和默认地址都要相同也要同时写
