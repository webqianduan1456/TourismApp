import YQaxios from "./request/axios";
import { BASE_URL,SET_TIMEOUT } from "./config";
// 导出所有模块到当前作用域
export * from "./modules/city"
// 可以在此创建多个实例
const DefaultAxios = new YQaxios({
  baseURL:BASE_URL,
  timeout:SET_TIMEOUT,
})

// 需要传入对象
// DefaultAxios({
//   url?
// }).then((res)=>{}).then((err)=>{})
export {
  DefaultAxios
}
