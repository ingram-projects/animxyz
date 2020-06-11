<template>
	<div class="modifiers-input">
		<xyz-utilities-input
			class="modifiers-utilities"
			:types="activeGroup.types"
			:multiple="multipleUtilities"
			v-model="value.utilities"
			v-if="!hideUtilities"
		></xyz-utilities-input>

		<xyz-variables-input
			class="modifiers-variables"
			:types="activeGroup.types"
			v-model="value.variables"
			v-if="!hideVariables"
		></xyz-variables-input>
	</div>
</template>

<script>
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'

export default {
	name: 'Sandbox',
	props: ['value', 'modifiers'],
	components: {
		XyzUtilitiesInput,
		XyzVariablesInput,
	},
	data() {
		return {
			activeGroup: null,
		}
	},
	computed: {
		multipleUtilities() {
			return this.modifiers.utilities && this.modifiers.utilities.multiple
		},
		hideUtilities() {
			return this.modifiers.utilities && this.modifiers.utilities.hide
		},
		hideVariables() {
			return this.modifiers.variables && this.modifiers.variables.hide
		},
	},
	watch: {
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
}
</script>

<style lang="scss" scoped></style>
