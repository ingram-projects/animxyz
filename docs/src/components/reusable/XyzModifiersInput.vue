<template>
	<div class="modifiers-input">
		<tab-bar
			class="modifiers-tabs"
			:tabs="modifiers.groups"
			v-if="modifiers.groups.length > 1"
			v-model="activeGroup"
		></tab-bar>

		<xyz-transition-group tag="div" xyz="ease-in-out duration-3" v-xyz="tabDirectionXyz">
			<div class="modifiers-sections" :key="activeGroup.name">
				<xyz-utilities-input
					class="modifiers-utilities modifiers-section"
					:types="activeGroup.types"
					:multiple="multipleUtilities"
					v-model="value.utilities"
					v-if="!hideUtilities"
				></xyz-utilities-input>

				<xyz-variables-input
					class="modifiers-variables modifiers-section"
					:types="activeGroup.types"
					v-model="value.variables"
					v-if="!hideVariables"
				></xyz-variables-input>
			</div>
		</xyz-transition-group>
	</div>
</template>

<script>
import TabBar from '~/components/reusable/TabBar'
import XyzUtilitiesInput from '~/components/reusable/XyzUtilitiesInput'
import XyzVariablesInput from '~/components/reusable/XyzVariablesInput'

export default {
	name: 'Sandbox',
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
		multipleUtilities() {
			return this.modifiers.utilities && this.modifiers.utilities.multiple
		},
		hideUtilities() {
			return this.modifiers.utilities && this.modifiers.utilities.hide
		},
		hideVariables() {
			return this.modifiers.variables && this.modifiers.variables.hide
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
.modifiers-input {
	position: relative;
	overflow: hidden;
}

.modifiers-sections {
	&.xyz-out {
		position: absolute;
		width: 100%;
	}
}

.modifiers-section {
	&:not(:last-child) {
		padding-bottom: 0;
	}
}
</style>
