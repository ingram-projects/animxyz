<template>
	<div class="variables-input">
		<div class="variable" v-for="variable in variables" :key="variable.string">
			<label class="variable-label" :for="variable.id">{{ variable.string }}:</label>
			<input class="variable-input" type="text" :id="variable.id" v-model="value[variable.name]" />
		</div>
	</div>
</template>

<script>
import { xyzVariables, getXyzVariableMode } from '~/utils'

export default {
	name: 'XyzVariablesInput',
	props: ['value', 'types'],
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
				const variableMode = getXyzVariableMode(variable.name)
				return {
					...variableMode,
					id: `${this._uid}_${variableMode.string}`,
				}
			})
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
	padding: 0 $spacing-s;
	display: flex;
	align-items: center;
	transition: background-color 0.2s $ease-in-out;

	&:focus-within {
		background-color: primary-color(100, 0.075);

		.variable-label {
			color: primary-color(50);
		}
	}
}

.variable-label {
	font-weight: bold;
	white-space: nowrap;
	color: primary-color(300);
	transition: color 0.2s $ease-in-out;
}

.variable-input {
	height: 2rem;
	flex-grow: 1;
	font-weight: bold;
	padding: $spacing-xxxs $spacing-xxs;
	margin-left: $spacing-xxxs;
	color: $cyan;
	font-size: 1.125rem;
}
</style>
