<template>
	<div class="examples-sandbox">
		<xyz-utilities-input
			class="example-utilities example-row"
			v-model="xyzUtilities"
			v-if="utilities"
			:utilities="utilities.names"
			:multiple="utilities.multiple"
		></xyz-utilities-input>

		<xyz-variables-input
			class="example-variables example-row"
			v-model="xyzVariables"
			v-if="variables"
			:variables="variables"
		></xyz-variables-input>

		<div class="example-template example-row">
			<dynamic-template :template="activeExample.template" :data="injectedData"></dynamic-template>
		</div>

		<code-block class="example-code example-row" :code="activeExample.code" :data="injectedData"></code-block>
	</div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import DynamicTemplate from '~/components/reusable/DynamicTemplate'
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'

export default {
	name: 'ExamplesSandbox',
	props: ['examples', 'utilities', 'variables'],
	components: {
		CodeBlock,
		DynamicTemplate,
		XyzUtilitiesInput,
		XyzVariablesInput,
	},
	data() {
		return {
			activeExampleIndex: null,
			exampleToggled: false,
			xyzUtilities: null,
			xyzVariables: null,
			animCount: 0,
			toggleTimeout: null,
		}
	},
	computed: {
		activeExample() {
			if (this.examples.length) {
				return this.examples[this.activeExampleIndex]
			}
			return null
		},
		compiledTemplate() {
			return this.activeExample.template
		},
		xyzMode() {
			return this.exampleToggled ? 'xyz-in' : 'xyz-out'
		},
		injectedData() {
			return {
				toggled: this.exampleToggled,
				utilities: this.xyzUtilities,
				variables: this.xyzVariables,
				mode: this.xyzMode,
				listeners: {
					beforeEnter: this.beforeAnim,
					afterEnter: this.afterAnim,
					beforeLeave: this.beforeAnim,
					afterLeave: this.afterAnim,
				},
			}
		},
	},
	methods: {
		setActiveExample(index) {
			this.activeExampleIndex = index
		},
		toggleExample() {
			this.animCount = 0
			this.exampleToggled = !this.exampleToggled
		},
		beforeAnim() {
			this.animCount++
		},
		afterAnim() {
			this.animCount--
			if (this.animCount === 0) {
				this.toggleTimeout = setTimeout(() => {
					this.toggleExample()
				}, 1000)
			}
		},
	},
	created() {
		this.setActiveExample(0)
		if (this.utilities) {
			this.xyzUtilities = this.utilities.default || ''
		}
		this.xyzVariables = {}
	},
	mounted() {
		this.toggleExample()
	},
	beforeDestroy() {
		clearTimeout(this.toggleTimeout)
	},
}
</script>

<style lang="scss" scoped>
.examples-sandbox {
	background: primary-color(900);
	border-radius: $br-l;
}

.example-row {
	&:not(:last-child) {
		border-bottom: 1px solid;
		border-color: primary-color(800);
	}
}

.example-template {
	position: relative;
	min-height: 12rem;
	display: flex;
	align-items: center;
	justify-content: center;
	perspective: 200px;
	--xyz-duration-default: 1s;
}

.example-utilities {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.example-variables {
	border-radius: 0;
}

.example-code {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	margin: 0;
	font-size: 1.125rem;
}
</style>
