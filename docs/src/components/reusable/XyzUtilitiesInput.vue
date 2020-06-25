<template>
	<div class="utilities-input">
		<table class="utilities-table">
			<tr>
				<th></th>
				<th class="level__header" v-for="level in levels" :key="level">
					{{ level }}
				</th>
			</tr>
			<xyz-transition-group tag="tbody" :duration="1500" appear xyz>
				<tr class="utility" v-for="utility in utilities" :key="utility.name">
					<th class="utility__header">
						{{ utility.name }}
					</th>
					<td class="utility-level xyz-nested" xyz="fade down" v-for="utilityLevel in utility.levels" :key="utilityLevel.id">
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
			</xyz-transition-group>
		</table>
	</div>
</template>

<script>
import { xyzUtilities, getXyzUtility, getXyzUtilityRegex } from '~/utils'

export default {
	name: 'XyzUtilitiesInput',
	props: ['value', 'types', 'multiple'],
	data() {
		return {
			toggledUtilities: {},
		}
	},
	computed: {
		typeUtilities() {
			const typeUtilities = []
			this.types.forEach((type) => {
				typeUtilities.push(
					...xyzUtilities.filter((utility) => {
						return utility.type === type
					})
				)
			})
			return typeUtilities
		},
		levels() {
			const levelsMap = {}
			this.typeUtilities.forEach((utility) => {
				Object.keys(utility.levels).forEach((level) => {
					levelsMap[level] = true
				})
			})
			return ['default', ...Object.keys(levelsMap)]
		},
		utilities() {
			return this.typeUtilities.map((utility) => {
				return {
					name: utility.name,
					model: this.getUtilityModel(utility),
					levels: this.levels.map((level) => {
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
			immediate: true,
			handler() {
				this.toggledUtilities = {}
				const toggledUtilities = this.value.split(' ')
				toggledUtilities.forEach((toggledUtility) => {
					const utility = getXyzUtilityRegex(toggledUtility)

					if (utility) {
						const model = this.getUtilityModel(utility)
						this.$set(this.toggledUtilities, model, toggledUtility)
					}
				})
			},
		},
		toggledUtilities: {
			deep: true,
			handler() {
				const toggled = Object.values(this.toggledUtilities).join(' ')
				this.$emit('input', toggled)
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
			if (this.multiple && this.toggledUtilities[model] === cell.string) {
				this.$delete(this.toggledUtilities, model)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.utilities-input {
	padding: $sp-s 0;
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

.utility, .utility-level {
	--xyz-stagger: .075s;
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
