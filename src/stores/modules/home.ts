import {
  getHomeData,
  getHomeCategories,
  getHomeHouseList,
  getSwiperImg,
  getHomeHouseListCopy,
  getHomeHouseListAdd,
  getHomeHouseListDelete,
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
          Suggestion: "",
          Discount: "",
          Discount1: "",
          Discount2: "",
          DiscountMessage: "",
          Comment: 0,
          flay: 0,
        },
      ],
    },
    // 添加热门精选副本
    HomeHouseListCopy: [],
    // 添加热门精选副本全部数据
    HomeHouseListCopyS: [],
    // 获取历史记录
    HomeHouseListHistory: [],
    // 页数
    PageNumber: 1,
    id: cityStore?.CurrentCity.id, // 获取当前城市ID

    // 获取首页时间(存在本地避免刷新消失)
    StartDate: sessionStorage.getItem('startDate') || '',
    EndDate: sessionStorage.getItem('endDate') || '',
    Days: Number(sessionStorage.getItem('days')) || 0,
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
    async fetchAllHomeHouseList(flay: number | null, ids?: number | null) {
      const res = await getHomeHouseList(this.id, this.PageNumber, flay, ids);
      // 获取历史记录
      if (!ids && flay) {
        this.HomeHouseListHistory = res?.data;
      } else {
        // 获取首页热门List数据
        if (res?.data?.SelectedS) {
          this.HomeHouseList?.SelectedS?.push(...res.data.SelectedS);
        }
        this.PageNumber++; // 安全递增页数
      }
    },
    // 获取副本精选
    async fetchAllHomeHouseListCopy(id: number | null = null) {
      const res = await getHomeHouseListCopy(id);
      if (id) {
        // 解决数据重复
        const isDuplicate = this.HomeHouseListCopy?.some((item) => {
          return item?.id === res?.data?.id;
        });
        // 获取收藏数据的指定id
        if (!isDuplicate && res?.data && res?.data !== undefined) {
          this.HomeHouseListCopy?.push(res?.data);
        }
      } else {
       // 获取全部收藏数据
        this.HomeHouseListCopyS = res?.data;
      }
    },
    // 添加收藏
    async fetchAllHomeHouseListAdd(itemDates: object) {
      await getHomeHouseListAdd(itemDates);
    },
    // 删除收藏
    async fetchAllHomeHouseListDelete(id: number) {
      await getHomeHouseListDelete(id);
    },
  },
});

export { userHomeStore };
