import {
  getHomeData,
  getHomeCategories,
  getHomeHouseList,
  getSwiperImg,
} from "@/network/modules/home";
import { defineStore } from "pinia";
import type { Home } from "../type/type";

const userHomeStore = defineStore("home", {
  state: (): Home => ({
    // 轮播图数据
    SwiperImg: [
      {
        id: 0,
        img_url: "",
        img_message: "",
      },
    ],
    // 民宿数据获取
    HomeStayDate: {
      cityId: 0,
      cityName: "",
      citiesArea: [
        {
          id: 0,
          area: "",
        },
      ],
    },
    // 热门数据获取
    HomeCategories: [
      {
        pictureUrl: "",
        title: "",
      },
    ],
    // 热门精选
    HomeHouseList: [
      {
        discoveryContentType: 0,
        data: {
          houseId: 0,
        },
      },
    ],
    // 页数
    PageNumber: 1,
  }),
  actions: {
    // 获取轮播图
    async fetchAllSwiperDate() {
      const res = await getSwiperImg();
      this.SwiperImg = res.data;
    },
    // 民宿数据获取
    async fetchAllHomeData() {
      const res = await getHomeData();
      this.HomeStayDate = res.data;
    },
    // 热门数据获取
    async fetchAllHomeCategories() {
      const res = await getHomeCategories();
      this.HomeCategories = res.data.data;
    },
    // 热门精选
    async fetchAllHomeHouseList() {
      const res = await getHomeHouseList((this.PageNumber = 1));
      this.HomeHouseList?.push(...res.data.data);
      this.PageNumber++; // 安全递增页数
    },
  },
});

export { userHomeStore };
