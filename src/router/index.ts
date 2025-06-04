import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/home'
    },
    // 不存在的路径跳转
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/Home/HomeView.vue')
    },
    // 路由配置映射表
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      name: 'collect',
      path: '/collect',
      component: () => import('@/views/Collect/CollectView.vue')
    },
    {
      name: 'message',
      path: '/message',
      component: () => import('@/views/Message/message.vue')
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('@/views/Order/order.vue')
    },
    {
      name: 'Search',
      path: '/Search',
      component: () => import('@/views/Search/SearchNav.vue'),
      meta:{
        isHide:true,
      }
    },
    {
      name:'ResidenceSearch',
      path:'/ResidenceSearch',
      component: ()=> import('@/views/ResidenceSearch/ResidenceSearch.vue'),
      meta:{
        isHide:true,
      }
    },
    {
      name:'DetailsView',
      path:'/DetailsView/:id/:flay',
      component: ()=> import('@/views/Details/DetailsView.vue'),
      meta:{
        isHide:true,
      }
    }
  ]
})

export default router
