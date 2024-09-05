import { createApp } from 'vue'
import AppLayout from './AppLayout.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import p from './logic/pinia/pinia_util'
import './css/global.css'

const app = createApp(AppLayout)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
p.init()
app.mount('#app')
