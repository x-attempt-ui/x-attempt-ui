import { createApp } from 'vue'
import XAttemptUI from '@x-attempt/ui/src'
import App from './App.vue'
import router from './router'
import '@x-attempt/ui/src/index.scss'

const app = createApp(App)
app.use(router)
app.use(XAttemptUI)
app.mount('#app')
