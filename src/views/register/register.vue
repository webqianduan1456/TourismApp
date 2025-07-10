<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import getAssetUrl from '@/utils/getAssetUrl.ts'
import { UserMessage } from '@/stores/modules/login'
const router = useRouter()
const UserMessages = UserMessage()
// 账号,密码,手机号,验证码
const username = ref('')
const password = ref('')
const phone = ref()
const AuthCode = ref()
// 回到登录界面
const ToLogin = () => {
  router.push('/login')
}
// 提交from
const onSubmit = async (values: { username: string, password: string, phone: string }) => {
  const RegisterType = {
    username: values.username,
    userpassword: values.password,
    phone: values.phone
  }
  const res = await UserMessages.fetchRegister(RegisterType)
  if (res.data.code === 200) {
    router.push('/home')
  }
  if (res.data.code === 409) {
    console.log('账号重复');
  }
}
defineOptions({
  name: 'UserRegister'
})
</script>

<template>
  <div class="register">
    <!-- 顶部导航 -->
    <van-nav-bar title="注册" style="background-color: transparent;">
      <template #left>
        <van-icon name="arrow-left" size="7vw !important" color="#000000" @click="ToLogin" />
      </template>
      <template #title>
        <span style="color: black;">注册</span>
      </template>
    </van-nav-bar>
    <!-- 底部所有内容 -->
    <div class="form">
      <!-- 文本 -->
      <div class="title">大疆旅游</div>
      <!-- 账号,密码,手机号,验证码 -->
      <van-form @submit="onSubmit">
        <!-- 账号 -->
        <van-field class="rounded" v-model="username" name="username" center placeholder="请输入用户名">
          <template #left-icon>
            <van-icon name="manager-o" />
          </template>
        </van-field>
        <!-- 密码 -->
        <van-field class="rounded" v-model="password" type="password" name="password" center placeholder="请输入密码">
          <template #left-icon>
            <van-icon name="lock" />
          </template>
        </van-field>
        <!-- 手机号 -->
        <van-field class="rounded" v-model="phone" number="11.*" type="number" name="phone" center placeholder="请输入手机号">
          <template #left-icon>
            <van-icon name="phone" />
          </template>
        </van-field>
        <!-- 验证码 -->
        <div class="AuthCode">
          <van-field class="AuthCodes" v-model="AuthCode" type="number" number="5.*" name="AuthCode" center
            placeholder="请输入验证码">
            <template #left-icon>
              <van-icon name="wechat-pay" />
            </template>
          </van-field>
          <van-button type="primary" round size="normal">获取验证码</van-button>
        </div>
        <div>
          <van-button round block type="primary" native-type="submit" color="">
            注册
          </van-button>
        </div>
      </van-form>
      <!-- 其他注册方式- -->
      <div class="title2">----------其他注册方式----------</div>
      <!-- 微信和QQ -->
      <div class="icons">
        <img :src="getAssetUrl('wx.svg')" alt="">
        <img :src="getAssetUrl('qq.svg')" alt="">
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.register {
  height: 100vh;
  background: url(../../assets/img/bj.webp) no-repeat;
  background-position: center;
  background-size: cover;

  .form {
    position: relative;
    top: 10%;
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

    .AuthCode {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10vw;

      .AuthCodes {
        flex: 1.5;
        border-radius: 8vw;
      }

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
