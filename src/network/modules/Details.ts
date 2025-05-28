import { AxiosHeaders } from "axios";
import {DefaultAxios} from "..";

export function getDetailsDate(id: number) {
  return DefaultAxios.get({
    url: "/home/cityHouse",
    headers: new AxiosHeaders(),
    params: {
      id
    },
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}
export function getDetaHouseKeyImg(id: number) {
  return DefaultAxios.get({
    url: "/home/cityHouseImg",
    headers: new AxiosHeaders(),
    params: {
      id
    },
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}
