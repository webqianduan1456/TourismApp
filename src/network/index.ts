import YQaxios from "./request/axios";
import { BASE_URL, SET_TIMEOUT } from "./config";
import { AxiosHeaders } from "axios";
import UserDoling from "@/stores/common/loding";
const UserDolings = UserDoling()

// 导出所有模块到当前作用域
export * from "./modules/city"
// 可以在此创建多个实例
const DefaultAxios = new YQaxios({
  baseURL: BASE_URL,
  timeout: SET_TIMEOUT,
  headers: new AxiosHeaders(),
  interceptor: {
    // 请求拦截前成功与失败
    // 加载组件开启
    YQsucceedRequest: res => {
      UserDolings.CommonLoding = true
      return res
    },
    YQerrRequest: err => {
      return err
    },
    // 请求拦截响应成功与失败
    // 加载组件关闭
    YQsucceedRespones: res => {
      UserDolings.CommonLoding = false
      return res
    },
    YQerrRespones: err => {
      UserDolings.CommonLoding = false
      return err
    },
  }
})

// 需要传入对象
// DefaultAxios({
//   url?
// }).then((res)=>{}).then((err)=>{})
export {
  DefaultAxios
}
