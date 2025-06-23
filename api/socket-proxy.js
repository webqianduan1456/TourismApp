// api/socket-proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (req, res) {
  createProxyMiddleware({
    target: 'http://project.yqqlike.xin:8889', // 你的后端 HTTP 地址
    changeOrigin: true,
    ws: true, // 关键：启用 WebSocket 代理
    pathRewrite: {
      '^/api/socket-proxy': '/socket.io' // 关键：重写路径
    }
  })(req, res);
}
