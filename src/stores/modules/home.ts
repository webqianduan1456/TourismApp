import { getHomeData, getHomeCategories, getHomeHouseList } from "@/network/modules/home";
import { defineStore } from "pinia";
// type

interface Home {
  HomeStayDate: [
    {
      tagText: {
        color: string
        background: {
          color: string
        }
        text: string
      }

    }
  ]
  HomeCategories: [
    {
      pictureUrl: string
      title: string
    }
  ]
  HomeHouseList: [
    {
      discoveryContentType: number,
      data: object
    }
  ]

  PageNumber: number
}
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
        data: {}
      }
    ],
    // 页数
    PageNumber: 1,
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

      const res = await getHomeHouseList(this.PageNumber)
      this.HomeHouseList.push(...res.data.data)
      this.PageNumber++ // 安全递增页数
      console.log(this.PageNumber)

    }
  }
})

export {
  userHomeStore
}
