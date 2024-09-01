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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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
