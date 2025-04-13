<script setup lang="ts">
import { useCityStore } from '@/stores/modules/city';
import router from '@/router';
import getAssetUrl from '@/utils/getAssetUrl';

const useCityStores = useCityStore();

// 获取当前用户位置
const LocationInfo = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log('当前位置:', res);
    },
    err => {
      console.error('无法获取当前位置:', err);
    },
  );
};

// 跳转指定城市
const CityJump = () => {
  const cityName = useCityStores.CurrentCity.cityName;
  router.push({ path: '/Search', query: { city: cityName } });
};
</script>

<template>
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
</template>

<style scoped lang="less">
.Location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vw;
  padding: 1vw;

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
</style>
