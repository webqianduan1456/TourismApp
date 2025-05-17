<script setup lang="ts">
import UserDoling from '@/stores/common/loding';
import getAssetUrl from '@/utils/getAssetUrl';

const UserDolings = UserDoling()
const loding = () => {
  UserDolings.CommonLoding = false
}
</script>

<template>
  <!-- 界面加载中... -->
  <div class="loading" v-if="UserDolings.CommonLoding" @click="loding">
    <div class="loadingBox" :style="{ backgroundImage: `url(${getAssetUrl('loding.gif')})` }">
    </div>
  </div>
</template>

<style scoped lang="less">
.loading {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);

  .loadingBox {
    position: absolute;
    width:13.3333vw;
    height: 6.6667vw;
    background-size: 100% 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
