<template>
	<div class="sandbox">
		<xyz-modifiers-input v-if="modifiers" v-model="xyzModifiers" :modifiers="modifiers" ref="modifiers"></xyz-modifiers-input>
		<code-examples
			v-if="examples"
			:examples="examples"
			:data="injectedData"
			@example-changed="onExampleChanged"
			ref="examples"
		></code-examples>
	</div>
</template>

<script>
import queryString from 'query-string'
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
		mode() {
			return this.exampleToggled ? 'xyz-in' : 'xyz-out'
		},
		utilitiesString() {
			return Object.keys(this.xyzModifiers.utilities).join(' ')
		},
		variablesString() {
			let variablesArray = []
			Object.entries(this.xyzModifiers.variables).forEach(([name, value]) => {
				variablesArray.push(`${name}: ${value}`)
			})
			return variablesArray.join('; ')
		},
		injectedData() {
			return {
				toggled: this.exampleToggled,
				mode: this.mode,
				utilities: this.xyzModifiers.utilities,
				utilitiesString: this.utilitiesString,
				variables: this.xyzModifiers.variables,
				variablesString: this.variablesString,
				listeners: {
					beforeEnter: this.beforeAnim,
					beforeLeave: this.beforeAnim,
					afterEnter: this.afterAnim,
					afterLeave: this.afterAnim,
				},
			}
		},
	},
	watch: {
		$location () {
			this.onLocationChange()
		},
		modifiers: {
			immediate: true,
			handler() {
				this.xyzModifiers = {
					utilities: {},
					variables: {},
				}
				if (this.modifiers) {
					if (this.modifiers.utilities && this.modifiers.utilities.defaults) {
						this.modifiers.utilities.defaults.forEach((defaultUtility) => {
							this.xyzModifiers.utilities[defaultUtility] = true
						})
					}
					if (this.modifiers.variables && this.modifiers.variables.defaults) {
						this.modifiers.variables.defaults.forEach((defaultVariable) => {
							this.xyzModifiers.variables[defaultVariable.name] = defaultVariable.value
						})
					}
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
		},
		onLocationChange() {
			if (this.$location.hash === `#${this.$attrs.id}` && this.$location.search) {
				const params = queryString.parse(this.$location.search)
				if (params.example) {
					this.$refs.examples.setExample(params.example)
				}
				if (params.group) {
					this.$refs.modifiers.setGroup(params.group)
				}
				if (params.utilities) {
					this.xyzModifiers.utilities = {}
					params.utilities.split(',').forEach((utility) => {
						this.xyzModifiers.utilities[utility] = true
					})
				}
				if (params.variables) {
					this.xyzModifiers.variables = {}
					params.variables.split(',').forEach((variable) => {
						const splitVariable = variable.split(':')
						this.xyzModifiers.variables[`--xyz-${splitVariable[0]}`] = splitVariable[1]
					})
				}
				history.replaceState(null, null, this.$location.pathname + this.$location.hash)
			}
		},
	},
	mounted() {
		this.onLocationChange()
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
	overflow: hidden;
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
