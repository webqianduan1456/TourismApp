<script setup lang="ts">
defineOptions({
  name: 'UserLogin'
})
import router from '@/router'
import { UserMessage } from '@/stores/modules/login'
import getAssetUrl from '@/utils/getAssetUrl.ts'
import { ref } from 'vue'
const UserMessages = UserMessage()
// 账号,密码
const username = ref('')
const password = ref('')
// 返回首页
const ToHome = () => {
  router.push('./home')
}
// 注册
const register = () => {
  router.push('/register')
}
// 提交from
const onSubmit = async (values: { username: string, password: string }) => {
  if (UserMessages.token && UserMessages.token !== null && UserMessages.username == values.username) return
  const res = await UserMessages.fetchLogin(values.username, values.password)
  if (res?.status === 404) return
  router.push('./home')
}
</script>

<template>
  <!-- 登录界面 -->
  <div class="login">
    <!-- 顶部导航 -->
    <van-nav-bar style="background-color: transparent; top: 3vw;">
      <!-- 左侧返回首页 -->
      <template #left>
        <div style="display: flex; justify-content: space-between; flex-direction: column;" @click="ToHome">
          <van-icon name="wap-home" size="8vw !important" color="#4e524f !important" />
          <div style="color: black;">首页</div>
        </div>
      </template>
      <!-- 右侧注册 -->
      <template #right>
        <div style="font-size: large;" @click="register">注册</div>
      </template>
    </van-nav-bar>
    <!-- 旅游图标log -->
    <div class="log">
      <img :src="getAssetUrl('Travel.svg')" alt="">
    </div>
    <!-- 底部所有内容 -->
    <div class="form">
      <!-- 文本 -->
      <div class="title">大疆旅游</div>
      <!-- 账号和密码 -->
      <van-form @submit="onSubmit">
        <van-field class="rounded" v-model="username" type="text" name="username" autocomplete="username" center
          placeholder="请输入用户名">
          <template #left-icon>
            <van-icon name="manager-o" />
          </template>
        </van-field>

        <van-field class="rounded" v-model="password" type="password" name="password" autocomplete="current-password"
          center placeholder="请输入密码">
          <template #left-icon>
            <van-icon name="lock" />
          </template>
        </van-field>

        <div>
          <van-button round block type="primary" native-type="submit" color="">
            登录
          </van-button>
        </div>
      </van-form>
      <!-- 其他登录方式- -->
      <div class="title2">----------其他登录方式----------</div>
      <!-- 微信和QQ -->
      <div class="icons">
        <img :src="getAssetUrl('wx.svg')" alt="">
        <img :src="getAssetUrl('qq.svg')" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  height: 100vh;
  background: url(../../assets/img/bj.webp) no-repeat;
  background-position: center;
  background-size: cover;

  .log {
    position: relative;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 20vw;
    height: 20vw;
    border-radius: 50%;

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }

  .form {
    position: relative;
    top: 25%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 90vw;
    margin: 0 auto;

    .title {
      font-size: 8vw;
      font-weight: bold;
      font-family: '楷体';
      color: #00b4cb;
    }

    .rounded {
      border-radius: 8vw;
      margin: 10vw 0;
    }

    .title2 {
      font-size: 5vw;
      color: #fff;
      margin: 10vw auto;
      font-weight: 600;
    }

    .icons {
      margin: 0 auto;

      img {
        width: 15vw;
        height: 15vw;
      }

      img:first-child {
        margin-right: 8vw;
      }
    }

  }

}
</style>
