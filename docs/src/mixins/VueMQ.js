export default function (breakpoints = {}) {
  return {
    data () {
      return {
        resize: 1,
        breakpoints,
      }
    },
    computed: {
      mq() {
        if (!this.resize) return null
        const media = (options) => {
          const {
            min,
            max,
            direction = 'width',
          } = options

          const components = []
          if (min) {
            components.push(`(min-${direction}: ${this.breakpoint(min)})`)
          }
          if (max) {
            components.push(`(max-${direction}: ${this.breakpoint(max)})`)
          }

          const mediaQuery = components.join(' and ')
          return matchMedia(mediaQuery).matches
        }

        const below = (max, direction) => media({ max, direction })
        const above = (min, direction) => media({ min, direction })
        const between = (min, max, direction) => media({ min, max, direction })

        return {
          media,
          below,
          above,
          between,
        }
      },
    },
    methods: {
      breakpoint(val) {
        if (this.breakpoints[val]) {
          return this.breakpoints[val]
        }
        return val
      },
      onResize() {
        this.resize += 1
      },
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    }
  }
}
