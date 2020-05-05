import XyzTransition from './components/XyzTransition.vue'
import XyzTransitionGroup from './components/XyzTransitionGroup.vue'
import '@animxyz/core'

const VueAnimXyz = {
	install(Vue) {
		Vue.component('xyz-transition', XyzTransition)
		Vue.component('xyz-transition-group', XyzTransitionGroup)
	},
}

export default VueAnimXyz

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(VueAnimXyz)
}
