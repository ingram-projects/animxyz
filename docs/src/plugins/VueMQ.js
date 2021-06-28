const VueMQ = {
	install(Vue, options) {
		const breakpoints = options.breakpoints || {}

		function getBreakpoint(val) {
			if (breakpoints[val]) {
				return breakpoints[val]
			}
			return val
		}

		function media(options) {
			const { min, max, direction = 'width', defaultTo = true } = options

			if (typeof window === 'undefined') return defaultTo

			let mediaQuery = null

			if (min) {
				const val = getBreakpoint(min)
				mediaQuery = `(min-${direction}: ${val}px)`
			}

			if (max) {
				const val = getBreakpoint(max)
				mediaQuery = `not all and (min-${direction}: ${val}px)`
			}

			if (!mediaQuery) return false

			if (!data.cached[mediaQuery]) {
				data.cached[mediaQuery] = matchMedia(mediaQuery).matches
			}
			return data.cached[mediaQuery]
		}

		function below(max, options) {
			return media({ max, ...options })
		}

		function above(min, options) {
			return media({ min, ...options })
		}

		const data = {}

		const updateMqObj = () => {
			data.cached = {}

			data.mq = {
				below,
				above,
			}
		}

		updateMqObj()

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateMqObj)
		}

		Vue.observable(data)

		Object.defineProperty(Vue.prototype, '$mq', {
			get() {
				return data.mq
			},
		})
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
	GlobalVue.use(VueMQ)
}

export default VueMQ
