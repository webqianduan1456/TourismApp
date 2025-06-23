import {
  getAllOrder,
  getCompletedOrder,
  getCreateOrder,
  getUpdateOrder,
  getWaitingOrder,
} from "@/network/modules/Order";
import { defineStore } from "pinia";
import type { Order } from "../type/type";
import { UserMessage } from "./login";
const UserMessages = UserMessage();

const UserOrder = defineStore("Order", {
  state: (): Order => ({
    AllOrder: [],
    CompletedOrder: [],
    WaitingOrder: [],
  }),
  actions: {
    // 获取全部订单信息
    async fetchAllOrder(Overall: number) {
      const res = await getAllOrder(Overall, Number(UserMessages.id));
      this.AllOrder = res.data;
    },
    // 获取近期订单
    async fetchCompletedOrder() {
      const res = await getCompletedOrder(Number(UserMessages.id));
      this.CompletedOrder = res.data;
    },
    // 获取待支付订单
    async fetchWaitingOrder() {
      const res = await getWaitingOrder(Number(UserMessages.id));
      this.WaitingOrder = res.data;
    },
    // 创建待支付订单
    async fetchCreateOrder(OrderData: object) {
      const res = await getCreateOrder(OrderData);
      return res.data; // 返回创建订单的响应数据
    },
    // 更新支付订单
    async fetchUpdateOrder(houseId: number) {
      await getUpdateOrder(houseId, Number(UserMessages.id));
    },
  },
});

export default UserOrder;
