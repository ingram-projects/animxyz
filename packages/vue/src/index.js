import XyzTransition from './components/XyzTransition'
import XyzTransitionGroup from './components/XyzTransitionGroup'

import XyzContext from './directives/XyzContext'
import XyzVisible from './directives/XyzVisible'

// Create module definition for Vue.use()
const VueAnimXyz = {
	install(Vue) {
		Vue.component('xyz-transition', XyzTransition)
		Vue.component('xyz-transition-group', XyzTransitionGroup)

		Vue.directive('xyz', XyzContext)
		Vue.directive('xyz-visible', XyzVisible)
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

export default VueAnimXyz
