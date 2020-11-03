<template>
	<xyz-transition-group
		tag="div"
		class="tab-bar"
		appear
		duration="auto"
		xyz="fade flip-down origin-bottom"
		style="--xyz-stagger: 0.075s"
	>
		<button
			type="button"
			class="tab-bar__tab"
			:class="{ active: tab === value }"
			v-for="tab in tabs"
			:ref="tab === value && 'activeTab'"
			:key="tab.name"
			@click="setTab(tab)"
		>
			<component :is="tab.icon" class="tab-icon"></component>
			<span class="tab-text">{{ tab.name }}</span>
		</button>
	</xyz-transition-group>
</template>

<script>
import IconPresets from '~/assets/icons/IconPresets.svg'

export default {
	name: 'TabBar',
	props: {
		value: Object,
		tabs: Array,
	},
	components: {
		IconPresets,
	},
	methods: {
		setTab(tab) {
			this.$emit('input', tab)
		},
	},
}
</script>

<style lang="scss" scoped>
.tab-bar {
	background-color: primary-color(900);
	font-family: $font-stack-mono;
	display: flex;
	flex-shrink: 0;
	overflow-x: auto;

	@include media('<laptop') {
		position: sticky;
		top: 0;
		z-index: 2;
	}
}

.tab-bar__tab {
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	height: 3rem;
	padding: 0 $sp-xxs;
	color: primary-color(50);
	transition: 0.2s $ease-in-out;
	transition-property: background-color, color;

	@include media('<laptop') {
		height: 2.5rem;
	}

	&:first-child {
		border-top-left-radius: $br-l;
	}

	&:last-child {
		border-top-right-radius: $br-l;
	}

	&.active,
	&:hover,
	&:focus {
		font-weight: bold;

		.tab-text {
			opacity: 1;
		}

		.tab-icon {
			--icon-color: #{$cyan};
		}
	}

	&:hover,
	&:focus {
		background-color: primary-color(800, 0.5);
	}

	&.active {
		color: $cyan;

		&:hover,
		&:focus {
			background-color: transparent;
		}

		.tab-text {
			&::after {
				background-color: $cyan;
				transform: scaleX(1);
			}
		}
	}

	&.has-content {
		::before {
			@include size(10px);
			background-color: primary-color(200);
			content: '';
			position: absolute;
			top: -13px;
			left: 50%;
			transform: translateX(-50%) rotate(45deg);
		}
	}
}

.tab-icon {
	--icon-color: currentColor;
	@include size(1rem);
	margin-right: $sp-xxs;
	flex-shrink: 0;
}

.tab-text {
	display: flex;
	align-items: center;
	height: 2rem;
	position: relative;
	opacity: 0.85;
	transition: opacity 0.2s $ease-in-out;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		height: 4px;
		transform: scaleX(0);
		transition: background-color 0.2s $ease-in-out, transform 0.5s $ease-out-back;
	}
}
</style>
