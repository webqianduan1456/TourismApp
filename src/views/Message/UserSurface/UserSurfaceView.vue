<script setup lang="ts">
import { UserMessage } from '@/stores/modules/login';
const UserMessages = UserMessage()
interface userType {
  id?: number | null,
  username?: string,
  url?: string,
}
defineProps<{
  FriendDate?: userType,
  FriendList?: {
    username: string;
    oppositeId: number;
    userid: number;
  },
  ApplicatioLists?: {
    username: string,
    active: number,
    avatarUrl: string,
    oppositeId: number,
    userid: number
  }
}>()
</script>

<template>
  <div class="UserSurface">
    <!-- 用户头像 -->
    <div class="imgs">
      <img src="../../../assets/img/xjiang.jpg" alt="">
    </div>
    <!-- 名字与消息 -->
    <div class="contents">
      <div>{{ FriendDate?.username || FriendList?.username || ApplicatioLists?.username }}</div>
      <div>123112</div>
    </div>
    <!-- 右侧内容 -->
    <slot name="right" v-if="FriendDate?.id !== UserMessages?.id">
      <div class="icon">
        <van-icon name="arrow" size="8vw !important" color="#6e6c58" />
      </div>
    </slot>
  </div>
</template>

<style scoped lang="less">
.UserSurface {
  display: flex;
  justify-content: space-between;
  height: 18vw;
  margin-top: 1.5vw;
  align-items: center;
  padding: 0 5vw;
  background-color: #d5d5d5;

  .imgs {
    width: 15vw;
    height: 15vw;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .contents {
    flex: 1;
    margin-left: 3vw;

    &>div:first-child {
      font-size: 4vw;
      margin-bottom: 2vw;
      font-weight: bold;
    }

    &>div:last-child {
      font-size: 3vw;
      font-weight: bold;
      color: #6c6c6c;
    }
  }
}
</style>
