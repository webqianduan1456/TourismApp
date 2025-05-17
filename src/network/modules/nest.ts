import { AxiosHeaders } from "axios";
import {DefaultAxios} from "..";

export function getNest(filename: string) {
  return DefaultAxios.get({
    url: "/user/img",
    headers: new AxiosHeaders(),
    params: {
      filename
    },
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}
