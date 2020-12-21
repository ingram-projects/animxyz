import { createApp } from 'vue'
import VueAnimXyz from '@animxyz/vue'
import App from './App.vue'
import 'normalize.css'
import '@animxyz/core'

const app = createApp(App)

app.use(VueAnimXyz)

app.mount('#root')
