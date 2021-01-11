import { createApp } from 'vue'
import VueAnimXyz from '@animxyz/vue3/src'
import App from './App.vue'

// Fonts
import 'typeface-inter'
import 'fontsource-inconsolata'

// Styles
import '@animxyz/core'
import '@/styles/_index.scss'

const app = createApp(App)

app.use(VueAnimXyz)

app.mount('#root')
