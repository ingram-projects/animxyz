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
	padding: $spacing-s;
	overflow-x: auto;
}

.variable {
	display: flex;
	align-items: center;
}

.variable-label {
	font-weight: bold;
	white-space: nowrap;
	color: primary-color(100);
}

.variable-input {
	height: 2rem;
	flex-grow: 1;
	font-weight: bold;
	padding: $spacing-xxxs $spacing-xxs;
	margin-left: $spacing-xxxs;
	color: $cyan;
	font-size: 1.125rem;
	border-radius: $br-m;
	transition: background 0.2s $ease-in-out, box-shadow 0.2s $ease-in-out;

	&:hover {
		background-color: primary-color(100, 0.1);
	}

	&:focus {
		box-shadow: inset 0 0 0 1px primary-color(100, 0.75);
	}
}
</style>
