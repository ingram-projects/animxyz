export default {
	data() {
		return {
			animCount: 0,
			toggled: false,
			toggleTimeout: null,
		}
	},
	computed: {
		data() {
			return {
				toggled: this.toggled,
				listeners: {
					beforeAppear: this.beforeAnim,
					beforeEnter: this.beforeAnim,
					beforeLeave: this.beforeAnim,
					afterAppear: this.afterAnim,
					afterEnter: this.afterAnim,
					afterLeave: this.afterAnim,
					appearCancelled: this.afterAnim,
					enterCancelled: this.afterAnim,
					leaveCancelled: this.afterAnim,
				},
			}
		},
	},
	methods: {
		clearToggleTimeout() {
			clearTimeout(this.toggleTimeout)
			this.toggleTimeout = null
		},
		toggleExample() {
			this.animCount = 0
			this.clearToggleTimeout()
			this.toggleTimeout = setTimeout(() => {
				this.toggled = !this.toggled
			}, 1000)
		},
		beforeAnim() {
			this.animCount++
		},
		afterAnim() {
			this.animCount--
			if (this.animCount === 0) {
				this.toggleExample()
			}
		},
	},
	mounted() {
		this.toggleExample()
	},
	beforeDestroy() {
		this.clearToggleTimeout()
	},
}
