<script setup lang="ts">
import router from '@/router';
import { UserMessage } from '@/stores/modules/login';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import UserSurfaceView from '../Message/UserSurface/UserSurfaceView.vue';
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:3001/chats', {
//   transports: ["websocket"],
// })
const UserMessages = UserMessage()
const toUserSurfaces = () => {
  router.push('/message')
}

const SearchMessage = ref()
// 点击搜索触发或回车键都会触发
const onClickButton = () => {
  UserMessages.fetchFindUser(SearchMessage.value)
}
// 点击添加朋友触发
const AddFriend = async () => {
  const data = {
    username: UserMessages.username,
    active: 0,
    avatarUrl: UserMessages.avatar || '',
    oppositeId: UserMessages.id,
    userid: UserMessages.FindUses?.id
  }
  // 触发申请
  await UserMessages.fetchApplicationList(data)
}
// 失去焦点将查到的姓名除掉
const clearUser = () => {
  UserMessages.FindUses = {}
}
// 跳转到申请列表
const ApplicationList = () => {
  router.push('/applicationList')
}
onMounted(()=>{
 UserMessages.fetchFindFriendList(UserMessages?.id, 1)
})
// 组件销毁之前
onBeforeUnmount(() => {
  UserMessages.FindUses = {}
});
</script>

<template>
  <div class="UserFriend">
    <!-- 头部 -->
    <div>
      <van-nav-bar left-text="返回" left-arrow :sticky="true" @click-left="toUserSurfaces" @click-right="ApplicationList">
        <template #title>
          {{ '添加朋友' }}
        </template>
        <template #right>
          <span>申请列表</span>
        </template>
      </van-nav-bar>
    </div>
    <!-- 查找人 -->
    <div>
      <van-search show-action v-model="SearchMessage" placeholder="请输入用户名查询" @search="onClickButton" @blur="clearUser">
        <template #action>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 每个用户列表 -->
    <div class="content">
      <UserSurfaceView :FriendDate="UserMessages?.FindUses || {}" v-if="UserMessages?.FindUses.id">
        <template #right>
          <template v-if="!UserMessages.UserFriendList.some((items) => items.oppositeId == UserMessages.FindUses.id)">
            <van-button round type="success" @click="AddFriend">添加朋友</van-button>
          </template>
          <template v-else>
            <div style="font-size: 3vw; font-weight: 600; ">
              互关
            </div>
          </template>
        </template>
      </UserSurfaceView>
    </div>
  </div>
</template>

<style scoped lang="less">
.UserFriend {
  display: flex;
  flex-direction: column;
  height: 90vh;

  .content {
    height: 100%;
    overflow-y: scroll;
    background-color: #ececec;
  }
}
</style>
