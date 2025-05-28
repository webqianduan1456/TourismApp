import {
  getHomeData,
  getHomeCategories,
  getHomeHouseList,
  getSwiperImg,
} from "@/network/modules/home";
import { defineStore } from "pinia";
import type { Home } from "../type/type";
import { useCityStore } from "./city";
const cityStore = useCityStore();
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
      cityId: 1,
      cityName: "",
      citiesArea: [
        {
          id: 0,
          area: "",
        },
      ],
    },
    // 获取海量房源数据图片
    HomeCategories: {
      mergedData: [
        {
          id: 0,
          title: "",
          img: "",
        },
      ],
    },
    // 热门精选
    HomeHouseList: {
      SelectedS: [
        {
          id: 0,
          productPrice: 0,
          houseId: 0,
          text: "",
          houseName: "",
          commentScore: 0,
          summaryText: "",
          location: "",
          finalPrice: 0,
          url: "",
          discoveryContentType: 0,
        },
      ],
    },
    // 页数
    PageNumber: 1,
    id: cityStore?.CurrentCity.id, // 获取当前城市ID
  }),
  actions: {
    // 获取轮播图
    async fetchAllSwiperDate() {
      const res = await getSwiperImg();
      this.SwiperImg = res.data;
    },
    // 民宿数据获取
    async fetchAllHomeData(id: number) {
      const res = await getHomeData(id);
      this.HomeStayDate = res.data;
    },
    // 海量房源数据图片
    async fetchAllHomeCategories() {
      const res = await getHomeCategories();
      this.HomeCategories = res.data;
    },
    // 热门精选List
    async fetchAllHomeHouseList() {
      const res = await getHomeHouseList(this.id, this.PageNumber);
      this.HomeHouseList?.SelectedS.push(...res.data.SelectedS);
      this.PageNumber++; // 安全递增页数
    },
  },
});

export { userHomeStore };
