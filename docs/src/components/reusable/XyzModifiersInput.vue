<template>
	<div class="modifiers__wrap">
		<tab-bar
			:tabs="modifiers.groups"
			v-if="modifiers.groups.length > 1"
			v-model="activeGroup"
		></tab-bar>

		<xyz-transition-group
			tag="div"
			class="modifiers-sections__wrap"
			xyz="ease-in-out duration-3"
			v-xyz="tabDirectionXyz"
		>
			<div class="modifiers-sections" :key="activeGroup.name">
				<xyz-utilities-input
					v-if="!this.modifiers.utilities || !this.modifiers.utilities.hide"
					class="modifiers-utilities modifiers-section"
					:utilities="utilityNames"
					:multiple="this.modifiers.utilities.multiple"
					v-model="value.utilities"
				></xyz-utilities-input>

				<xyz-variables-input
					v-if="!this.modifiers.variables || !this.modifiers.variables.hide"
					class="modifiers-variables modifiers-section"
					:variables="variableNames"
					v-model="value.variables"
					:style="{ '--xyz-delay': `${utilityNames.length * 0.05}s`}"
				></xyz-variables-input>
			</div>
		</xyz-transition-group>
	</div>
</template>

<script>
import TabBar from '~/components/reusable/TabBar'
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'
import { xyzUtilities, xyzVariables } from '~/utils'

export default {
	name: 'XyzModifiersInput',
	props: ['value', 'modifiers'],
	components: {
		TabBar,
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
		utilityNames() {
			const utilityNames = []
			if (this.activeGroup) {
				this.activeGroup.types.forEach((type) => {
					utilityNames.push(
						...xyzUtilities.filter((utility) => {
							return utility.type === type
						}).map((utility) => utility.name)
					)
				})
			}
			return utilityNames
		},
		variableNames() {
			const variableNames = []
			if (this.activeGroup) {
				this.activeGroup.types.forEach((type) => {
					variableNames.push(
						...xyzVariables.filter((variable) => {
							return variable.type === type
						}).map((variable) => variable.name)
					)
				})
			}
			return variableNames
		},
		activeGroupIndex() {
			if (this.activeGroup) {
				return this.modifiers.groups.findIndex((group) => {
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
		'modifiers.groups': {
			immediate: true,
			handler() {
				if (this.modifiers.groups.length) {
					if (this.activeGroup) {
						this.activeGroup = this.modifiers.groups.find((group) => {
							return group.name === this.activeGroup.name
						})
					}
					if (!this.activeGroup) {
						this.activeGroup = this.modifiers.groups[0]
					}
				} else {
					this.activeGroup = null
				}
			},
		},
	},
	methods: {
		setGroup(groupName) {
			this.activeGroup = this.modifiers.groups.find((group) => {
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
