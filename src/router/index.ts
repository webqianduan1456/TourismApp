import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 重定向
    {
      path: "/",
      redirect: "/home",
    },
    // 不存在的路径跳转
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/Home/HomeView.vue"),
    },
    // 首页
    {
      name: "home",
      path: "/home",
      component: () => import("@/views/Home/HomeView.vue"),
    },
    // 收藏
    {
      name: "collect",
      path: "/collect",
      component: () => import("@/views/Collect/CollectView.vue"),
    },
    // 消息
    {
      name: "message",
      path: "/message",
      component: () => import("@/views/Message/message.vue"),
    },
    // 订单
    {
      name: "order",
      path: "/order/:id",
      component: () => import("@/views/Order/orderView.vue"),
    },
    // 城市选择
    {
      name: "Search",
      path: "/Search",
      component: () => import("@/views/Search/SearchNav.vue"),
      meta: {
        isHide: true,
      },
    },
    // 选择入住城市的地域
    {
      name: "ResidenceSearch",
      path: "/ResidenceSearch",
      component: () => import("@/views/ResidenceSearch/ResidenceSearch.vue"),
      meta: {
        isHide: true,
      },
    },
    // 详情
    {
      name: "DetailsView",
      path: "/DetailsView/:id/:flay/:keyId",
      component: () => import("@/views/Details/DetailsView.vue"),
      meta: {
        isHide: true,
      },
    },
    // 登录
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/Login/login.vue"),
      meta: {
        isHide: true,
      },
    },
    // 注册
    {
      name: "Register",
      path: "/register",
      component: () => import("@/views/register/register.vue"),
      meta: {
        isHide: true,
      },
    },
    // 添加朋友
    {
      name: "Friend",
      path: "/friend",
      component: () => import("@/views/UserFriend/UserFriend.vue"),
      meta: {
        isHide: true,
      },
    },
    // 申请列表
    {
      name: "ApplicationList",
      path: "/applicationList",
      component: () => import("@/views/ApplicationList/ApplicationList.vue"),
      meta: {
        isHide: true,
      },
    },
  ],
});

export default router;
