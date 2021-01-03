import Vue from 'vue'
import VueAnimXyz from '@animxyz/vue'
import App from './App.vue'

// Fonts
import 'typeface-inter'
import 'fontsource-inconsolata'

// Styles
import '@animxyz/core'
import '@/styles/_index.scss'

Vue.use(VueAnimXyz)

Vue.config.productionTip = false

new Vue({
	render: (h) => h(App),
}).$mount('#root')
