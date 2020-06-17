<template>
	<div class="sandbox">
		<xyz-modifiers-input v-if="modifiers" v-model="xyzModifiers" :modifiers="modifiers"></xyz-modifiers-input>
		<code-examples v-if="examples" :examples="examples" :data="injectedData" @example-changed="onExampleChanged"></code-examples>
	</div>
</template>

<script>
import CodeExamples from '~/components/reusable/CodeExamples'
import XyzModifiersInput from '~/components/reusable/XyzModifiersInput'

export default {
	name: 'Sandbox',
	props: ['examples', 'modifiers'],
	components: {
		CodeExamples,
		XyzModifiersInput,
	},
	data() {
		return {
			exampleToggled: false,
			xyzModifiers: null,
			animCount: 0,
			toggleInterval: 1000,
			toggleTimeout: null,
		}
	},
	computed: {
		injectedData() {
			return {
				toggled: this.exampleToggled,
				mode: this.exampleToggled ? 'xyz-in' : 'xyz-out',
				modifiers: this.xyzModifiers,
				listeners: {
					beforeEnter: this.beforeAnim,
					afterEnter: this.afterAnim,
					beforeLeave: this.beforeAnim,
					afterLeave: this.afterAnim,
				},
			}
		},
	},
	watch: {
		modifiers: {
			immediate: true,
			handler() {
				if (this.modifiers) {
					this.xyzModifiers = {
						utilities: '',
						variables: {},
					}
					if (this.modifiers.utilities && this.modifiers.utilities.default) {
						this.xyzModifiers.utilities = this.modifiers.utilities.default
					}
					if (this.modifiers.variables && this.modifiers.variables.default) {
						this.xyzModifiers.variables = this.modifiers.variables.default
					}
				} else {
					this.xyzModifiers = null
				}
			},
		},
	},
	methods: {
		toggleExample(toggled) {
			this.animCount = 0
			this.exampleToggled = toggled
		},
		beforeAnim() {
			this.animCount++
		},
		afterAnim() {
			this.animCount--
			if (this.animCount === 0) {
				clearTimeout(this.toggleTimeout)
				this.toggleTimeout = setTimeout(() => {
					this.toggleExample(!this.exampleToggled)
				}, this.toggleInterval)
			}
		},
		onExampleChanged() {
			clearTimeout(this.toggleTimeout)
			this.toggleExample(false)
			this.toggleTimeout = setTimeout(() => {
				this.toggleExample(true)
			}, this.toggleInterval)
		}
	},
	beforeDestroy() {
		clearTimeout(this.toggleTimeout)
	},
}
</script>

<style lang="scss" scoped>
.sandbox {
	background: primary-color(900);
	border-radius: $br-l;
}

.modifiers-input {
	border-bottom: 1px solid primary-color(800);
}

.sandbox-row {
	&:not(:last-child) {
		border-bottom: 1px solid;
		border-color: primary-color(800);
	}
}
</style>
