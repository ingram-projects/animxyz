<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div class="modifiers__wrap">
		<TabBar :tabs="computedGroups" v-if="computedGroups.length > 1" v-model="activeGroup"></TabBar>

		<XyzTransitionGroup tag="div" class="modifiers-sections__wrap" xyz="ease-in-out duration-3" v-xyz="tabDirectionXyz">
			<div class="modifiers-sections" v-if="activeGroup.name === 'Presets'" :key="activeGroup.name">
				<XyzModifiersPresets :presets="activeGroup.presets" @select-preset="onSelectPreset"></XyzModifiersPresets>
			</div>
			<div class="modifiers-sections" v-if="activeGroup.name !== 'Presets'" :key="activeGroup.name">
				<XyzUtilitiesInput
					v-if="showUtilities"
					class="modifiers-utilities modifiers-section"
					:utilities="this.activeGroup.utilityNames"
					:multiple="this.modifiers.utilities.multiple"
					v-model="value.utilities"
				></XyzUtilitiesInput>

				<XyzVariablesInput
					v-if="showVariables"
					class="modifiers-variables modifiers-section"
					:variables="this.activeGroup.variableNames"
					v-model="value.variables"
					:style="{ '--xyz-delay': `${this.activeGroup.utilityNames.length * 0.05}s` }"
				></XyzVariablesInput>
			</div>
		</XyzTransitionGroup>

		<XyzTransition appear xyz="fade right skew-right-3 ease-out-back">
			<button v-if="numActiveModifiers" class="clear-modifiers" @click="clearModifiers">
				Clear All
				<XyzTransitionGroup xyz="flip-right-50 duration-3 ease-in-out">
					<div class="num-active-modifiers xyz-out-absolute" :key="numActiveModifiers">{{ numActiveModifiers }}</div>
				</XyzTransitionGroup>
			</button>
		</XyzTransition>
	</div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */

import TabBar from '~/components/reusable/TabBar'
import XyzModifiersPresets from '~/components/reusable/XyzModifiersPresets'
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'
import { xyzUtilities, xyzVariables, createXyzUtilityRegex, createXyzVariableRegex } from '~/utils'

export default {
	name: 'XyzModifiersInput',
	props: {
		value: Object,
		modifiers: Object,
	},
	components: {
		TabBar,
		XyzModifiersPresets,
		XyzUtilitiesInput,
		XyzVariablesInput,
	},
	data() {
		return {
			activeGroup: null,
			tabDirectionXyz: null,
		}
	},
	computed: {
		showUtilities() {
			return this.modifiers.utilities && !this.modifiers.utilities.hide
		},
		showVariables() {
			return this.modifiers.variables && !this.modifiers.variables.hide
		},
		computedGroups() {
			const computedGroups = this.modifiers.groups.map((group) => {
				const utilities = []
				const variables = []

				group.types.forEach((type) => {
					utilities.push(
						...xyzUtilities.filter((utility) => {
							return utility.type === type
						})
					)
					variables.push(
						...xyzVariables.filter((variable) => {
							return variable.type === type
						})
					)
				})

				const utilityNames = utilities.map((utility) => utility.name)
				const variableNames = variables.map((variable) => variable.name)

				const utilityRegex = createXyzUtilityRegex(utilityNames)
				const variableRegex = createXyzVariableRegex(variableNames)

				const hasToggledUtilities = Object.keys(this.value.utilities).some((utility) => {
					return utility.match(utilityRegex)
				})
				const hasToggledVariables = Object.keys(this.value.variables).some((variable) => {
					return variable.match(variableRegex)
				})

				return {
					...group,
					utilityNames,
					variableNames,
					hasContent: hasToggledUtilities || hasToggledVariables,
				}
			})

			if (this.modifiers.presets) {
				const presetsGroup = {
					name: 'Presets',
					icon: 'IconPresets',
					presets: this.modifiers.presets,
				}
				return [presetsGroup, ...computedGroups]
			}

			return computedGroups
		},
		activeGroupIndex() {
			if (this.activeGroup) {
				return this.computedGroups.findIndex((group) => {
					return group.name === this.activeGroup.name
				})
			}
			return -1
		},
		numActiveModifiers() {
			return Object.keys(this.value.utilities).length + Object.keys(this.value.variables).length
		},
	},
	watch: {
		activeGroup() {
			this.$emit('group-changed', this.activeGroup)
		},
		activeGroupIndex(newValue, oldValue) {
			if (newValue > oldValue) {
				this.tabDirectionXyz = 'out-left-100 in-right-100'
			} else {
				this.tabDirectionXyz = 'out-right-100 in-left-100'
			}
		},
		computedGroups: {
			immediate: true,
			handler() {
				if (this.computedGroups.length) {
					if (this.activeGroup) {
						this.setGroup(this.activeGroup.name)
					}
					if (!this.activeGroup) {
						this.activeGroup = this.computedGroups[0]
					}
				} else {
					this.activeGroup = null
				}
			},
		},
	},
	methods: {
		setGroup(groupName) {
			this.activeGroup = this.computedGroups.find((group) => {
				return group.name === groupName
			})
		},
		onSelectPreset(preset) {
			const newValue = {
				utilities: {},
				variables: {},
			}

			if (preset.utilities) {
				preset.utilities.forEach((utility) => {
					newValue.utilities[utility] = true
				})
			}
			if (preset.variables) {
				preset.variables.forEach((variable) => {
					const [name, value] = variable.split(':')
					newValue.variables[`--xyz-${name}`] = value.trim()
				})
			}

			this.$emit('input', newValue)
		},
		clearModifiers() {
			this.$emit('input', {
				utilities: {},
				variables: {},
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.modifiers__wrap {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
}

.modifiers-sections__wrap {
	position: relative;
	overflow: hidden;
}

.modifiers-sections {
	width: 100%;

	&.xyz-out {
		position: absolute;
	}
}

.modifiers-section {
	padding: $sp-s 0;

	& + & {
		padding-top: 0;
	}

	@include media('<laptop') {
		padding: $sp-xxs 0;
	}
}

.clear-modifiers {
	color: primary-color(200);
	padding: $sp-xxs $sp-xs;
	margin-left: auto;
	margin-right: $sp-xxs;
	font-size: $fs-s;
	font-weight: 500;
	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
	border-radius: $br-m;
	display: flex;
	align-items: center;

	.num-active-modifiers {
		@include size(1.125rem);
		color: primary-color(900);
		background-color: primary-color(200);
		border-radius: $br-m;
		margin-left: $sp-xxs;
		text-align: center;
		line-height: 1.125rem;
		backface-visibility: hidden;
	}

	&:hover,
	&:focus {
		background-color: primary-color(800, 0.5);
		color: primary-color(50);
	}
}
</style>
