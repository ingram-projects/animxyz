import { createApp } from 'vue'
import VueAnimXyz from '@animxyz/vue/dist/vue3/VueAnimXyz.esm.js'
import App from './App.vue'
import 'normalize.css'
import '@animxyz/core'

const app = createApp(App)

app.use(VueAnimXyz)

app.mount('#root')
