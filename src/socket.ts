import { io } from "socket.io-client";

const socket = io("wss://47.118.17.138:8889", {
  path: "/socket.io", // Socket.IO 默认路径
  transports: ["websocket"],
  reconnection: true,
});

export default socket;
