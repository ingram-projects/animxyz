<template>
	<XyzTransitionGroup
		class="variables__wrap"
		body-scroll-lock-ignore
		appear
		xyz="fade down-3"
		style="--xyz-stagger: 0.05s"
	>
		<div class="variable" v-for="variable in computedVariables" :key="variable.string">
			<label class="variable-label" :for="variable.id">{{ variable.string }}:</label>
			<input
				class="variable-input"
				type="text"
				:id="variable.id"
				:placeholder="variable.syntax"
				v-model="toggledVariables[variable.string]"
			/>
		</div>
	</XyzTransitionGroup>
</template>

<script>
import isEqual from 'lodash/isEqual'
import { getXyzVariable, getXyzVariableRegex } from '~/utils'

export default {
	name: 'XyzVariablesInput',
	props: {
		value: Object,
		variables: Array,
	},
	data() {
		return {
			toggledVariables: {},
		}
	},
	computed: {
		computedVariables() {
			return this.variables.map((variable) => {
				const variableObj = getXyzVariable(variable)
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
.variables__wrap {
	font-family: $font-stack-mono;
	padding: $sp-s 0;
	overflow-x: auto;

	@include media('<laptop') {
		padding: $sp-xxs 0;
	}
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
