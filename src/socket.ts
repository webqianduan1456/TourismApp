import { io } from "socket.io-client";

const socket = io("ws://47.122.47.101:8889:3001", {
  // 直接使用前端域名
  transports: ["websocket"],
  host: "0.0.0.0",
  reconnection: true,
});
socket.connect();

export default socket;
