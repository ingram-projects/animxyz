<template>
	<div class="utilities-input">
		<table class="utilities-group" v-for="group in groups" :key="group.name">
			<tr>
				<th></th>
				<th class="group-level__header" v-for="groupLevel in group.levels" :key="groupLevel">
					{{ groupLevel }}
				</th>
			</tr>
			<tr v-for="utility in group.utilities" :key="utility.name">
				<th class="group-utility__header">
					{{ utility.name }}
				</th>
				<td class="utility-level" v-for="utilityLevel in utility.levels" :key="utilityLevel.id">
					<div class="utility-level__content" v-if="utilityLevel.valid">
						<input
							class="toggle-input"
							type="radio"
							:id="utilityLevel.id"
							:value="utilityLevel.value"
							v-model="selectedObj[utility.model]"
							@click="onCellClick(utilityLevel, utility.model)"
						/>
						<label class="toggle-label" :for="utilityLevel.id">
							<div class="toggle-indicator"></div>
						</label>
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { xyzUtilities, getXyzUtility, getXyzUtilityLevel } from '~/utils'

export default {
	name: 'XyzUtilitiesInput',
	props: ['value', 'utilities', 'multiple', 'groupBy'],
	data() {
		return {
			selectedObj: {},
		}
	},
	computed: {
		computedUtilities() {
			if (this.utilities === 'all') {
				return xyzUtilities
			}
			return this.utilities.map((name) => {
				return getXyzUtility(name)
			})
		},
		groups() {
			// Compute groups
			const groupsMap = {}
			if (!this.groupBy) {
				groupsMap.all = this.computedUtilities
			} else {
				this.computedUtilities.forEach((utility) => {
					const groupName = utility[this.groupBy]
					if (!groupsMap[groupName]) {
						groupsMap[groupName] = []
					}
					groupsMap[groupName].push(utility)
				})
			}

			return Object.entries(groupsMap).map(([name, group]) => {
				const groupObj = {
					name,
				}

				// Compute group levels
				const groupLevelsMap = {}
				group.forEach((utility) => {
					Object.keys(utility.utilityMap).forEach((level) => {
						groupLevelsMap[level] = true
					})
				})
				groupObj.levels = ['default', ...Object.keys(groupLevelsMap)]

				// Compute group utilities
				groupObj.utilities = group.map((utility) => {
					return {
						name: utility.name,
						model: this.getUtilityModel(utility),
						levels: groupObj.levels.map((level) => {
							const utilityLevel = getXyzUtilityLevel(utility.name, level)
							return {
								...utilityLevel,
								id: `${this._uid}_${utilityLevel.string}`,
								value: utilityLevel.string,
								valid: utilityLevel.valid,
							}
						}),
					}
				})

				return groupObj
			})
		},
	},
	watch: {
		value: {
			immediate: true,
			handler() {
				this.selectedObj = {}
				const selectedUtilities = this.value.split(' ')
				selectedUtilities.forEach((selectedUtility) => {
					const match = selectedUtility.match(/^([a-zA-Z-]+)(?:-(\d+))?$/)
					if (match) {
						const name = match[1]
						const utility = getXyzUtility(name)
						const model = this.getUtilityModel(utility)
						this.$set(this.selectedObj, model, selectedUtility)
					}
				})
			},
		},
		selectedObj: {
			deep: true,
			handler() {
				const selected = Object.values(this.selectedObj).join(' ')
				this.$emit('input', selected)
			},
		},
	},
	methods: {
		getUtilityModel(utility) {
			let model = 'utility'
			if (this.multiple) {
				model += `_${utility.type}`
				if (utility.axis) {
					model += `_${utility.axis}`
				}
			}
			return model
		},
		onCellClick(cell, model) {
			if (this.multiple && this.selectedObj[model] === cell.value) {
				this.$delete(this.selectedObj, model)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.utilities-input {
	padding: $spacing-xs;
	padding-left: 0;
	border-radius: $br-l;
	font-family: $font-stack-mono;
	overflow-x: auto;
}

.utilities-group {
	width: 100%;
	border-collapse: collapse;
	background-color: primary-color(900);

	th {
		padding: $spacing-xxxs;
		vertical-align: middle;
		color: primary-color(100);
	}

	.group-utility__header {
		position: sticky;
		padding-left: $spacing-xs;
		left: 0;
		width: 0.1%;
		text-align: right;
		white-space: nowrap;
		background-color: primary-color(900, 0.75);
		z-index: 1;
	}

	.group-level__header {
		min-width: 2.5rem;
	}

	.utility-level {
		position: relative;
	}

	.utility-level__content {
		width: 100%;
		height: 2rem;
	}

	.toggle-input {
		display: none;

		&:checked + .toggle-label .toggle-indicator {
			@include size(1.5rem);
			border-radius: $br-m;
			opacity: 1;
		}
	}

	.toggle-label {
		width: 100%;
		height: 100%;
		display: flex;
		cursor: pointer;

		&:hover {
			.toggle-indicator {
				@include size(1rem);
				border-radius: $br-m;
				opacity: 0.5;
			}
		}
	}

	.toggle-indicator {
		@include circle(0.25rem);
		margin: auto;
		opacity: 0.2;
		background-color: primary-color(100);
		transition: all 0.15s $ease-in-out;
	}
}
</style>
