import { getCityData } from "@/network";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
  state: () => ({
    // 获取所有城市数据
    getCityAllD: {
      Domestic: {
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
      cityName: "北京",
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
