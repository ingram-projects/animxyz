export default {
	props: {
		data: Object,
	},
	watch: {
		customData: {
			deep: true,
			handler() {
				this.onCustomData()
			},
		},
	},
	methods: {
		onCustomData() {
			this.$emit('custom-data', this.customData)
		},
	},
	created() {
		this.$nextTick(() => this.onCustomData())
	},
}
