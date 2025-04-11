<script setup lang="ts">
import getAssetUrl from '@/utils/getAssetUrl';
</script>

<template>
  <div class="nva_bar">
    <span></span>
    <div class="nva_bar_text">
      大疆旅行
    </div>
    <img :src="getAssetUrl('Travel.svg')" alt="">
  </div>
</template>

<style scoped lang="less">
@import "@/common/less/Home/HomeVariable.less";

.nva_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vw;
  color: red;
  font-weight: 600;
  background-color: aqua;
  padding: @cpn_padding;

  .nva_bar_text {
    font-size: 3.3333vw;
  }

  img {
    width: 3.3333vw;
    height: 3.3333vw;
    line-height: 6vw;
  }
}
</style>
