<template>
	<div class="variables-input">
		<div class="variable" v-for="variable in variables" :key="variable.string">
			<label class="variable-label" :for="variable.id">{{ variable.string }}:</label>
			<input class="variable-input" type="text" :id="variable.id" v-model="value[variable.name]" />
		</div>
	</div>
</template>

<script>
import { xyzVariables, getXyzVariableMode } from '~/utils/xyzVariables'

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
	padding: $spacing-xxxs 0;
	display: flex;
	align-items: center;

	.variable-label {
		font-weight: bold;
		white-space: nowrap;
		color: primary-color(100);
	}

	.variable-input {
		flex-grow: 1;
		font-weight: bold;
		margin-left: $spacing-xxs;
		color: primary-color(100);
	}
}
</style>
