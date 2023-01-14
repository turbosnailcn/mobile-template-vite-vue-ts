import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import { router } from "@/router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(head);
app.use(router);
app.use(pinia);
app.mount("#app");
