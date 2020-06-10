<template>
	<div class="utilities-input">
		<table class="utilities-table">
			<tr>
				<th></th>
				<th class="utility-level__header" v-for="utilityLevel in utilityLevels" :key="utilityLevel">
					{{ utilityLevel }}
				</th>
			</tr>
			<tr v-for="row in rows" :key="row.name">
				<th class="utility-class__header">
					{{ row.name }}
				</th>
				<td class="utility-level" v-for="cell in row.cells" :key="cell.id">
					<div class="utility-level__content" v-if="cell.valid">
						<input
							class="toggle-input"
							type="radio"
							:id="cell.id"
							:value="cell.value"
							v-model="selectedObj[row.model]"
							@click="onCellClick(cell, row.model)"
						/>
						<label class="toggle-label" :for="cell.id">
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
	props: ['value', 'utilities', 'multiple'],
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
		utilityLevels() {
			const utilityLevelsMap = {}
			this.computedUtilities.forEach((utility) => {
				Object.keys(utility.utilityMap).forEach((utilityLevel) => {
					utilityLevelsMap[utilityLevel] = true
				})
			})
			return ['default', ...Object.keys(utilityLevelsMap)]
		},
		rows() {
			return this.computedUtilities.map((utility) => {
				return {
					name: utility.name,
					model: this.getUtilityClassModel(utility),
					cells: this.utilityLevels.map((level) => {
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
						const model = this.getUtilityClassModel(utility)
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
		getUtilityClassModel(utility) {
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

.utilities-table {
	width: 100%;
	border-collapse: collapse;
	background-color: primary-color(900);

	th {
		padding: $spacing-xxxs;
		vertical-align: middle;
		color: primary-color(100);
	}

	.utility-class__header {
		position: sticky;
		padding-left: $spacing-xs;
		left: 0;
		width: 0.1%;
		text-align: right;
		white-space: nowrap;
		background-color: primary-color(900, 0.75);
		z-index: 1;
	}

	.utility-level__header {
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
