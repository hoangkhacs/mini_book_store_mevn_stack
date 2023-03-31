import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'


// import './assets/main.css'

import router from "./router";

const app = createApp(App).use(router).mount('#app')
// app.use(bodyParser.json({
//     extended: true,
//     limit: '50mb'
// }));
