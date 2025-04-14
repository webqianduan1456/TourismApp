
// type
interface TabBarNavigationItem {
  TabBar_Navigation_Text: string;
  CssName: string;
  TabBar_Navigation_ImgSrc: string;
  TabBar_Navigation_ImgSrcS: string;
  path: string;
}
// 切换栏数据
const TabBar_Navigation_Value: TabBarNavigationItem[] = [
  {
    TabBar_Navigation_Text: "首页",
    CssName: "home",
    TabBar_Navigation_ImgSrc: `home.svg`,
    TabBar_Navigation_ImgSrcS: `homeActive.svg`,
    path: "/home"
  },
  {
    TabBar_Navigation_Text: "收藏",
    CssName: "collect",
    TabBar_Navigation_ImgSrc: `collect.svg`,
    TabBar_Navigation_ImgSrcS: `collectActive.svg`,
    path: "/collect"

  },
  {
    TabBar_Navigation_Text: "信息",
    CssName: "message",
    TabBar_Navigation_ImgSrc: `message.svg`,
    TabBar_Navigation_ImgSrcS: `messageActive.svg`,
    path: "/message"

  },
  {
    TabBar_Navigation_Text: "订单",
    CssName: "order",
    TabBar_Navigation_ImgSrc: `order.svg`,
    TabBar_Navigation_ImgSrcS: `orderActive.svg`,
    path: "/order"
  },
]

export { TabBar_Navigation_Value }
export type { TabBarNavigationItem }
