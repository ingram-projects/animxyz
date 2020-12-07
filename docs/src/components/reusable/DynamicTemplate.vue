<script>
export default {
	name: 'DynamicTemplate',
	props: {
		componentName: String,
		template: String,
		data: Object,
	},
	computed: {
		component() {
			if (this.componentName) {
				return this.componentName
			}
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
		})
	},
}
</script>
