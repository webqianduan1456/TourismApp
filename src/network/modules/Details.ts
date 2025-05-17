import { AxiosHeaders } from "axios";
import {DefaultAxios} from "..";

export function getDetailsDate(houseId: number) {
  return DefaultAxios.get({
    url: "/detail/infos",
    headers: new AxiosHeaders(),
    params: {
      houseId
    },
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}
