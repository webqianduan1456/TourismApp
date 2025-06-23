// api/socket-proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (req, res) {
  createProxyMiddleware({
    target: 'http://project.yqqlike.xin:3001', // 你的后端 HTTP 地址
    changeOrigin: true,
    ws: true, // 关键：启用 WebSocket 代理
  })(req, res);
}
