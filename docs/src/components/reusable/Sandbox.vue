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
			@example-changed="onExampleChange"
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
			xyzModifiers: null,
			animCount: 0,
			toggled: false,
			toggleTimeout: null,
		}
	},
	computed: {
		mode() {
			return this.toggled ? 'xyz-in' : 'xyz-out'
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
				toggled: this.toggled,
				mode: this.mode,
				utilities: this.xyzModifiers.utilities,
				utilitiesString: this.utilitiesString,
				variables: this.xyzModifiers.variables,
				variablesString: this.variablesString,
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
				this.clearModifiers()
				if (this.modifiers) {
					if (this.modifiers.utilities && this.modifiers.utilities.defaults) {
						this.modifiers.utilities.defaults.forEach((defaultUtility) => {
							this.xyzModifiers.utilities[defaultUtility] = true
						})
					}
					if (this.modifiers.variables && this.modifiers.variables.defaults) {
						this.modifiers.variables.defaults.forEach((defaultVariable) => {
							const [name, value] = defaultVariable.split(':')
							this.xyzModifiers.variables[`--xyz-${name}`] = value.trim()
						})
					}
				}
			},
		},
	},
	methods: {
		clearModifiers() {
			this.xyzModifiers = {
				utilities: {},
				variables: {},
			}
		},
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
			this.toggleExample()
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
				if (query.utilities || query.variables) {
					this.clearModifiers()
				}
				if (query.utilities) {
					query.utilities.split(';').forEach((utility) => {
						this.xyzModifiers.utilities[utility] = true
					})
				}
				if (query.variables) {
					query.variables.split(';').forEach((variable) => {
						const [name, value] = variable.split(':')
						this.xyzModifiers.variables[`--xyz-${name}`] = value.trim()
					})
				}
			}
		},
	},
	mounted() {
		this.onRouteChange()
		this.onExampleChange()
	},
	beforeDestroy() {
		this.clearToggleTimeout()
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
