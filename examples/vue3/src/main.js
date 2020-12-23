import { createApp } from 'vue'
import VueAnimXyz from '@animxyz/vue/dist/vue3/VueAnimXyz.esm.js'
import App from './App.vue'

// Fonts
import 'typeface-inter'
import 'fontsource-inconsolata'

// Styles
import '@/styles/_index.scss'

const app = createApp(App)

app.use(VueAnimXyz)

app.mount('#root')
