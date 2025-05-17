import type {  AxiosResponse, AxiosError ,InternalAxiosRequestConfig,AxiosRequestHeaders} from "axios";

// 自定义拦截器接口
interface YQ<T = AxiosResponse> {
  // 请求成功拦截器
  YQsucceedRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  // 请求失败拦截器
  YQerrRequest?: (error: AxiosError) => Promise<AxiosError> | AxiosError;
  // 响应成功拦截器
  YQsucceedRespones?: (response: T) => T;
  // 响应失败拦截器
  YQerrRespones?: (error: AxiosError) => Promise<AxiosError> | AxiosError;
}

// 扩展 InternalAxiosRequestConfig，添加自定义拦截器
export interface YQRequestconfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
  headers: AxiosRequestHeaders;
  interceptor?: YQ<T>;
}
