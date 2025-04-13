<script setup lang="ts">
import { userHomeStore } from '@/stores/modules/home';
import { useScroll } from '@/hooks/scroll';
import { ref } from 'vue'
import UserMainStore from '@/stores/common/mainStore';
// store
const userHomeStores = userHomeStore();
const UserMainStores = UserMainStore();
// 对数据做转换(04月6日 ——> 4.6)
const MainBefore = ref(UserMainStores.MainBeforeDate.replace("月", ".").replace("日", "").replace('0', ''))
const MainBehind = ref(UserMainStores.MainBehindDate.replace("月", ".").replace("日", "").replace('0', ''))
// @ts-expect-error (不需要检测)
// 鼠标滚动到底部时触发
const { scrollTop } = useScroll(() => {
  userHomeStores.fetchAllHomeHouseList();
});
</script>

<template>
  <div class="HeadFixation" v-if="scrollTop >= 400">
    <!-- 居住和离开日期显示 -->
    <div class="date-picker">
      <div class="check-in">
        <span>住</span>
        <span>{{ MainBefore }}</span>
      </div>
      <div class="check-out">
        <span>离</span>
        <span>{{ MainBehind }}<i>◢</i></span>
      </div>
    </div>
    <!-- 搜索框和搜索图标 -->
    <div class="search-bar">
      <div class="search-input">
        <i class="search-icon"></i>
        <input type="text" placeholder="关键字位置/民宿" />
        <img src="@/assets/img/Search.svg" alt="">
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@FontSize: 4vw;

.HeadFixation {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 9.4667vw;
  z-index: 66;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .date-picker {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: @FontSize;

    .check-in,
    .check-out {
      display: flex;
      align-items: center;

      i {
        display: inline-block;
        transform: scale(0.6);
        cursor: pointer;
      }

      span:first-child {
        margin-right: 0.5vw;
        font-weight: bold;
      }

      span:last-child {
        font-size: @FontSize;
        color: #666;
      }
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    flex: 1;

    .search-input {
      display: flex;
      align-items: center;
      flex: 1;
      border: none;
      border-radius: 4px;
      padding: 0 1vw;
      background-color: #fff;

      i.search-icon {
        width: 3vw;
        height: 3vw;
        background-image: url('/path/to/search-icon.svg');
        background-size: cover;
        margin-right: 0.5vw;
      }

      input {
        width: 100%;
        border: none;
        background-color: #fff;
        font-size: @FontSize;
        outline: none;
      }

      img {
        width: @FontSize;
        height: @FontSize;
        margin-left: 0.5vw;
        cursor: pointer;
      }
    }


  }
}
</style>
