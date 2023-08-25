import './styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/firebase'

const app = createApp(App)

// Firebase config
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(createPinia())
app.use(router)

app.mount('#app')
