export interface City {
  getCityAllD: {
    Domestic: {
      id: number;
      title: string;
      cityInfo: [
        {
          cityId: number;
          cityName: "string";
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
          cityName: "string";
          gangAoTai: string;
          hot: string;
          latitude: string;
          longitude: string;
          pinYin: string;
        }
      ];
    };
  };

  CurrentCity?: {
    cityName?: string;
  };
}

export interface Home {
  SwiperImg?: [
    {
      id: number;
      img_url: string;
      img_message: string;
    }
  ];
  HomeStayDate?: [
    {
      tagText: {
        color: string;
        background: {
          color: string;
        };
        text: string;
      };
    }
  ];
  HomeCategories?: [
    {
      pictureUrl: string;
      title: string;
    }
  ];
  HomeHouseList?: [
    {
      discoveryContentType: number;
      data: {
        houseId: number;
      };
    }
  ];

  PageNumber?: number;
}

export interface detail {
  DetailsDate?: {
    mainPart?: {
      topModule?: {
        housePicture?: {
          housePics?: [
            {
              albumUrl?: string;
              enumPictureCategory?: number;
              orderIndex?: number;
              pictureExplain?: string;
              title?: string;
              url?: string;
            }
          ];
        };
        commentBrief?: {
          commentBrief?: string;
          commentBriefV2?: string | null;
          commentTabType?: number;
          healthFlag?: number;
          healthText?: string;
          overall?: number;
          scoreTitle?: string;
          sort?: string;
          totalCount?: number;
          totalCountStr?: string;
        };
        houseName?: string;
        houseTags?: Array<{
          aloneLine?: boolean;
          childTags?: Array<string>;
          tagCode?: string;
          tagDesc?: string;
          tagLink?: string;
          tagPic?: string;
          tagText?: {
            background?: {
              color?: string;
              gradientColor?: string | null;
              image?: string | null;
            };
            text?: string;
          };
          border?: string | null;
          color?: string;
          tips?: string | null;
        }>;
        nearByPosition?: {
          address?: string;
        };
      };
      dynamicModule?: {
        // 设备信息
        facilityModule?: {
          houseFacility?: {
            facilitySort?: [number];
            houseFacilitys?: [
              {
                facilitys?: [
                  {
                    deleted: true;
                    icon: string;
                    isDeleted: boolean;
                    name: string;
                    orderIndex: number;
                    tip: string | null;
                  }
                ];
                groupId?: number;
                groupName?: string;
                icon?: string;
              }
            ];
          };
        };
        // 房东介绍
        landlordModule?: {
          businessType?: number;
          hotelId?: number;
          hotelLogo?: string;
          hotelName?: string;
          hotelSummary?: [];
          hotelTags?: [
            {
              aloneLine?: boolean;
              childTags?: null | string | number;
              tagCode?: number;
              tagDesc?: null | string | number;
              tagLink?: null | string | number;
              tagPic?: null | string | number;
              tagText?: {
                background?: string;
                border?: string;
                color?: string;
                text?: string;
                tips?: null | string | number;
              };
            }
          ];
          isReplyTimeMoreThan5Min?: boolean;
          landlordLevel?: number;
          landlordLevelUrl?: string;
          landlordTag?: [];
          topScroll?: string | number;
        };
        // 评价信息
        commentModule?: {
          comment?: {
            checkInDate?: string;
            commentDetail?: string;
            commentTopicList?: string | number | boolean;
            commentTrySleepIconUrl?: string | number | boolean;
            commentTrySleepText?: string | number | boolean;
            goodCommentUrl?: string | number | boolean;
            houseName?: string;
            location?: string | number | boolean;
            memberLevelIcon?: string;
            overall?: number;
            pictureList?: string | number | boolean;
            scoreTags?: [
              {
                blod?: number;
                color?: string;
                focus?: string | number | boolean;
                highLight?: number;
                icon?: string | number | boolean;
                introduction?: string | number | boolean;
                marketActivityId?: number;
                maskTagText?: string | number | boolean;
                memberLevelStyle?: string | number | boolean;
                memberTitle?: string | number | boolean;
                tip?: string | number | boolean;
                title?: string;
                titleType?: number;
              }
            ];
            userAvatars?: string;
            userName?: string;
          };
          commentAvatarsLimit?: [];
          commentTabType?: number;
          commentTagVo?: [
            {
              backgroundColor?: string;
              borderColor?: string;
              color?: string;
              focusColor?: string;
              selectParam?: string;
              selected?: number;
              text?: string;
              texts?: [string];
            }
          ];
          evaluationModule?: {
            data?: [];
            moreNavigateUrl?: string;
            totalCount?: number;
          };
          overall?: number;
          scoreTitle?: string;
          subScores?: [string];
          subScoresFocus?: [
            {
              focusText?: string;
              text?: string;
            }
          ];
          totalCount?: number;
          totalCountStr?: string;
        };
        // 预定须知
        rulesModule: {
          cancelRules?: [
            {
              backColor?: string;
              introduction?: string;
              isDeleted?: null | string | number;
              strDate?: null | string | number;
              strTime?: null | string | number;
              tip?: string;
              tipColor?: string;
            }
          ];
          checkInRules?: [
            {
              checkInRuleFloat?: null | string | number;
              items?: [
                {
                  introduction?: string;
                  isDeleted?: boolean;
                  textLink?: null | string | number;
                  tip?: string;
                }
              ];
              title?: string;
            }
          ];
          checkinOtherInfo?: [
            {
              checkInRuleFloat?: null | string | number;
              items?: [
                {
                  introduction?: string;
                  isDeleted?: null | string | number;
                  textLink?: null | string | number;
                  tip?: string;
                }
              ];
              title?: string;
            }
          ];
          orderRules?: [
            {
              color?: string;
              deleted?: boolean;
              icon?: string | number | null;
              introduction?: string;
              link?: string | number | null;
              loginFlag?: boolean;
              tips?: string | number | null;
              title?: string;
            }
          ];
        };
        positionModule: {
          latitude: number;
          longitude: number;
        };
      };
      introductionModule?: {
        blod: boolean;
        color: string | null;
        focus: string | null;
        highLight: string | null;
        icon: string | null;
        introduction: string;
        marketActivityId: number;
        maskTagText: string | null;
        memberLevelStyle: string | null;
        memberTitle: string | null;
        tip: string | null;
        title: string;
        titleType: number;
      };
    };
  };
}

// 轮播图
