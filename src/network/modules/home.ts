// 导入默认的 Axios 实例
import { AxiosHeaders } from "axios";
import { DefaultAxios } from ".."
// 获取轮播图数据
export function getSwiperImg() {
  return DefaultAxios.get({
    url: "/api/swiper/img",
    headers: new AxiosHeaders(),
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}

// 获取民宿数据
export function getHomeData() {
  return DefaultAxios.get({
    url: "/home/hotSuggests",
    headers: new AxiosHeaders(),
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}

// 获取便捷导航数据
export function getHomeCategories() {
  return DefaultAxios.get({
    url: "/home/Categories",
    headers: new AxiosHeaders(),
  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}
// 获取热门精选数据
export function getHomeHouseList(PageNumber:number) {
  return DefaultAxios.get({
    url: "/home/houselist",
    headers: new AxiosHeaders(),
    params: {
      page: PageNumber
    },

  }).then(res => {
    return res; // 返回响应数据
  }).catch(err => {
    return err; // 返回错误信息
  });
}



