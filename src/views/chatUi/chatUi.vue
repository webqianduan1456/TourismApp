<script setup lang="ts">
import { UserMessage } from '@/stores/modules/login.ts';
import { onMounted, ref } from 'vue';
import UserChat from './cpns/UserChat.vue';
import socket from '@/socket';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
const route = useRoute()

const UserMessages = UserMessage()
const chatMessage = ref('')
// 输入内容
const send = () => {
  if (UserMessages.id && chatMessage.value !== ''
  ) {
    const data = {
      Message: chatMessage.value,
      time: dayjs().format('YYYY-M-D HH:mm:ss'),
      active: 0,
      room: UserMessages.id + Number(route.params.oppositeId),
      userid: UserMessages.id,
    }
    UserMessages.Message.push(data)
  }
  // 获取当前用户id与当前用户好友id
  socket.emit('send', { userid: UserMessages.id, oppositeId: Number(route.params.oppositeId), value: UserMessages.Message }
  )
  chatMessage.value = ''
}
// 监听消息
socket.on(`roomMessage${Number(UserMessages.id) + Number(route.params.oppositeId)}`, async () => {
  // 获取当前用户与好友的最新消息
  socket.emit('getSend', { userid: UserMessages.id, oppositeId: Number(route.params.oppositeId) }, (data: Array<{ Message: string; time: string | Date; active: number; room: number; userid: number }>) => {
    UserMessages.Message = data
  })
  // 获取当前用户与好友的历史消息
  if (UserMessages.id) {
    await UserMessages.fetchGetChatMessage(UserMessages.id + Number(route.params.oppositeId));
  }
  // 合并历史记录和当前消息
  UserMessages.mergeMessages = [
    ...(Array.isArray(UserMessages.HistoryMessage) ? UserMessages.HistoryMessage : []),
    ...(Array.isArray(UserMessages.Message) ? UserMessages.Message : [])
  ];
})
onMounted(async () => {
  // 连接成功创建房间
  socket.emit('aloneRoom', { userid: UserMessages.id, oppositeId: Number(route.params.oppositeId) })
  // 获取当前用户redis里面最新消息
  socket.emit('getSend', { userid: UserMessages.id, oppositeId: Number(route.params.oppositeId) }, async (data: Array<{ Message: string; time: string | Date; active: number; room: number; userid: number }>) => {
    UserMessages.Message = data
    // 获取当前用户与好友的历史消息
    if (UserMessages.id) {
      await UserMessages.fetchGetChatMessage(UserMessages.id + Number(route.params.oppositeId));
      // 合并历史记录和当前消息
      UserMessages.mergeMessages = [
        ...(Array.isArray(UserMessages.HistoryMessage) ? UserMessages.HistoryMessage : []),
        ...(Array.isArray(UserMessages.Message) ? UserMessages.Message : [])
      ]
    }
  })
  // 获取当前用户与好友的历史消息
  if (UserMessages.id) {
    await UserMessages.fetchGetChatMessage(UserMessages.id + Number(route.params.oppositeId));
    // 合并历史记录和当前消息
    UserMessages.mergeMessages = [
      ...(Array.isArray(UserMessages.HistoryMessage) ? UserMessages.HistoryMessage : []),
      ...(Array.isArray(UserMessages.Message) ? UserMessages.Message : [])
    ]
  }
})
</script>

<template>
  <div class="chat">
    <!-- 聊天界面 -->
    <div class="content">
      <template v-for="(item, index) in UserMessages.mergeMessages" :key="index">
        <UserChat :item="item"></UserChat>
      </template>
    </div>
    <!-- 输入框 -->
    <div class="search">
      <input type="text" name="text" id="searchInput" v-model="chatMessage">
      <van-button square type="success" size="small" style="width: 25vw; font-size: 3vw; height: 100%;"
        @click="send">发送</van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.chat {
  width: 100vw;
  height: 100vh;

  .content {
    width: 100%;
    height: 94vh;
    overflow-y: scroll;

  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 5vh;

    &>#searchInput {
      width: 100%;
      height: 100%;
      font-size: 3vw;
      border: none;
      background-color: rgb(177, 183, 183);
    }

    #searchInput:focus {
      outline: none;
      border: none;
    }
  }
}
</style>
