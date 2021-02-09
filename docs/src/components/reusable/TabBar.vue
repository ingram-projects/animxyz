<template>
	<XyzTransitionGroup
		class="tab-bar"
		body-scroll-lock-ignore
		appear
		duration="auto"
		xyz="fade flip-down origin-bottom"
		style="--xyz-stagger: 0.075s"
	>
		<button
			type="button"
			class="tab-bar__tab"
			:class="{ active: tab === value, 'has-content': tab.hasContent }"
			v-for="tab in tabs"
			:ref="tab === value && 'activeTab'"
			:key="tab.name"
			@click="setTab(tab)"
		>
			<component :is="tab.icon" class="tab-icon"></component>
			<span class="tab-text">{{ tab.name }}</span>
		</button>
	</XyzTransitionGroup>
</template>

<script>
export default {
	name: 'TabBar',
	props: {
		value: Object,
		tabs: Array,
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
	position: sticky;
	top: 0;
	z-index: 2;
	background-color: primary-color(900);
	font-family: $font-stack-mono;
	display: flex;
	flex-shrink: 0;
	overflow-x: auto;
}

.tab-bar__tab {
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	min-height: 3rem;
	padding: 0 $sp-xxs;
	color: primary-color(50);
	transition: 0.2s $ease-in-out;
	transition-property: background-color, color;

	@include media('<laptop') {
		min-height: 2.5rem;
	}

	&.active,
	&:hover,
	&:focus {
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

	&.has-content {
		.tab-text {
			&::after {
				background-color: primary-color(500);
			}
		}
	}

	&.active {
		color: $cyan;

		.tab-text {
			&::after {
				transition: background-color 0.2s $ease-in-out, width 0.4s $ease-out-back;
				background-color: $cyan;
				width: 100%;
			}
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
	white-space: nowrap;
	transition: opacity 0.2s $ease-in-out;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		@include size(4px);
		transform: translateX(-50%);
		transition: background-color 0.2s $ease-in-out, width 0.4s $ease-in-out;
	}
}
</style>
