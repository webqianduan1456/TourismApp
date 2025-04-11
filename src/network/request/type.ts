import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 自定义第三个参数拦截器
 interface YQ<T = AxiosResponse> {
  YQsucceedRequest?: (config: AxiosRequestConfig) => never;
  YQerrRequest?: (err: AxiosRequestConfig) => AxiosRequestConfig;
  YQsucceedRespones?: (res: T) => T;
  YQerrRespones?: (err: AxiosRequestConfig) => AxiosRequestConfig;
}

export interface YQRequestconfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: YQ<T>;
}
