import { io } from "socket.io-client";

const socket = io("wss://api.yqqlike.xin", {
  path: "/socket.io", // Socket.IO 默认路径
  transports: ["websocket"],
  reconnection: true,
});

export default socket;
