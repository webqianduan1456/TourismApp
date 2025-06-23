import {
  CreateApplication,
  DeleteFriend,
  getApplicationList,
  getFindFriendList,
  getFindUser,
  getLogin,
  getRegister,
} from "@/network/modules/login";
import { defineStore } from "pinia";
import type { User } from "../type/type";
// 注册数据类型
export interface RegisterType {
  username: string;
  userpassword: string;
  phone: string;
}
const UserMessage = defineStore("User", {
  state: (): User => ({
    id: Number(sessionStorage.getItem("userid")) || null,
    token: sessionStorage.getItem("token") || null,
    username: sessionStorage.getItem("username") || null,
    avatar: sessionStorage.getItem("avatar") || "",
    FindUses: {
      id: null,
      username: "",
      url: "",
    },
    // 朋友列表
    UserFriendList: [],
    // 申请列表
    ApplicatioList: [],
  }),
  actions: {
    // 登录
    async fetchLogin(username: string, userpassword: string) {
      const res = await getLogin(username, userpassword);
      // 将用户id和token存在本地
      if (res?.data?.access_token && res?.data?.id) {
        sessionStorage.setItem("token", res?.data?.access_token);
        sessionStorage.setItem("userid", res?.data?.id);
        sessionStorage.setItem("username", res?.data?.username);
        sessionStorage.setItem("avatar", res?.data?.avatar);
      }
      // 获取到第一直接赋值
      this.id = Number(sessionStorage.getItem("userid"));
      this.token = sessionStorage.getItem("token");
      this.username = sessionStorage.getItem("username");
      this.avatar = sessionStorage.getItem("avatar") || "";
      return res;
    },
    // 注册
    async fetchRegister(RegisterMessage: RegisterType) {
      const res = await getRegister(RegisterMessage);
      return res;
    },
    // 查找人
    async fetchFindUser(username: string) {
      const res = await getFindUser(username);
      if (!res?.data) return;
      this.FindUses.id = res.data.id;
      this.FindUses.username = res.data.username;
      this.FindUses.url = res.data.url;
    },
    // 好友申请
    async fetchApplicationList(Application: object) {
      const res = await getApplicationList(Application);
      return res;
    },
    // 查询朋友列表
    async fetchFindFriendList(userid: number | null, active: number) {
      const res = await getFindFriendList(userid, active);
      if (Number(active) === 0) {
        // 申请
        this.ApplicatioList = res.data;
      }
      // 朋友列表
      if (Number(active) === 1) {
        this.UserFriendList = res.data;
      }
    },
    // 拒绝好友
    async fetchDeleteFriend(userid: number, oppositeId: number) {
      const res = await DeleteFriend(userid, oppositeId);
      return res;
    },
    // 同意好友
    async fetchCreateApplication(oppositeId: number | null, userid: number | null, active: number,username:string | null) {
      await CreateApplication(oppositeId,userid,active,username);
    },
  },
});

export { UserMessage };
