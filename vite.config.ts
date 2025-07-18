import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
// 导入自动化引入插件(vant)
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 本地测试
  server: {
    port: 3000,
  },
});
