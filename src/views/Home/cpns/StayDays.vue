<script setup lang="ts">
import { StayCount, utilsDate } from '@/utils/dayjs';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { showFailToast } from 'vant';

import UserMainStore from '@/stores/common/mainStore';
const UserMainStores = UserMainStore();
const emit = defineEmits(['StayDaysDate'])

//-----控制日期弹窗显示与隐藏-----
const CurrentShow = ref(false)
const EndShow = ref(false)

// ------(停留天数,开始日期,结束日期)------
const AddDefaultStay = ref(3)

// 转化成(MM-DD)日期格式用于界面展示,(格式已转换)
const NewBeforeDate = computed(() => utilsDate(UserMainStores.MainBeforeDate))
const NewBehindDate = computed(() => utilsDate(UserMainStores.MainBehindDate))

const Days = computed(() => StayCount(UserMainStores.MainBeforeDate, UserMainStores.MainBehindDate));

// 重置数据
const ResetDate = () => {

  UserMainStores.MainBeforeDate = dayjs(Date()).format('YYYY-MM-DD')
  UserMainStores.MainBehindDate = dayjs(dayjs().add(AddDefaultStay.value, 'day')).format('YYYY-MM-DD')
  showFailToast({
    message: '停留天数不能为负',
    duration: 3000
  })

}
// 选择开始日期执行回调
const CurrentConfirm = (value: string) => {
  CurrentShow.value = false
  // 将公共数据存储到mainStore
  UserMainStores.MainBeforeDate = dayjs(String(value)).format('YYYY-MM-DD')
  // 入驻天数出现负数重置数据
  if (Days.value <= 0) {
    ResetDate()
  }


}
// 选择结束日期执行回调
const EndConfirm = (value: object) => {
  EndShow.value = false
  UserMainStores.MainBehindDate = dayjs(String(value)).format('YYYY-MM-DD')
  // 入驻天数出现负数重置数据
  if (Days.value <= 0) {
    ResetDate()
  }

}
// 发出事件
emit('StayDaysDate', NewBeforeDate.value, NewBehindDate.value)
</script>

<template>
  <div>
    <div class="CheckInTime">
      <div class="DateOne align">
        <span>入驻</span>
        <van-cell :value="NewBeforeDate" @click="CurrentShow = true" />
        <van-calendar v-model:show="CurrentShow" @confirm="CurrentConfirm" />
        <i>价格不限</i>
      </div>

      <div class="Days">共{{ Days }}晚</div>

      <div class="DateTwo">
        <span>离店</span>
        <van-cell :value="NewBehindDate" @click="EndShow = true" />
        <van-calendar v-model:show="EndShow" @confirm="EndConfirm" />
        <i>人数不限</i>
      </div>

    </div>

  </div>
</template>

<style scoped lang="less">
@CommeWidth: 3.1333vw;

.CheckInTime {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .Days,
  span,
  i {
    font-size: 2.4vw;
  }

  .DateOne {

    span,
    i {
      color: #aaaaaa;
      display: block;
      padding-right: .4vw;
    }

    i {
      margin: 2vw 0;
    }
  }

  .DateTwo {

    span,
    i {
      color: #aaaaaa;
    }

    i {
      margin: 2vw 0;
    }
  }

  .align {
    text-align: right;

  }

}

.van-cell {
  font-size: @CommeWidth;
  font-weight: 700;
  height: @CommeWidth;
  padding: 0;
  line-height: @CommeWidth ;
}
</style>
