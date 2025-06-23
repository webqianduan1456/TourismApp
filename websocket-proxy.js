// api/websocket-proxy.js
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

// 连接到后端WebSocket服务
wss.on('connection', (clientWs, request) => {
  // 提取命名空间（如果有）
  const namespace = request.url?.split('?')[0] || '/chats';

  // 连接到后端对应命名空间
  const backendWs = new WebSocket(`ws://47.122.47.101:3001${namespace}`);

  // 双向消息转发
  clientWs.on('message', (message) => backendWs.send(message));
  backendWs.on('message', (message) => clientWs.send(message));

  // 错误处理
  clientWs.on('error', (err) => console.error('Client error:', err));
  backendWs.on('error', (err) => console.error('Backend error:', err));

  // 连接关闭处理
  clientWs.on('close', () => backendWs.close());
  backendWs.on('close', () => clientWs.close());
});

// 处理HTTP请求升级为WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

export default server;
