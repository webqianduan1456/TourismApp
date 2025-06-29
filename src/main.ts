import { createApp } from "vue";
import "normalize.css";
import router from "@/router/index";
import Pinia from "@/stores/index";
import "vant/lib/index.css";

import App from "./App.vue";
// 导入css重置样式和自定义样式0
import "normalize.css";
import "@/assets/css/index.css";
// (vant工具包)解决pc端一些方法无法调用问题
import "@vant/touch-emulator";
// 导入socket

const app = createApp(App);

app.use(router);
app.use(Pinia);

app.mount("#app");
