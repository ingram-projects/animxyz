import { xyzTransitionProps, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransitionVisible',
	props: {
		once: {
			type: Boolean,
			default: true,
		},
		container: {
			type: Object,
		},
		margin: {
			type: String,
		},
		threshold: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			visible: false,
			intersectionObserver: null,
		}
	},
	watch: {
		once() {
			this.updateIntersectionObserver()
		},
		container() {
			this.updateIntersectionObserver()
		},
		margin() {
			this.updateIntersectionObserver()
		},
		threshold() {
			this.updateIntersectionObserver()
		},
		$el() {
			this.updateElem()
		},
	},
	methods: {
		clearIntersectionObserver() {
			if (this.intersectionObserver) {
				this.intersectionObserver.disconnect()
				this.intersectionObserver = null
			}
		},
		updateIntersectionObserver() {
			this.clearIntersectionObserver()

			const intersectionObserverOptions = {
				root: this.container,
				rootMargin: this.margin,
				threshold: [0, this.threshold],
			}

			this.intersectionObserver = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.intersectionRatio >= this.threshold) {
							this.visible = true
							if (this.once) {
								this.clearIntersectionObserver()
							}
						}
					} else if (!this.once) {
						this.visible = false
					}
				})
			}, intersectionObserverOptions)

			this.updateElem()
		},
		updateElem() {
			if (this.intersectionObserver && this.$el) {
				this.intersectionObserver.observe(this.$el)
			}
		},
	},
	mounted() {
		this.updateIntersectionObserver()
	},
	beforeDestroy() {
		this.clearIntersectionObserver()
	},
	render(createElement) {
		const visibility = this.visible ? 'visible' : 'hidden'

		const data = mergeData(
			{
				attrs: {
					...xyzTransitionProps,
					mode: 'out-in',
				},
			},
			this.$vnode.data
		)

		const children = this.$slots.default.map((child) => {
			const childData = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
					style: {
						visibility,
					},
					key: visibility,
				},
				child.data
			)
			return createElement(child.tag, childData, child.children)
		})

		return createElement('transition', data, children)
	},
}
