
import { getCityData } from "@/network";
import { defineStore } from "pinia";
// type
interface City {
  getCityAllD: {
    cityGroup:{
      title:string,
    }
  }
  CurrentCity: {
    cityName?: string;
  }
}

const useCityStore = defineStore('city', {
  state: (): City => ({
    // 获取所有城市数据
    getCityAllD: {
      cityGroup:{
        title: ''
      }
    },
    // 获取当前选择的城市数据
    CurrentCity: {
      cityName: '北京'
    },

  }),
  actions: {
    // 获取所有城市数据
    async fetchAllCityDate() {
      const res = await getCityData()
      this.getCityAllD = res.data.data
    }
  }
})


export {
  useCityStore
}
