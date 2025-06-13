<script setup lang="ts">

import { userHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const HomeHouseLists = userHomeStore()
const { HomeHouseList } = storeToRefs(HomeHouseLists)
// 保持响应
const star = computed(()=>{
  return Number(HomeHouseList?.value?.SelectedS[0 + 1]?.commentScore)
})

defineProps({
  Comments: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>

<template>
  <div class="DetailedComments">
    <!-- 评分区域 -->
    <div class="InformationDes">
      <!-- 评分 -->
      <div class="DetailedCommentsNumber">
        <div>{{ HomeHouseList?.SelectedS[0 + 1]?.commentScore }}</div>
        <i></i>
      </div>
      <!-- 评分星数 -->
      <div class="DetailedCommentsContent">
        <span>{{ Comments?.housMessage[0]?.scoreTitle }}</span>
        <span>{{ Comments?.housMessage[0]?.totalCount }}条评论</span>
        <van-rate v-model="star" size="3.3333vw" allow-half  />
      </div>
      <!-- 评分描述 -->
      <div class="DetailedCommentsContents">
        <template v-for="item in Comments.houseTwo" :key="item.id">
          <div>{{ item.text }} {{ item.textId }}</div>
        </template>
      </div>
    </div>
    <!-- 用户点评信息 -->
    <div class="Commentary">
      <template v-for="item in Comments.houseThree" :key="item.id">
        <div><span class="ft">{{ item.text }}({{ item.textNumber }})</span></div>
      </template>
    </div>
    <!-- 用户信息以及点评信息 -->
    <div class="CommentsSection">
      <div class="UserMessage">
        <!-- 用户头像 -->
        <img :src="Comments.houseUser[0].userAvatars" alt="">
        <!-- 用户信息 -->
        <div class="UserMessageContent">
          <span>{{ Comments?.houseUser[0].username }}</span>
          <span>{{ Comments?.houseUser[0].checkInDate }}</span>
        </div>
      </div>
      <!-- 点评 -->
      <div class="EvaluationDescription">
        <div>
          {{ Comments?.houseUser[0].memberLevelIcon }}
        </div>
      </div>

    </div>
    <!-- 查看全部评论 -->
    <div>
      <span class="EvaluationDescriptionMessage">
        查看全部评论 >
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.DetailedComments {
  .InformationDes {
    display: flex;
    justify-content: space-between;

    .DetailedCommentsNumber {
      position: relative;
      font-size: 10.6667vw;
      flex: 0.7;

      &>div {
        position: absolute;
        left: 40%;
        transform: translate(-50%);
        display: block;
        z-index: 22;
      }

      &>i {
        position: absolute;
        bottom: 12px;
        left: 36%;
        transform: translate(-50%);
        content: '';
        width: 70%;
        height: 1.0667vw;
        border-radius: 1.3333vw;
        background-color: #ff0000;
      }


    }

    .DetailedCommentsContent {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      font-size: 3.3333vw;
      flex: 1;
    }

    .DetailedCommentsContents {
      display: flex;
      flex-wrap: wrap;
      font-size: 3.3333vw;

      flex: 2;

      &>div {
        width: 50%;
      }
    }
  }

  .Commentary {
    display: flex;
    flex-wrap: wrap;
    margin: 3.6667vw;
    justify-content: left;
    font-size: 3.3333vw;

    &>div {
      width: calc(33.333%);
      margin-top: 2.0667vw;

      &>span {
        background-color: rgba(63, 238, 238, 0.3);
        border-radius: 2vw;
        padding: .5333vw;
      }
    }
  }

  .CommentsSection {
    margin-top: 3.6667vw;
    background-color: rgba(0, 255, 255, 0.1);
    border-radius: 3.1333vw;

    .UserMessage {
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 0 2.6667vw;

      &>img {
        width: 5.3333vw;
        height: 5.3333vw;
        border-radius: 50%;
        margin-right: 2.6667vw;
      }

      .UserMessageContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 3.3333vw;

        &>span {
          margin-top: 1.0667vw;

          &:first-child {
            font-weight: bold;
          }
        }
      }
    }

    .EvaluationDescription {
      margin-top: 2.6667vw;
      font-size: 3.3333vw;

      &>div {
        padding: 2.6667vw;
        border-radius: 2.6667vw;
      }
    }


  }

  .EvaluationDescriptionMessage {
    display: flex;
    justify-content: right;
    font-size: 5.6667vw;
    font-weight: 600;
    cursor: pointer;
    margin-top: 3.3333vw;
  }


}
</style>
