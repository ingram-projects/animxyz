<template>
	<div class="sandbox">
		<xyz-modifiers-input v-if="modifiers" v-model="xyzModifiers" :modifiers="modifiers"></xyz-modifiers-input>
		<code-examples v-if="examples" :examples="examples" :data="injectedData"></code-examples>
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
	mounted() {
		this.toggleExample()
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

.sandbox-row {
	&:not(:last-child) {
		border-bottom: 1px solid;
		border-color: primary-color(800);
	}
}
</style>
