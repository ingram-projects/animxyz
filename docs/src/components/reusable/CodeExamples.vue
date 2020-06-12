<template>
	<div class="code-examples">
		<tab-bar class="modifiers-tabs" :tabs="examples" v-if="examples.length > 1" v-model="activeExample"></tab-bar>

		<xyz-transition xyz="fade">
			<div class="examples-sections" :key="activeExample.name">
				<div class="example-template">
					<dynamic-template :template="activeExample.template" :data="data"></dynamic-template>
				</div>

				<code-block class="example-code" :code="activeExample.code" :data="data"></code-block>
			</div>
		</xyz-transition>
	</div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import DynamicTemplate from '~/components/reusable/DynamicTemplate'
import TabBar from '~/components/reusable/TabBar'

export default {
	name: 'CodeExamples',
	props: ['examples', 'data'],
	components: {
		CodeBlock,
		DynamicTemplate,
		TabBar,
	},
	data() {
		return {
			activeExample: null,
		}
	},
	watch: {
		activeExample() {
			this.$emit('example-changed', this.activeExample)
		},
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
	min-height: 10rem;
	padding: $spacing-s;
	display: flex;
	align-items: center;
	justify-content: center;
	perspective: 200px;
	--xyz-duration-default: 1s;
}

.example-code {
	font-size: 1.125rem;
}
</style>
