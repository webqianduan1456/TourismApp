<script setup lang="ts">
defineOptions({
  name: 'UserMessage'
})
import { onBeforeUnmount, onMounted, ref } from 'vue';
import UserSurfaceView from './UserSurface/UserSurfaceView.vue';
import router from '@/router';
import { UserMessage } from '@/stores/modules/login';
const UserMessages = UserMessage()

const AddFriend = () => {
  router.push('/friend')
}
// 搜索消息
const SearchMessage = ref('');
// 连接成功
onMounted(async () => {
  await UserMessages.fetchFindFriendList(UserMessages?.id, 1)
});

// 组件销毁前断开连接
onBeforeUnmount(() => {

});
</script>

<template>
  <div class="UserMessage">
    <!-- 头部 -->
    <div>
      <van-nav-bar left-text="返回" left-arrow :sticky="true">
        <template #title>
          {{ '消息列表' }}
        </template>
        <template #right>
          <van-icon name="friends" size="6vw !important" color="" @click="AddFriend" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 消息搜索 -->
    <div>
      <van-search v-model="SearchMessage" placeholder="请输入用户姓名" />
    </div>
    <!-- 每个用户列表 -->
    <div class="content">
      <template v-for="item in UserMessages.UserFriendList" :key="item.oppositeId">
        <UserSurfaceView :FriendList="item"></UserSurfaceView>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.UserMessage {
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
