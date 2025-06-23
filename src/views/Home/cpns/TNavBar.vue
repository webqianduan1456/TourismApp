<script setup lang="ts">
import router from '@/router';
import { UserMessage } from '@/stores/modules/login';
import { computed } from 'vue';
const UserMessages = UserMessage()
const text = computed(() => {
  return UserMessages.username ? UserMessages.username : '登录/注册'
})
const LoginShow = () => {
  router.push('/login')
}



</script>

<template>
  <div class="nav_title">
    <div class="nav_bar">
      <div class="nva_bar_text">
        大疆旅行
      </div>

    </div>
    <div class="register" @click="LoginShow">
      <van-image round width="7vw" height="7vw">
        <template v-slot:loading>
          <van-icon name="manager-o" color="#000000 !important" />
        </template>
      </van-image>
      <van-text-ellipsis :content="text" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/common/less/Home/HomeVariable.less";

.nav_title {
  position: relative;

  .nav_bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15vw;
    color: #ff5722;
    font-weight: 600;
    background: linear-gradient(90deg, rgb(146 165 232) 0%, rgb(70 255 116) 100%);

    .nva_bar_text {
      flex: 1;
      text-align: center;
      font-size: 3.3333vw;
    }
  }

  .register {
    position: absolute;
    top: 0;
    right: 2vw;
    display: flex;
    height: 100%;
    cursor: pointer;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;

    div {
      font-size: 2vw;
      font-weight: bold;
      color: #767676;
    }
  }
}
</style>
