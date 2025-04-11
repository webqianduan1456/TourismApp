<script setup lang="ts">
import router from '@/router';
import { useCityStore } from '@/stores/modules/city';
import getAssetUrl from '@/utils/getAssetUrl';
import TNavBar from '@/views/Home/cpns/TNavBar.vue';
import StayDays from '@/views/Home/cpns/StayDays.vue'
import { ref } from 'vue';
import { userHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import HotPicks from '@/views/Home/cpns/HotPicks.vue';
const useCityStores = useCityStore()
const userHomeStores = userHomeStore()
userHomeStores.fetchAllHomeData()
userHomeStores.fetchAllHomeCategories()

const { HomeStayDate } = storeToRefs(userHomeStores)
// 获取当前用户位置
const LocationInfo = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log(res);

    },
    err => {
      console.log(err);
    },
  )
}
// 跳转指定城市
const CityJump = () => {
  router.push('/Search')
}
// defineEmits
const NewBeforeDates = ref('')
const NewBehindDates = ref('')
const StayDaysDates = (NewBeforeDate: string, NewBehindDate: string) => {
  NewBeforeDates.value = NewBeforeDate
  NewBehindDates.value = NewBehindDate
}

// 跳转住宿选着区
const ResidenceSearch = (BeforeDate: string, BehindDate: string) => {
  router.push({
    path: "/ResidenceSearch",
    query: {
      BeforeDate,
      BehindDate
    }
  })
}
// 景点查询
const getAttractions = ref('')

</script>

<template>

  <!-- 标题 -->
  <div>
    <TNavBar></TNavBar>
    <!-- 轮播图 -->
    <div class="imges">
      <img :src="getAssetUrl('xjiang.jpg')" alt="">
    </div>
    <!-- 位置 -->
    <div class="Location">

      <div class="city" @click="CityJump">
        <i :style="{ backgroundImage: `url(${getAssetUrl('Locations.svg')})` }"></i>
        <span>{{ useCityStores.CurrentCity.cityName }}</span>
      </div>
      <div class="CurrentlyLocation" @click="LocationInfo()">
        <span>位置</span>
        <i :style="{ backgroundImage: `url(${getAssetUrl('Location.svg')})` }"></i>
      </div>
    </div>
    <!-- 入驻时间,景点,便捷导航 -->
    <div class="Content">
      <!-- 入驻时间 -->
      <StayDays @StayDaysDate="StayDaysDates"></StayDays>
      <!-- 景点查询 -->
      <van-search left-icon="" v-model="getAttractions" shape="round" placeholder="关键字/位置/民宿名" />
      <div class="SearchContent">
        <!-- 选着地区 -->
        <div class="Contents">
          <template v-for="(item, index) in HomeStayDate" :key="index">
            <span :style="{
              color: item.tagText.color,
              background: item.tagText.background.color
            }">{{ item.tagText.text }}</span>
          </template>
        </div>
        <!-- 搜索按钮 -->
        <div class="Searches">
          <van-button color="orange" round block
            @click="ResidenceSearch(NewBeforeDates, NewBehindDates)">开始搜索</van-button>
        </div>
      </div>
      <!-- 便捷导航 -->
      <div class="Convenience">
        <template v-for="(item, index) in userHomeStores.HomeCategories" :key="index">
          <div class="ConvenienceContent">
            <img :src="item?.pictureUrl" alt="">
            <span>{{ item?.title }}</span>
          </div>
        </template>
      </div>
      <!-- 热门精选 -->
      <HotPicks></HotPicks>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/common/less/Home/HomeVariable.less";

.imges {
  height: 35vw;

  img {
    width: 100%;
    height: 100%;
  }
}

.Location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vw;
  padding: @cpn_padding;

  .city {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    i {
      display: block;
      width: 2.4vw;
      height: 2.4vw;
      background-size: cover;
    }

    span {
      transform: scale(0.7);
      cursor: pointer;
    }

  }

  .CurrentlyLocation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    i {
      display: block;
      width: 2.4vw;
      height: 2.4vw;
      background-size: cover;
    }
  }
}

.Content {

  .SearchContent {
    margin: 3.3333vw;

    .Contents {
      display: flex;
      flex-wrap: wrap;

      span {
        cursor: pointer;
        font-size: 2.4vw;
        margin: 2vw;
      }
    }

    .Searches {
      margin-top: 1.3333vw;
    }
  }
}

.Convenience {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3.3333vw;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: calc(1vw);
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: calc(0.5vw);
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  @media (max-width: 1024px) {
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .ConvenienceContent {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 3vw;

    img {
      width: 12vw;
      height: 12vw;
      border-radius: 50%;
    }

    span {
      font-size: 3vw;
      margin-top: 1vw;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
