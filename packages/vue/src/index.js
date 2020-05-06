import XyzTransition from './components/XyzTransition'
import XyzTransitionGroup from './components/XyzTransitionGroup'
import '@animxyz/core'

// Create module definition for Vue.use()
const VueAnimXyz = {
	install () {
		Vue.component('xyz-transition', XyzTransition)
		Vue.component('xyz-transition-group', XyzTransitionGroup)
	}
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(VueAnimXyz)
}

export default VueAnimXyz
