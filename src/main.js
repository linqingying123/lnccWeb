import {createApp} from 'vue'
import App from './App.vue'
import store from './store'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import '@/stylus/index.styl'

import router from './router'
import apis from "@/apis";


const app = createApp(App)

app.config.globalProperties.$isShow = false
app.config.globalProperties.$bannerList = null

app.use(Antd)
app.use(ElementPlus)
app.use(router)
app.use(store)


app.mount('#app')



