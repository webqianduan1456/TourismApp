import { defineStore } from "pinia";

const UserDoling = defineStore('loding', {
  state: () => ({
    // 公共加载数据
    CommonLoding: false,
  })
})

export default UserDoling

