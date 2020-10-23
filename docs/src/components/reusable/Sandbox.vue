<template>
	<div class="sandbox">
		<xyz-transition xyz="fade">
			<xyz-modifiers-input
				v-if="modifiers"
				v-model="xyzModifiers"
				:modifiers="modifiers"
				ref="modifiers"
			></xyz-modifiers-input>
		</xyz-transition>
		<code-examples
			:examples="examples"
			:data="injectedData"
			@example-changed="onExampleChanged"
			ref="examples"
		></code-examples>
	</div>
</template>

<script>
import CodeExamples from '~/components/reusable/CodeExamples'
import XyzModifiersInput from '~/components/reusable/XyzModifiersInput'

export default {
	name: 'Sandbox',
	props: ['name', 'examples', 'modifiers'],
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
					enterCancelled: this.animCancelled,
					leaveCancelled: this.animCancelled,
				},
			}
		},
	},
	watch: {
		$route() {
			this.onRouteChange()
		},
		name() {
			this.onRouteChange()
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
							this.xyzModifiers.variables[`--xyz-${defaultVariable.name}`] = defaultVariable.value
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
		animCancelled() {
			this.toggleExample(!this.exampleToggled)
		},
		onExampleChanged() {
			clearTimeout(this.toggleTimeout)
			this.toggleExample(false)
			this.toggleTimeout = setTimeout(() => {
				this.toggleExample(true)
			}, this.toggleInterval)
		},
		onRouteChange() {
			const { query, hash } = this.$route
			if (hash === `#${this.name}`) {
				if (query.example) {
					this.$refs.examples.setExample(query.example)
				}
				if (query.group) {
					this.$refs.modifiers.setGroup(query.group)
				}
				if (query.utilities) {
					this.xyzModifiers.utilities = {}
					query.utilities.split(';').forEach((utility) => {
						this.xyzModifiers.utilities[utility] = true
					})
				}
				if (query.variables) {
					this.xyzModifiers.variables = {}
					query.variables.split(';').forEach((variable) => {
						const splitVariable = variable.split(':')
						this.xyzModifiers.variables[`--xyz-${splitVariable[0]}`] = splitVariable[1]
					})
				}
			}
		},
	},
	mounted() {
		this.onRouteChange()
	},
	beforeDestroy() {
		clearTimeout(this.toggleTimeout)
	},
}
</script>

<style lang="scss" scoped>
.sandbox {
	background: primary-color(900);
	display: flex;
	flex-direction: column;
	padding-bottom: 5rem;
}

.modifiers-input {
	border-bottom: 1px solid primary-color(800);
}

.code-examples {
	flex-grow: 1;
}

.sandbox-row {
	&:not(:last-child) {
		border-bottom: 1px solid;
		border-color: primary-color(800);
	}
}
</style>
