import { getDetailsDate } from '@/network/modules/Details'
import { defineStore } from 'pinia'
import type { detail } from '../type/type'

const UserDetailStore = defineStore('Detail', {
  state: (): detail => ({
    // 详情商品数据
    DetailsDate: {
      mainPart: {
        topModule: {
          housePicture: {
            housePics: [
              {
                albumUrl: '',
                enumPictureCategory: 0,
                orderIndex: 0,
                pictureExplain: '',
                title: '',
                url: '',
              }
            ]
          },
        }
      }
    }
  }),
  actions: {
    // 详情商品数据请求
    async fetchAllDetailsDate(headers: number) {
      const res = await getDetailsDate(headers)
      this.DetailsDate = res.data.data
    }
  }
})

export default UserDetailStore
