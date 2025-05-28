import { getDetailsDate } from "@/network/modules/Details";
import { defineStore } from "pinia";
import type { HousingResourceS } from "../type/type";

const UserDetailStore = defineStore("Detail", {
  state: (): HousingResourceS => ({
    // 详情商品数据
    HousingResourceData: {
      HousingResource: {
        id_Shop: 0,
        topScroll: "",
        hotelLogo: "",
        hotelName: "",
        houseAllone: [
          {
            id: 0,
            title: "",
            introduction: "",
            text: "",
            tip: "",
          },
        ],
        housefacilities: [
          {
            id: 0,
            name: "",
            url: "",
            housefacilitieses: [
              {
                id: 0,
                Benefits1: "",
                Benefits2: "",
                Benefits3: "",
                Benefits4: "",
              },
            ],
          },
        ],
        houseKeyimg: [
          {
            orderIndex: 0,
            url: "",
            title: "",
          },
        ],
        houserNotice: [
          {
            id: 0,
            title: "",
            introduction: "",
          },
        ],
        houseText1: [
          {
            id: 0,
            Recruitment: "",
            houseText: [
              {
                id: 0,
                text: "",
                textSpecial: null,
              },
            ],
          },
        ],
        houseThree: [
          {
            id: 0,
            text: "",
            textNumber: 0,
          },
        ],
        houseTwo: [
          {
            id: 0,
            text: "",
            textId: "",
          },
        ],
        houseUser: [
          {
            id: 0,
            userAvatars: "",
            checkInDate: "",
            memberLevelIcon: "",
            username: "",
          },
        ],
        housMessage: [
          {
            id: 0,
            commentBrief: "",
            scoreTitle: "",
            totalCount: 0,
            address: "",
            introduction: "",
          },
        ],
      },
    },
  }),
  actions: {
    // 详情商品数据请求
    async fetchAllDetailsDate(id: number) {
      const res = await getDetailsDate(id);
      this.HousingResourceData = res.data;
    },
  },
});

export default UserDetailStore;
