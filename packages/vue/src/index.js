import XyzTransition from './components/XyzTransition.vue'
import XyzTransitionGroup from './components/XyzTransitionGroup.vue'
import '@animxyz/core'

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return
	install.installed = true;
	Vue.component('xyz-transition', XyzTransition)
	Vue.component('xyz-transition-group', XyzTransitionGroup)
}

// Create module definition for Vue.use()
const VueAnimXyz = {
	install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

export default VueAnimXyz
