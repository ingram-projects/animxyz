import XyzTransition from './components/XyzTransition'
import XyzTransitionGroup from './components/XyzTransitionGroup'

import XyzContext from './directives/XyzContext'

// Create module definition for app.use()
const VueAnimXyz = {
	install(app) {
		app.component('XyzTransition', XyzTransition)
		app.component('XyzTransitionGroup', XyzTransitionGroup)

		app.directive('xyz', XyzContext)
	},
}

export { XyzTransition, XyzTransitionGroup, XyzContext }
export default VueAnimXyz
