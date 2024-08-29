import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vueClickOutsideElement from 'vue-click-outside-element'

import './index.css'

import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
hljs.registerLanguage('python', python)

import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCq8bgL519FV6s5QiNoc_zWU6axNFfMhU0',
  authDomain: 'benguthriesite.firebaseapp.com',
  projectId: 'benguthriesite',
  storageBucket: 'benguthriesite.appspot.com',
  messagingSenderId: '355003784830',
  appId: '1:355003784830:web:69b6373fdd5511192c022f',
  measurementId: 'G-VB4DRWFDWP'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

// Import mapbox styles
import 'mapbox-gl/dist/mapbox-gl.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vueClickOutsideElement)

app.mount('#app')
