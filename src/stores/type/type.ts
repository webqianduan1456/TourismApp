// 城市类型
export interface City {
  getCityAllD: {
    Domestic: {
      id: number;
      title: string;
      cityInfo: [
        {
          cityId: number;
          cityName: string;
          gangAoTai: string;
          hot: string;
          latitude: string;
          longitude: string;
          pinYin: string;
        }
      ];
    };
    Abroad: {
      id: number;
      title: string;
      cityInfo: [
        {
          cityId: number;
          cityName: string;
          gangAoTai: string;
          hot: string;
          latitude: string;
          longitude: string;
          pinYin: string;
        }
      ];
    };
  };

  CurrentCity: {
    id: number;
    cityName: string;
    longitude: string;
    latitude: string;
  };
}

export interface Home {
  // 轮播图
  SwiperImg?: [
    {
      id: number;
      img_url: string;
      img_message: string;
    }
  ];
  // 民宿
  HomeStayDate?: {
    cityId: number;
    cityName: string;
    citiesArea: [
      {
        id: number;
        area: string;
      }
    ];
  };
  // 海量房源
  HomeCategories?: {
    mergedData: [
      {
        id: number;
        title: string;
        img: string;
      }
    ];
  };

  HomeHouseList?: {
    SelectedS: [
      {
        id: number;
        productPrice: number;
        houseId: number;
        text: string;
        houseName: string;
        commentScore: number;
        summaryText: string;
        location: string;
        finalPrice: number;
        url: string;
        discoveryContentType: number;
      }
    ];
  };

  PageNumber: number;
  id: number;
}

// HomeHouseList所有继承子类型
export interface HousingResourceS {
  HousingResourceData: {
    HousingResource: {
      id_Shop: number;
      topScroll: string;
      hotelLogo: string;
      hotelName: string;
      houseAllone: HouseAllone[];
      housefacilities: HouseFacility[];
      houserNotice: HouseNotice[];
      houseText1: HouseText1[];
      houseThree: HouseTag[];
      houseTwo: HouseRating[];
      houseUser: HouseUser[];
      housMessage: HouseMessage[];
    };
  };
  // 轮播图
  HouseKeyImgs: {
    HouseKeyImg: [
      {
        orderIndex: number;
        title: string;
        orderSum: number;
        houseimg: [
          {
            id: number;
            url: string;
          }
        ];
      }
    ];
  };
}

interface HouseAllone {
  id: number;
  title: string;
  introduction: string;
  text: string;
  tip: string;
}

interface HouseFacility {
  id: number;
  name: string;
  url: string;
  housefacilitieses: {
    id: number;
    Benefits1: string;
    Benefits2: string;
    Benefits3: string;
    Benefits4: string;
  }[];
}

interface HouseNotice {
  id: number;
  title: string;
  introduction: string;
}

interface HouseText1 {
  id: number;
  Recruitment: string;
  houseText: {
    id: number;
    text: string;
    textSpecial: string | null;
  }[];
}

interface HouseTag {
  id: number;
  text: string;
  textNumber: number;
}

interface HouseRating {
  id: number;
  text: string;
  textId: string;
}

interface HouseUser {
  id: number;
  userAvatars: string;
  checkInDate: string;
  memberLevelIcon: string;
  username: string;
}

interface HouseMessage {
  id: number;
  commentBrief: string;
  scoreTitle: string;
  totalCount: number;
  address: string;
  introduction: string;
}
