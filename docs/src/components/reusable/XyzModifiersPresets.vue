<template>
	<div class="modifiers-presets">
		<xyz-transition-group
			tag="ul"
			class="presets-list"
			appear
			duration="auto"
			xyz="fade small"
			:style="{ '--xyz-stagger': '0.15s' }"
		>
			<li class="preset-item__wrap" v-for="preset in computedPresets" :key="preset.title">
				<button
					class="preset-item example-wrap"
					@click="onPresetClick(preset)"
					@mouseenter="onPresetMouseEnter(preset)"
					@mouseleave="onPresetMouseLeave"
				>
					<div class="preset-title">{{ preset.title }}</div>
					<div
						class="square xyz-nested"
						:class="{ [mode]: hoveredPreset === preset.title }"
						v-xyz="preset.utilities"
						:style="preset.style"
						@animationend="onPresetAnimationEnd"
					></div>
				</button>
			</li>
		</xyz-transition-group>
	</div>
</template>

<script>
export default {
	name: 'XyzModifiersPresets',
	props: {
		presets: Array,
	},
	data() {
		return {
			hoveredPreset: null,
			toggled: false,
			toggleTimeout: null,
		}
	},
	computed: {
		mode() {
			return this.toggled ? 'xyz-in' : 'xyz-out'
		},
		computedPresets() {
			return this.presets.map((preset) => {
				const style = {}

				if (preset.variables) {
					preset.variables.forEach((variable) => {
						const [name, value] = variable.split(':')
						style[`--xyz-${name}`] = value.trim()
					})
				}

				return {
					...preset,
					style,
				}
			})
		},
	},
	methods: {
		clearToggleTimeout() {
			clearTimeout(this.toggleTimeout)
			this.toggleTimeout = null
		},
		onPresetClick(preset) {
			this.$emit('select-preset', preset)
		},
		onPresetMouseEnter(preset) {
			this.hoveredPreset = preset.title
		},
		onPresetMouseLeave() {
			this.hoveredPreset = null
			this.toggled = false
			this.clearToggleTimeout()
		},
		onPresetAnimationEnd() {
			this.clearToggleTimeout()
			this.toggleTimeout = setTimeout(() => {
				this.toggled = !this.toggled
			}, 500)
		},
	},
	beforeDestroy() {
		this.clearToggleTimeout()
	},
}
</script>

<style lang="scss" scoped>
.modifiers-presets {
	background-color: primary-color(900);
}

.presets-list {
	padding: $sp-m;
	padding-right: 0;
	overflow-x: auto;
	display: flex;
	list-style: none;
}

.preset-item__wrap {
	padding-right: $sp-m;
}

.preset-item {
	position: relative;
	display: flex;
	flex-shrink: 0;
	height: 10rem;
	width: 14rem;
	box-shadow: inset 0 0 0 2px primary-color(800);
	border-radius: $br-xl;
	transition: box-shadow 0.2s $ease-in-out;

	.square {
		@include size(4rem);
		margin: auto;
		background-color: primary-color(200, 0.65);
		transition: background-color 0.2s $ease-in-out;
	}

	&:hover,
	&:focus,
	&:active {
		box-shadow: inset 0 0 0 4px primary-color(700);

		.preset-title {
			color: primary-color(100);
		}

		.square {
			background-color: $cyan;
		}
	}
}

.preset-title {
	position: absolute;
	font-family: $font-stack-mono;
	top: $sp-xs;
	left: $sp-xs;
	color: primary-color(300);
	transition: color 0.2s $ease-in-out;
}
</style>
