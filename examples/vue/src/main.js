import Vue from 'vue'
import VueAnimXyz from '@animxyz/vue'
import App from './App.vue'
import 'normalize.css'
import '@animxyz/core'

Vue.use(VueAnimXyz)

Vue.config.productionTip = false

new Vue({
	render: (h) => h(App),
}).$mount('#root')
