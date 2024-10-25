import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vue3EasyDataTable from "vue3-easy-data-table";



var moment = require("jalali-moment");
moment().locale("fa").format("Y-M-D");
axios.defaults.baseURL = "http://127.0.0.1:8000";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable);
app.use(store).use(router, axios).mount("#app");



