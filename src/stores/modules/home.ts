import { getHomeData, getHomeCategories, getHomeHouseList } from "@/network/modules/home";
import { defineStore } from "pinia";
import type { Home } from "../type/type";

const userHomeStore = defineStore('home', {
  state: (): Home => ({
    // 民宿数据获取
    HomeStayDate: [
      {
        tagText: {
          color: '',
          background: {
            color: ''
          },
          text: '',
        }

      }
    ],
    // 热门数据获取
    HomeCategories: [
      {
        pictureUrl: '',
        title: ''
      }
    ],
    // 热门精选
    HomeHouseList: [
      {
        discoveryContentType: 0,
        data: {
          houseId: 0,
        }
      }
    ],
    // 页数
    PageNumber:1,
  }),
  actions: {
    // 民宿数据获取
    async fetchAllHomeData() {
      const res = await getHomeData()
      this.HomeStayDate = res.data.data
    },
    // 热门数据获取
    async fetchAllHomeCategories() {
      const res = await getHomeCategories()
      this.HomeCategories = res.data.data
    },
    // 热门精选
    async fetchAllHomeHouseList() {
      const res = await getHomeHouseList(this.PageNumber = 1)
      this.HomeHouseList?.push(...res.data.data)
      this.PageNumber++ // 安全递增页数
    }
  }
})

export {
  userHomeStore
}
