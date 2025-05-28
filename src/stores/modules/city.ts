import { getCityData } from "@/network";
import { defineStore } from "pinia";
import type { City } from "../type/type";

const useCityStore = defineStore("city", {
  state: (): City => ({
    // 获取所有城市数据
    getCityAllD: {
      Domestic: {
        id: 1,
        title: "",
        cityInfo: [
          {
            cityId: 45,
            cityName: "",
            gangAoTai: "",
            hot: "true",
            latitude: "",
            longitude: "",
            pinYin: "",
          },
        ],
      },
      Abroad: {
        id: 1,
        title: "",
        cityInfo: [
          {
            cityId: 0,
            cityName: "",
            gangAoTai: "",
            hot: "true",
            latitude: "",
            longitude: "",
            pinYin: "",
          },
        ],
      },
    },

    // 获取当前选择的城市数据
    CurrentCity: {
      id: 45,
      cityName: "广州",
      longitude:'113.271',
      latitude:'23.1354',
    },
  }),
  actions: {
    // 获取所有城市数据
    async fetchAllCityDate() {
      const res = await getCityData();
      this.getCityAllD = res.data;
    },
  },
});

export { useCityStore };
