import { io } from "socket.io-client";

const socket = io("wss://app.yqqlike.xin:8889", {
  // 直接使用前端域名
  transports: ["websocket"],
  host: "0.0.0.0",
  reconnection: true,
});
// 自动连接
socket.connect();
export default socket;
