import { AxiosHeaders } from "axios";
import { DefaultAxios } from "..";
import type { RegisterType } from "@/stores/modules/login";

// 登录
export function getLogin(username: string, userpassword: string) {
  return DefaultAxios.post({
    url: "/auth/login",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      username,
      userpassword,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 注册
export function getRegister(RegisterMessage: RegisterType) {
  return DefaultAxios.post({
    url: "/user/register",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      ...RegisterMessage,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}

// 查找人
export function getFindUser(username: string) {
  return DefaultAxios.get({
    url: "/user/FindUser",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    params: {
      username: username,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 好友申请
export function getApplicationList(Application: object) {
  return DefaultAxios.post({
    url: "/user/ApplicationList",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      ...Application,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 查询朋友列表
export function getFindFriendList(userid: number | null, active: number) {
  return DefaultAxios.get({
    url: "/user/FindFriendList",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    params: {
      userid,
      active,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 拒绝好友
export function DeleteFriend(userid: number, oppositeId: number) {
  return DefaultAxios.post({
    url: "/user/DeleteFriend",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      userid,
      oppositeId,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
// 同意好友
export function CreateApplication(
  oppositeId: number | null,
  userid: number | null,
  active: number,
  username: string | null
) {
  return DefaultAxios.post({
    url: "/user/CreateApplicationList",
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
    data: {
      oppositeId,
      userid,
      active,
      username,
    },
  })
    .then((res) => {
      return res; // 返回响应数据
    })
    .catch((err) => {
      return err; // 返回错误信息
    });
}
