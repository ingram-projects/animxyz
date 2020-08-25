<template>
	<div class="code-examples">
		<xyz-transition xyz="fade">
			<tab-bar :tabs="examples" v-if="examples.length > 1" v-model="activeExample"></tab-bar>
		</xyz-transition>

		<xyz-transition xyz="fade" mode="out-in">
			<div class="examples-sections" v-if="activeExample" :key="activeExample.name">
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

	.example-code {
		font-size: 1.125rem;

		@include media('<laptop') {
			font-size: $fs-m;
			margin-bottom: 4.5rem;
			overflow-y: initial;
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
	max-height: 33vh;
	flex-grow: 1;
	padding: $sp-s;
	display: flex;
	align-items: center;
	justify-content: center;
	perspective: 200px;
}
</style>
