<script setup lang="ts">
import router from '@/router';
import { UserMessage } from '@/stores/modules/login';
import { onBeforeMount, onMounted } from 'vue';
import { io } from 'socket.io-client';
import UserSurfaceView from '../Message/UserSurface/UserSurfaceView.vue';
const socket = io('https://project.yqqlike.xin:3001', {
  transports: ["websocket"],
})
const UserMessages = UserMessage()
const toUp = () => {
  router.push('/friend')
}
// 同意好友
const consent = async () => {
  await UserMessages.fetchCreateApplication(UserMessages.ApplicatioList.map(item => item.oppositeId)[0], UserMessages.id, 1, UserMessages.username)
  await UserMessages.fetchFindFriendList(UserMessages.id, 0)
}
// 拒绝好友
const refuse = async () => {
  // 有值就删
  if (UserMessages.id && UserMessages.ApplicatioList.some(item => item.oppositeId)) {
    // 调用删除
    await UserMessages.fetchDeleteFriend(UserMessages.id, UserMessages.ApplicatioList.map(item => item.oppositeId)[0])
    await UserMessages.fetchFindFriendList(UserMessages.id, 0)
  }
}
onMounted(async () => {
  await UserMessages.fetchFindFriendList(UserMessages.id, 0)
  // 连接成功发送token
  await socket.emit('auth', { data: UserMessages.token }, async (Data: Array<{
    active: number,
    avatarUrl: string,
    oppositeId: number,
    userid: number,
    username: string
  }>) => {
    // 拿到redis里面的申请列表
    for (let i = 0; i < Data.length; i++) {
      if (!(UserMessages?.ApplicatioList?.some(item => item?.userid === Data[i]?.userid)))
        await UserMessages.ApplicatioList.push(Data[i])
    }
  })

  socket.on('roomMessage', (data) => {
    console.log('收到消息:', data);
  });
})
onBeforeMount(() => {
  UserMessages.ApplicatioList = []
})

</script>

<template>
  <div class="ApplicationList">
    <!-- 头部 -->
    <div>
      <van-nav-bar left-text="返回" left-arrow :sticky="true" @click-left="toUp">
        <template #title>
          {{ '申请列表' }}
        </template>
      </van-nav-bar>
    </div>
    <!-- 每个用户列表 -->
    <div class="content">
      <template v-for="(item, index) in UserMessages.ApplicatioList" :key="index">
        <UserSurfaceView :ApplicatioLists="item">
          <template #right>
            <div class="hesitate">
              <van-button round type="success" size="small" @click="consent">同 意 好 友 </van-button>
              <van-button round type="danger" size="small" @click="refuse">拒 绝 好 友</van-button>
            </div>
          </template>
        </UserSurfaceView>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.ApplicationList {
  display: flex;
  flex-direction: column;
  height: 90vh;

  .content {
    height: 100%;
    overflow-y: scroll;
    background-color: #ececec;
  }

  .hesitate {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }
}
</style>
