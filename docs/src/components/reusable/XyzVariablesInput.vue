<template>
	<div class="variables-input">
		<div class="variable" v-for="variable in variables" :key="variable.string">
			<label class="variable-label" :for="variable.id">{{ variable.string }}:</label>
			<input
				class="variable-input"
				type="text"
				:id="variable.id"
				:placeholder="variable.syntax"
				v-model="toggledVariables[variable.string]"
			/>
		</div>
	</div>
</template>

<script>
import isEqual from 'lodash/isEqual'
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
				const variableObj = getXyzVariable(variable.name)
				return {
					...variableObj,
					id: `${this._uid}_${variableObj.string}`,
				}
			})
		},
	},
	watch: {
		value: {
			deep: true,
			immediate: true,
			handler(val, oldVal) {
				if (!isEqual(val, oldVal)) {
					this.toggledVariables = {}
					Object.entries(this.value).forEach(([name, value]) => {
						const variable = getXyzVariableRegex(name)

						if (variable) {
							this.$set(this.toggledVariables, variable.string, value)
						}
					})
				}
			},
		},
		toggledVariables: {
			deep: true,
			handler() {
				const newValue = {}
				Object.entries(this.toggledVariables).forEach(([name, value]) => {
					const trimmedValue = value.trim()
					if (trimmedValue.length) {
						newValue[name] = trimmedValue
					}
				})
				this.$emit('input', newValue)
			},
		},
	},
}
</script>

<style lang="scss" scoped>
.variables-input {
	font-family: $font-stack-mono;
	padding: $sp-s 0;
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
	padding-left: $sp-s;
	padding-right: 1ch;
	transition: color 0.2s $ease-in-out;
}

.variable-input {
	height: 2rem;
	flex-grow: 1;
	font-weight: bold;
	padding-right: $sp-s;
	color: $cyan;
	font-size: 1.125rem;

	&::placeholder {
		color: primary-color(100, 0.2);
	}
}
</style>
