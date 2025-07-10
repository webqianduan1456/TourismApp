// 导入默认的 Axios 实例
import { AxiosHeaders } from "axios";
import { DefaultAxios } from "..";
// 获取轮播图数据
export function getSwiperImg() {
  return DefaultAxios.get({
    url: "home/swiperimg",
    headers: new AxiosHeaders(),
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 获取民宿数据
export function getHomeData(id: number) {
  return DefaultAxios.get({
    url: "/home/citiesArea",
    headers: new AxiosHeaders(),
    params: {
      id,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 获取便捷导航数据
export function getHomeCategories() {
  return DefaultAxios.get({
    url: "/home/resource",
    headers: new AxiosHeaders(),
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 获取热门精选数据
export function getHomeHouseList(id: number, PageNumber: number, ids?: number | null) {
  return DefaultAxios.get({
    url: "/home/cityHouseList",
    headers: new AxiosHeaders(),
    params: {
      id,
      PageNumber,
      ids,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 获取热门精选数据副本
export function getHomeHouseListCopy(id: number | null, userid: number) {
  return DefaultAxios.get({
    url: "/home/cityHouseListCopy",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    params: {
      id,
      userid,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 点击收藏进行添加
export function getHomeHouseListAdd(itemDates: { id: number }, userid: number) {
  return DefaultAxios.post({
    url: "/home/cityHouseListCopyAdd",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      ...itemDates,
      housid: itemDates.id,
      userid,
      id: null,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 取消收藏进行删除
export function getHomeHouseListDelete(id: number, userid: number) {
  return DefaultAxios.post({
    url: "/home/cityHouseListCopyDelete",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      id,
      userid,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 获取历史记录
export function GetDataHistory(userid: number) {
  return DefaultAxios.get({
    url: "/home/getHistory",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    params: {
      userid,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}

// 创建历史记录
export function AddDataHistory(itemDates: { id: number }, userid: number) {

  return DefaultAxios.post({
    url: "/home/AddHistory",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      ...itemDates,
      housid: itemDates.id,
      userid,
      id: null,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
