import { AxiosHeaders } from "axios";
import { DefaultAxios } from "..";
// 全部订单
export function getAllOrder(Overall: number) {
  return DefaultAxios.get({
    url: "/order",
    headers: new AxiosHeaders(),
    params: {
      Overall,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 近期订单
export function getCompletedOrder() {
  return DefaultAxios.get({
    url: "/order/Completed",
    headers: new AxiosHeaders(),
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 待支付订单
export function getWaitingOrder() {
  return DefaultAxios.get({
    url: "/order/Waiting",
    headers: new AxiosHeaders(),
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 创建待支付订单
export function getCreateOrder(OrderData: object) {
  return DefaultAxios.post({
    url: "/order/CreateOrder",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      ...OrderData,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}

// 更新数据订单
export function getUpdateOrder(houseId: number) {
  return DefaultAxios.post({
    url: "/order/UpdateOrder",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      houseId,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
