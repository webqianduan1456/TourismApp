import { defineStore } from "pinia";
import dayjs from 'dayjs'


const UserMainStore = defineStore('MainStore', {
  state: () => ({
    // 公共数据(居住和离开时间)
    MainBeforeDate: dayjs(Date()).format('YYYY-MM-DD'),
    MainBehindDate: dayjs(dayjs().add(3, 'day')).format('YYYY-MM-DD'),
  })
})


export default UserMainStore
