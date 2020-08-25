<template>
	<xyz-transition-group tag="div" class="tab-bar" duration="auto">
		<button
			type="button"
			class="tab-bar__tab xyz-nested"
			:class="{ active: tab === value }"
			v-for="tab in tabs"
			:ref="tab === value && 'activeTab'"
			:key="tab.name"
			@click="setTab(tab)"
		>
			<span class="tab-text">{{ tab.name }}</span>
		</button>
	</xyz-transition-group>
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
	transition: background-color 0.2s $ease-in-out, color 0.2s $ease-in-out;

	@include media('<laptop') {
		height: 2.5rem;
	}

	&:first-child {
		border-top-left-radius: $br-l;
	}

	&:last-child {
		border-top-right-radius: $br-l;
	}

	&:hover,
	&:focus {
		font-weight: bold;
		background-color: primary-color(800, 0.5);

		.tab-text {
			opacity: 1;
		}
	}

	&.active {
		color: $cyan;
		font-weight: bold;

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
	opacity: 0.85;
	transition: opacity 0.2s $ease-in-out;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		height: 3px;
		transform: scale(0);
		transition: background-color 0.2s $ease-in-out, transform 0.3s $ease-out-back;
	}
}
</style>
