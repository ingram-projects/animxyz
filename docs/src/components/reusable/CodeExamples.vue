<template>
	<div class="code-examples">
		<div class="example-template">
			<dynamic-template :template="activeExample.template" :data="data"></dynamic-template>
		</div>

		<code-block class="example-code" :code="activeExample.code" :data="data"></code-block>
	</div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import DynamicTemplate from '~/components/reusable/DynamicTemplate'

export default {
	name: 'CodeExamples',
	props: ['examples', 'data'],
	components: {
		CodeBlock,
		DynamicTemplate,
	},
	data() {
		return {
			activeExample: null,
		}
	},
	watch: {
		examples: {
			immediate: true,
			handler() {
				if (this.examples.length) {
					if (this.activeExample) {
						this.activeExample = this.examples.find((example) => {
							return example.name === this.activeExample.name
						})
					}
					if (!this.activeExample) {
						this.activeExample = this.examples[0]
					}
				} else {
					this.activeExample = null
				}
			},
		},
	},
}
</script>

<style lang="scss" scoped>
.example-template {
	position: relative;
	min-height: 12rem;
	display: flex;
	align-items: center;
	justify-content: center;
	perspective: 200px;
	--xyz-duration-default: 1s;
}
</style>
