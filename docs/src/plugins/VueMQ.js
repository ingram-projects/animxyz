const VueMQ = {
	install(Vue, options) {
    const breakpoints = options.breakpoints || {}

    const getBreakpoint = (val) => {
      if (breakpoints[val]) {
        return breakpoints[val]
      }
      return val
    }

    const mq = {}

    const updateMqObj = () => {
      mq.media = (options) => {
        const {
          min,
          max,
          direction = 'width',
        } = options

        const components = []
        if (min) {
          components.push(`(min-${direction}: ${getBreakpoint(min)})`)
        }
        if (max) {
          components.push(`(max-${direction}: ${getBreakpoint(max)})`)
        }

        const mediaQuery = components.join(' and ')
        return matchMedia(mediaQuery).matches
      }

      mq.below = (max, direction) => mq.media({ max, direction })
      mq.above = (min, direction) => mq.media({ min, direction })
      mq.between = (min, max, direction) => mq.media({ min, max, direction })
    }

    updateMqObj()
    window.addEventListener('resize', updateMqObj)

    Vue.prototype.$mq = Vue.observable(mq);
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
