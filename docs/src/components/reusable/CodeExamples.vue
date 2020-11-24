<template>
	<div class="code-examples">
		<TabBar :tabs="examples" v-if="examples.length > 1" v-model="activeExample"></TabBar>

		<XyzTransition xyz="fade" mode="out-in">
			<div class="examples-sections" v-if="activeExample" :key="activeExample.name">
				<div class="example-template">
					<DynamicTemplate :template="activeExample.template" :data="data"></DynamicTemplate>
				</div>

				<CodeBlock class="example-code" body-scroll-lock-ignore :code="activeExample.code" :data="data"></CodeBlock>
			</div>
		</XyzTransition>
	</div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import DynamicTemplate from '~/components/reusable/DynamicTemplate'
import TabBar from '~/components/reusable/TabBar'

export default {
	name: 'CodeExamples',
	props: {
		examples: Array,
		data: Object,
	},
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
	methods: {
		setExample(exampleName) {
			this.activeExample = this.examples.find((example) => {
				return example.name === exampleName
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.code-examples {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	.example-code {
		font-size: 1.125rem;

		@include media('<tablet') {
			font-size: $fs-m;
		}
	}
}

.examples-sections {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
}

.example-template {
	position: relative;
	min-height: 10rem;
	flex-grow: 1;
	padding: $sp-s;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
