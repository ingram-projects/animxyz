<template>
	<div class="tab-bar">
		<button
			type="button"
			class="tab-bar__tab"
			:class="{ active: tab === value }"
			v-for="tab in tabs"
			:ref="tab === value && 'activeTab'"
			:key="tab.name"
			@click="setTab(tab)"
		>
			<span class="tab-text">{{ tab.title }}</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'TabBar',
	props: ['value', 'tabs'],
	methods: {
		setTab(tab) {
			this.$emit('input', tab)
		},
	},
}
</script>

<style lang="scss" scoped>
.tab-bar {
	font-family: $font-stack-mono;
	font-weight: bold;
	display: flex;
}

.tab-bar__tab {
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	height: 3rem;
	padding: 0 $spacing-xxs;
	color: primary-color(50);
	transition: background 0.2s $ease-in-out, color 0.2s $ease-in-out;

	&:hover,
	&:focus {
		background-color: primary-color(100, 0.15);

		.tab-text {
			opacity: 1;
		}
	}

	&.active {
		color: $cyan;

		&:hover,
		&:focus {
			background-color: transparent;
		}

		.tab-text {
			opacity: 1;

			&::after {
				background-color: $cyan;
				transform: scale(1);
			}
		}
	}
}

.tab-text {
	display: flex;
	align-items: center;
	height: 2rem;
	position: relative;
	opacity: 0.75;
	transition: opacity 0.2s $ease-in-out;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		height: 2px;
		transform: scale(0);
		transition: background 0.2s $ease-in-out, transform 0.3s $ease-out-back;
	}
}
</style>
