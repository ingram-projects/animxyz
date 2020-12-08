<script>
export default {
	name: 'DynamicTemplate',
	props: {
		template: String,
		data: Object,
	},
	computed: {
		component() {
			return {
				template: this.template,
				props: {
					data: Object,
				},
			}
		},
	},
	render(createElement) {
		return createElement(this.component, {
			props: {
				data: this.data,
			},
			attrs: this.$attrs,
			on: this.$listeners,
		})
	},
}
</script>
