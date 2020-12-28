<template>
	<div class="utilities__wrap" body-scroll-lock-ignore>
		<table class="utilities-table">
			<thead>
				<tr>
					<th></th>
					<th class="level__header" v-for="utilityLevel in utilityLevels" :key="utilityLevel">
						{{ utilityLevel }}
					</th>
				</tr>
			</thead>
			<XyzTransitionGroup
				tag="tbody"
				class="utilities-table__body"
				appear
				duration="auto"
				xyz="fade down-3"
				style="--xyz-stagger: 0.05s"
			>
				<tr class="utility xyz-none" v-for="utility in computedUtilities" :key="utility.name">
					<th class="utility__header xyz-nested" scope="row">
						{{ utility.name }}
					</th>
					<td class="utility-level xyz-nested" v-for="utilityLevel in utility.levels" :key="utilityLevel.id">
						<div class="utility-level__content" v-if="utilityLevel.valid">
							<input
								class="toggle-input"
								type="radio"
								:id="utilityLevel.id"
								:value="utilityLevel.string"
								v-model="toggledUtilities[utility.model]"
								@click="onCellClick(utilityLevel, utility.model)"
							/>
							<label class="toggle-label" :for="utilityLevel.id">
								<div class="toggle-indicator"></div>
								<span class="screen-reader-only">{{ utilityLevel.string }}</span>
							</label>
						</div>
					</td>
				</tr>
			</XyzTransitionGroup>
		</table>
	</div>
</template>

<script>
import isEqual from 'lodash/isEqual'
import { getXyzUtility, getXyzUtilityRegex } from '~/utils'

export default {
	name: 'XyzUtilitiesInput',
	props: {
		value: Object,
		utilities: Array,
		multiple: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			toggledUtilities: {},
		}
	},
	computed: {
		utilityObjs() {
			return this.utilities.map(getXyzUtility)
		},
		utilityLevels() {
			const levelsMap = {}
			this.utilityObjs.forEach((utility) => {
				Object.keys(utility.levels).forEach((level) => {
					levelsMap[level] = true
				})
			})
			return ['default', ...Object.keys(levelsMap)]
		},
		computedUtilities() {
			return this.utilityObjs.map((utility) => {
				return {
					name: utility.name,
					model: this.getUtilityModel(utility),
					levels: this.utilityLevels.map((level) => {
						const utilityLevel = getXyzUtility(utility.name, level)
						return {
							...utilityLevel,
							id: `${this._uid}_${utilityLevel.string}`,
						}
					}),
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
					this.toggledUtilities = {}
					Object.keys(this.value).forEach((utilityString) => {
						const utility = getXyzUtilityRegex(utilityString)

						if (utility) {
							const model = this.getUtilityModel(utility)
							this.$set(this.toggledUtilities, model, utilityString)
						}
					})
				}
			},
		},
		toggledUtilities: {
			deep: true,
			handler() {
				const newValue = {}
				Object.values(this.toggledUtilities).forEach((toggledUtility) => {
					newValue[toggledUtility] = true
				})
				this.$emit('input', newValue)
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
			if (this.toggledUtilities[model] === cell.string) {
				this.$delete(this.toggledUtilities, model)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.utilities__wrap {
	font-family: $font-stack-mono;
	overflow-x: auto;
}

.utilities-table {
	border-collapse: collapse;

	th {
		padding: $sp-xxxs;
		vertical-align: middle;
		white-space: nowrap;
		color: primary-color(100);
	}

	td,
	th {
		&:first-child {
			padding-left: $sp-s;
		}
		&:last-child {
			padding-right: $sp-s;
		}
	}
}

.utility {
	transition: background-color 0.2s $ease-in-out;

	&:focus-within {
		background-color: primary-color(800, 0.35);
	}
}

.utility__header {
	position: sticky;
	left: 0;
	width: 0.1%;
	text-align: right;
	background-color: primary-color(900, 0.75);
	z-index: 1;
}

.level__header {
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
	@include screen-reader-only;

	&:focus {
		.toggle-indicator {
			@include size(1.25rem);
			opacity: 0.5;
			border-radius: $br-m;
			transition-duration: 0.2s;
		}
	}

	&:checked + .toggle-label .toggle-indicator {
		@include size(1.25rem);
		opacity: 1;
		background-color: $cyan;
		border-radius: $br-m;
		transform: none;
		transition: all 0.25s $ease-out-back;
	}
}

.toggle-label {
	width: 100%;
	height: 100%;
	display: flex;
	cursor: pointer;

	&:hover {
		.toggle-indicator {
			@include size(1.25rem);
			opacity: 0.5;
			border-radius: $br-m;
			transition-duration: 0.2s;
		}
	}
}

.toggle-indicator {
	@include circle(0.25rem);
	margin: auto;
	opacity: 0.2;
	background-color: primary-color(100);
	transform: rotate(-0.125turn);
	transition: all 0.25s $ease-in-out;
}
</style>
