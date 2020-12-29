<template>
	<div class="sandbox">
		<XyzTransition xyz="fade">
			<XyzModifiersInput
				v-if="modifiers"
				v-model="xyzModifiers"
				:modifiers="modifiers"
				ref="modifiers"
			></XyzModifiersInput>
		</XyzTransition>
		<CodeExamples :examples="examples" :injected-data="injectedData" ref="examples"></CodeExamples>
	</div>
</template>

<script>
import CodeExamples from '~/components/reusable/CodeExamples'
import XyzModifiersInput from '~/components/reusable/XyzModifiersInput'

export default {
	name: 'Sandbox',
	props: {
		name: String,
		examples: Array,
		modifiers: Object,
	},
	components: {
		CodeExamples,
		XyzModifiersInput,
	},
	data() {
		return {
			xyzModifiers: null,
		}
	},
	computed: {
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
				utilities: this.xyzModifiers.utilities,
				utilitiesString: this.utilitiesString,
				variables: this.xyzModifiers.variables,
				variablesString: this.variablesString,
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
	},
}
</script>

<style lang="scss" scoped>
.sandbox {
	background: var(--sandbox-color);
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
