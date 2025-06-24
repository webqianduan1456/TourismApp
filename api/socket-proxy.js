// api/socket-proxy.js
export default createProxyMiddleware({
  target: 'http://47.122.47.101',  // 明文 HTTP 后端
  changeOrigin: true,
  ws: true,  // 必须启用 WebSocket
  pathRewrite: {
    '^/api/socket-proxy': '/socket.io'  // ✅ 精准重写路径
  }
});
