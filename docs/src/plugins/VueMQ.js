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
			const { min, max, equal = false, direction = 'width', defaultTo = true } = options

			if (typeof window === 'undefined') return defaultTo

			const components = []
			if (min) {
				const val = getBreakpoint(min)
				if (equal) {
					components.push(`(min-${direction}: ${val}px)`)
				} else {
					components.push(`(not (max-${direction}: ${val}px))`)
				}
			}
			if (max) {
				const val = getBreakpoint(max)
				if (equal) {
					components.push(`(max-${direction}: ${val}px)`)
				} else {
					components.push(`(not (min-${direction}: ${val}px))`)
				}
			}
			if (!components.length) return false

			const mediaQuery = components.join(' and ')
			if (!data.cached[mediaQuery]) {
				data.cached[mediaQuery] = matchMedia(mediaQuery).matches
			}
			return data.cached[mediaQuery]
		}

		function below(max, options) {
			return media({ max, ...options })
		}

		function belowEq(max, options) {
			return media({ max, equal: true, ...options })
		}

		function above(min, options) {
			return media({ min, ...options })
		}

		function aboveEq(min, options) {
			return media({ min, equal: true, ...options })
		}

		const data = {}

		const updateMqObj = () => {
			data.cached = {}

			data.mq = {
				media,
				below,
				belowEq,
				above,
				aboveEq,
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
