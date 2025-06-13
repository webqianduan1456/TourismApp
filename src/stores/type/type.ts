export interface City {
  // 获取所有城市数据
  getCityAllD: {
    Domestic: {
      id: number;
      title: string;
      cityInfo: Array<{
        cityId: number;
        cityName: string;
        gangAoTai: string;
        hot: string;
        latitude: string;
        longitude: string;
        pinYin: string;
      }>;
    };
    Abroad: {
      id: number;
      title: string;
      cityInfo: Array<{
        cityId: number;
        cityName: string;
        gangAoTai: string;
        hot: string;
        latitude: string;
        longitude: string;
        pinYin: string;
      }>;
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
  // 轮播图数据
  SwiperImg: Array<{
    id: number;
    img_url: string;
    img_message: string;
  }>;

  // 民宿数据获取
  HomeStayDate: {
    cityId: number;
    cityName: string;
    citiesArea: Array<{
      id: number;
      area: string;
    }>;
  };

  // 获取海量房源数据图片
  HomeCategories: {
    mergedData: Array<{
      id: number;
      title: string;
      img: string;
    }>;
  };

  // 热门精选
  HomeHouseList: {
    SelectedS: Array<{
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
      Suggestion: string;
      Discount: string;
      Discount1: string;
      Discount2: string;
      DiscountMessage: string;
      Comment: number;
      flay: number;
    }>;
  };
  // 获取指定id热门精选副本
  HomeHouseListCopy?: Array<{
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
    Suggestion: string;
    Discount: string;
    Discount1: string;
    Discount2: string;
    DiscountMessage: string;
    Comment: number;
    flay: number;
    houseKeyimg: Array<{
      orderIndex: number;
      title: string;
      orderSum: number;
      cityId: number;
      houseimg: Array<{
        id: number;
        url: string;
      }>;
    }>;
  }>;
  // 获取热门精选副本全部数据
  HomeHouseListCopyS?: Array<{
    id: number;
    productPrice: number;
    houseId: number;
    text: string;
    houseName: string;
    commentScore: string;
    summaryText: string;
    location: string;
    finalPrice: number;
    url: string | null;
    discoveryContentType: number;
    Suggestion: string;
    Discount: string;
    Discount1: string;
    Discount2: string;
    DiscountMessage: string;
    Comment: number;
    flay: number;
    houseKeyimg: Array<{
      orderIndex: number;
      title: string;
      orderSum: number;
      cityId: number;
      houseimg: Array<{
        id: number;
        url: string;
      }>;
    }>;
  }>;

  // 获取历史记录
  HomeHouseListHistory?: Array<{
    id: number;
    productPrice: number;
    houseId: number;
    text: string;
    houseName: string;
    commentScore: string;
    summaryText: string;
    location: string;
    finalPrice: number;
    url: string | null;
    discoveryContentType: number;
    Suggestion: string;
    Discount: string;
    Discount1: string;
    Discount2: string;
    DiscountMessage: string;
    Comment: number;
    flay: number;
    houseKeyimg: Array<{
      orderIndex: number;
      title: string;
      orderSum: number;
      cityId: number;
      houseimg: Array<{
        id: number;
        url: string;
      }>;
    }>;
  }>;
  // 页数
  PageNumber: number;
  id: number;
  // 获取首页时间和天数
  StartDate: string;
  EndDate: string;
  Days: number;
}

export interface Detail {
  HousingResourceData: {
    HousingResource: {
      id_Shop: number;
      topScroll: string;
      hotelLogo: string;
      hotelName: string;
      houseAllone: Array<{
        id: number;
        title: string;
        introduction: string;
        text: string;
        tip: string;
      }>;
      housefacilities: Array<{
        id: number;
        name: string;
        url: string;
        housefacilitieses: Array<{
          id: number;
          Benefits1: string;
          Benefits2: string;
          Benefits3: string;
          Benefits4: string;
        }>;
      }>;
      houserNotice: Array<{
        id: number;
        title: string;
        introduction: string;
      }>;
      houseText1: Array<{
        id: number;
        Recruitment: string;
        houseText: Array<{
          id: number;
          text: string;
          textSpecial: null;
        }>;
      }>;
      houseThree: Array<{
        id: number;
        text: string;
        textNumber: number;
      }>;
      houseTwo: Array<{
        id: number;
        text: string;
        textId: string;
      }>;
      houseUser: Array<{
        id: number;
        userAvatars: string;
        checkInDate: string;
        memberLevelIcon: string;
        username: string;
      }>;
      housMessage: Array<{
        id: number;
        commentBrief: string;
        scoreTitle: string;
        totalCount: number;
        address: string;
        introduction: string;
      }>;
    };
  };
  HouseKeyImgs?: {
    HouseKeyImg?: Array<{
      orderIndex: number;
      title: string;
      orderSum: number;
      houseimg: Array<{
        id: number;
        url: string;
      }>;
    }>;
  };
}

export interface Order {
  AllOrder: Array<{
    id: number;
    title: string;
    url: string;
    StartTime: string;
    EndTime: string;
    totalPrice: number;
    Overall: number;
    houseId: number;
    StartTimeWeek: string;
    StartTimeTime: string;
    EndTimeWeek: string;
    EndTimeTime: string;
    time: number;
  }>;
  CompletedOrder: Array<{
    id: number;
    title: string;
    url: string;
    StartTime: string;
    EndTime: string;
    totalPrice: number;
    Overall: number;
    houseId: number;
    StartTimeWeek: string;
    StartTimeTime: string;
    EndTimeWeek: string;
    EndTimeTime: string;
    time: number;
  }>;
  WaitingOrder: Array<{
    id: number;
    title: string;
    url: string;
    StartTime: string;
    EndTime: string;
    totalPrice: number;
    Overall: number;
    houseId: number;
    StartTimeWeek: string;
    StartTimeTime: string;
    EndTimeWeek: string;
    EndTimeTime: string;
    time: number;
  }>;
}
