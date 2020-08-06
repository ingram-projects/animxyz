const VueLocation = {
	install(Vue) {
		const data = {}

		if (typeof window !== 'undefined') {
			const updateLocationObject = () => {
				data.location = Object.assign({}, window.location)
			}

			window.history.pushState = (f => function pushState(){
				const ret = f.apply(this, arguments)
				updateLocationObject()
				return ret
			})(window.history.pushState)

			window.history.replaceState = (f => function replaceState(){
				const ret = f.apply(this, arguments)
				updateLocationObject()
				return ret
			})(window.history.replaceState)

			window.addEventListener('popstate', () => {
				updateLocationObject()
			})

			updateLocationObject()
		}

		Vue.observable(data)

		Object.defineProperty(Vue.prototype, '$location', {
			get() {
				return data.location
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
	GlobalVue.use(VueLocation)
}

export default VueLocation
