<template>
	<div class="code-examples">
		<TabBar :tabs="examples" v-if="examples.length > 1" v-model="activeExample"></TabBar>

		<XyzTransition xyz="fade" mode="out-in">
			<div class="examples-sections" v-if="activeExample">
				<div class="example-template">
					<component
						v-if="activeExample.component"
						:is="activeExample.component"
						:data="data"
						@custom-data="onCustomDataChanged"
					></component>
					<DynamicTemplate
						v-if="activeExample.template"
						:template="activeExample.template"
						:data="data"
						@custom-data="onCustomDataChanged"
					></DynamicTemplate>
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
		injectedData: Object,
	},
	components: {
		CodeBlock,
		DynamicTemplate,
		TabBar,
	},
	data() {
		return {
			activeExample: null,
			animCount: 0,
			toggled: false,
			toggleTimeout: null,
			customData: null,
		}
	},
	computed: {
		data() {
			return {
				toggled: this.toggled,
				mode: this.toggled ? 'xyz-in' : 'xyz-out',
				listeners: {
					beforeAppear: this.beforeAnim,
					beforeEnter: this.beforeAnim,
					beforeLeave: this.beforeAnim,
					afterAppear: this.afterAnim,
					afterEnter: this.afterAnim,
					afterLeave: this.afterAnim,
					appearCancelled: this.afterAnim,
					enterCancelled: this.afterAnim,
					leaveCancelled: this.afterAnim,
				},
				...this.injectedData,
				...this.customData,
			}
		},
	},
	watch: {
		activeExample() {
			this.onExampleChange()
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
		clearToggleTimeout() {
			clearTimeout(this.toggleTimeout)
			this.toggleTimeout = null
		},
		toggleExample() {
			this.animCount = 0
			this.clearToggleTimeout()
			this.toggleTimeout = setTimeout(() => {
				this.toggled = !this.toggled
			}, 1000)
		},
		beforeAnim() {
			this.animCount++
		},
		afterAnim() {
			this.animCount--
			if (this.animCount === 0) {
				this.toggleExample()
			}
		},
		onExampleChange() {
			this.toggled = false
			this.customData = {}
			this.toggleExample()
		},
		setExample(exampleName) {
			this.activeExample = this.examples.find((example) => {
				return example.name === exampleName
			})
		},
		onCustomDataChanged(customData) {
			this.customData = customData
		},
	},
	mounted() {
		this.onExampleChange()
	},
	beforeDestroy() {
		this.clearToggleTimeout()
	},
}
</script>

<style lang="scss" scoped>
.code-examples {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
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

.example-code {
	font-size: 1.125rem;

	@include media('<tablet') {
		font-size: $fs-m;
	}
}
</style>
