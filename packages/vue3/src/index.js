import XyzTransition from './components/XyzTransition'
import XyzTransitionGroup from './components/XyzTransitionGroup'

import xyz from './directives/xyz'

// Create module definition for app.use()
const VueAnimXyz = {
	install(app) {
		app.component('XyzTransition', XyzTransition)
		app.component('XyzTransitionGroup', XyzTransitionGroup)

		app.directive('xyz', xyz)
	},
}

export { XyzTransition, XyzTransitionGroup, xyz }
export default VueAnimXyz
