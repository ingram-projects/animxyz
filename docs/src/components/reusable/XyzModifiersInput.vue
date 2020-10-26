<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div class="modifiers__wrap">
		<tab-bar :tabs="computedGroups" v-if="computedGroups.length > 1" v-model="activeGroup"></tab-bar>

		<xyz-transition-group
			tag="div"
			class="modifiers-sections__wrap"
			xyz="ease-in-out duration-3"
			v-xyz="tabDirectionXyz"
		>
			<div class="modifiers-sections" v-if="activeGroup.name === 'Presets'" :key="activeGroup.name">
				<xyz-modifiers-presets :presets="activeGroup.presets"></xyz-modifiers-presets>
			</div>
			<div class="modifiers-sections" v-if="activeGroup.name !== 'Presets'" :key="activeGroup.name">
				<xyz-utilities-input
					v-if="showUtilities"
					class="modifiers-utilities modifiers-section"
					:utilities="this.activeGroup.utilityNames"
					:multiple="this.modifiers.utilities.multiple"
					v-model="value.utilities"
				></xyz-utilities-input>

				<xyz-variables-input
					v-if="showVariables"
					class="modifiers-variables modifiers-section"
					:variables="this.activeGroup.variableNames"
					v-model="value.variables"
					:style="{ '--xyz-delay': `${this.activeGroup.utilityNames.length * 0.05}s` }"
				></xyz-variables-input>
			</div>
		</xyz-transition-group>
	</div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */

import TabBar from '~/components/reusable/TabBar'
import XyzModifiersPresets from '~/components/reusable/XyzModifiersPresets'
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'
import { xyzUtilities, xyzVariables } from '~/utils'

export default {
	name: 'XyzModifiersInput',
	props: ['value', 'modifiers'],
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
				const utilityNames = []
				const variableNames = []

				group.types.forEach((type) => {
					utilityNames.push(
						...xyzUtilities
							.filter((utility) => {
								return utility.type === type
							})
							.map((utility) => utility.name)
					)
					variableNames.push(
						...xyzVariables
							.filter((variable) => {
								return variable.type === type
							})
							.map((variable) => variable.name)
					)
				})

				return {
					name: group.name,
					utilityNames,
					variableNames,
				}
			})

			if (this.modifiers.presets) {
				const presetsGroup = {
					name: 'Presets',
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
		'computedGroups': {
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
	},
}
</script>

<style lang="scss" scoped>
.modifiers__wrap {
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
</style>
