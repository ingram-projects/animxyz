export default {
	props: {
		data: Object,
	},
	watch: {
		customData: {
			deep: true,
			handler() {
				this.onCustomDataChange()
			},
		},
	},
	methods: {
		onCustomDataChange() {
			this.$emit('custom-data', this.customData)
		},
	},
	mounted() {
		this.onCustomDataChange()
	},
}
