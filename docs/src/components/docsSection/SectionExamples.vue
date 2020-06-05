<template>
	<div class="section-examples">
		<div class="section-example">
			<xyz-utilities-input class="example-utilities example-row" v-model="xyzUtilities" v-if="utilities" :utilities="utilities.names" :multiple="utilities.multiple"></xyz-utilities-input>

			<div class="example-template example-row">
				<compiled-template :template="activeExample.template" :data="injectedData"></compiled-template>
			</div>

			<xyz-variables-input class="example-variables example-row" v-model="xyzVariables" v-if="variables" :variables="variables"></xyz-variables-input>

			<code-block class="example-code example-row" :code="activeExample.code" :data="injectedData"></code-block>
		</div>
	</div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import CompiledTemplate from '~/components/reusable/CompiledTemplate'
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'

export default {
	name: 'SectionExamples',
	props: ['examples', 'utilities', 'variables'],
	components: {
		CodeBlock,
		CompiledTemplate,
		XyzUtilitiesInput,
		XyzVariablesInput,
	},
	data() {
		return {
			activeExampleIndex: null,
			exampleToggled: false,
			xyzUtilities: null,
			xyzVariables: null,
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
		injectedData() {
			return {
				toggleExample: this.toggleExample,
				exampleToggled: this.exampleToggled,
				xyzUtilities: this.xyzUtilities,
				xyzVariables: this.xyzVariables,
			}
		}
	},
	methods: {
		setActiveExample(index) {
			this.activeExampleIndex = index
		},
		toggleExample() {
			this.exampleToggled = !this.exampleToggled
		}
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
	}
}
</script>

<style lang="scss" scoped>
.section-example {
	margin-top: $spacing-m;
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
