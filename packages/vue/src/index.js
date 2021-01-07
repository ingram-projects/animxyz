import XyzTransition from './components/XyzTransition'
import XyzTransitionGroup from './components/XyzTransitionGroup'

import xyz from './directives/xyz'

// Create module definition for Vue.use()
const VueAnimXyz = {
	install(Vue) {
		Vue.component('XyzTransition', XyzTransition)
		Vue.component('XyzTransitionGroup', XyzTransitionGroup)

		Vue.directive('xyz', xyz)
	},
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

export { XyzTransition, XyzTransitionGroup, xyz }
export default VueAnimXyz
