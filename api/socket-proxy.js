// api/socket-proxy.js
export default createProxyMiddleware({
  target: 'http://localhost:3001',  // 明文 HTTP 后端
  changeOrigin: true,
  ws: true,  // 必须启用 WebSocket
  pathRewrite: {
    '^/api/socket-proxy/socket.io': '/socket.io'  // ✅ 精准重写路径
  }
});
