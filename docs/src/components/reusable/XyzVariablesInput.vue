<template>
	<div class="variables-input">
		<div class="variable" v-for="variable in variables" :key="variable.string">
			<label class="variable-label" :for="variable.id">{{ variable.string }}:</label>
			<input class="variable-input" type="text" :id="variable.id" :placeholder="variable.syntax" v-model="toggledVariables[variable.string]" />
		</div>
	</div>
</template>

<script>
import { xyzVariables, getXyzVariable, getXyzVariableRegex } from '~/utils'

export default {
	name: 'XyzVariablesInput',
	props: ['value', 'types'],
	data() {
		return {
			toggledVariables: {},
		}
	},
	computed: {
		typeVariables() {
			const typeVariables = []
			this.types.forEach((type) => {
				typeVariables.push(
					...xyzVariables.filter((variable) => {
						return variable.type === type
					})
				)
			})
			return typeVariables
		},
		variables() {
			return this.typeVariables.map((variable) => {
				const variableMode = getXyzVariable(variable.name)
				return {
					...variableMode,
					id: `${this._uid}_${variableMode.string}`,
				}
			})
		},
	},
	watch: {
		value: {
			immediate: true,
			handler() {
				this.toggledVariables = {}
				if (this.value) {
					const toggledVariables = this.value.split('; ')
					toggledVariables.forEach((toggledVariable) => {
						const variable = getXyzVariableRegex(toggledVariable)

						if (variable) {
							this.$set(this.toggledVariables, variable.string, variable.value)
						}
					})
				}
			},
		},
		toggledVariables: {
			deep: true,
			handler() {
				let toggled = []
				Object.entries(this.toggledVariables).forEach(([name, value]) => {
					const trimmedValue = value.trim()
					if (trimmedValue.length) {
						toggled.push(`${name}: ${trimmedValue}`)
					}
				})
				this.$emit('input', toggled.join('; '))
			},
		},
	},
}
</script>

<style lang="scss" scoped>
.variables-input {
	font-family: $font-stack-mono;
	padding: $spacing-s 0;
	overflow-x: auto;
}

.variable {
	display: flex;
	transition: background-color 0.2s $ease-in-out;

	&:hover {
		background-color: primary-color(800, 0.2);
	}

	&:focus-within {
		background-color: primary-color(800, 0.35);

		.variable-label {
			color: primary-color(50);
		}
	}
}

.variable-label {
	display: flex;
	align-items: center;
	font-weight: bold;
	white-space: nowrap;
	color: primary-color(300);
	padding-left: $spacing-s;
	padding-right: 1ch;
	transition: color 0.2s $ease-in-out;
}

.variable-input {
	height: 2rem;
	flex-grow: 1;
	font-weight: bold;
	padding-right: $spacing-s;
	color: $cyan;
	font-size: 1.125rem;

	&::placeholder {
		color: primary-color(100, 0.2);
	}
}
</style>
