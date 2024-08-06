import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vueClickOutsideElement from 'vue-click-outside-element'

import './index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vueClickOutsideElement)

app.mount('#app')
