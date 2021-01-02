import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc(0.3)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

axios.defaults.baseURL = "http://127.0.0.1:8000/";



const app = createApp(App)

app.use(ElementPlus,{locale})
app.use(store)
app.use(router)
app.mount('#app')
