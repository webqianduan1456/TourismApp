import axios from "axios";
import type { AxiosInstance } from "axios";
import type { YQRequestconfig } from "./type";



class YQaxios {
  instance: AxiosInstance;
  // 封装YQaxios实例
  constructor(config: YQRequestconfig) {
    this.instance = axios.create(config);
    // 拦截器
    // use里面是两个成功和失败的初始默认函数(查看DefaultAxios一目了然)
    this.instance.interceptors.request.use(config?.interceptor?.YQsucceedRequest, config.interceptor?.YQerrRequest);
    this.instance.interceptors.response.use(config?.interceptor?.YQsucceedRespones, config.interceptor?.YQerrRespones);
  }

  // 二层封装
  request<T = AxiosInstance>(config: YQRequestconfig<T>) {
    // 判断用户有没有调用config.interceptor?.YQsucceedRequest有没有值
    // 用户调用就有值,没调用就没有值
    if (config.interceptor?.YQsucceedRequest) {
      // 将YQsucceedRequest值赋值到request里面
      config = config.interceptor.YQsucceedRequest(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<AxiosInstance, T>(config)
        .then((res) => {
          if (config.interceptor?.YQsucceedRespones) {
            res = config.interceptor.YQsucceedRespones(res);
          }
          resolve(res);
        })
        .catch((err) => {
          // 改变加载状态
          reject(err);
        });
    });
  }

  // get请求
  get<T = AxiosInstance>(config: YQRequestconfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  // post请求
  post<T = AxiosInstance>(config: YQRequestconfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
}

export default YQaxios;
