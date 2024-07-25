import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import bootstrap from "bootstrap/dist/js/bootstrap.js";

import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(bootstrap);
app.mount("#app");
