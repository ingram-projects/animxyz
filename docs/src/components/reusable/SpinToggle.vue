<template>
	<div class="spin-toggle">
		<div class="toggle-contents">
			<slot></slot>
		</div>

		<div class="toggle-tooltip__wrap">
			<XyzTransition xyz mode="out-in">
				<div class="toggle-tooltip" key="on" v-if="toggled">{{ onText }}</div>
				<div class="toggle-tooltip" key="off" v-if="!toggled">{{ offText }}</div>
			</XyzTransition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SpinToggle',
	props: {
		toggled: Boolean,
		onText: String,
		offText: String,
	},
}
</script>

<style lang="scss" scoped>
.spin-toggle {
	position: relative;
}

.toggle-tooltip__wrap {
	position: absolute;
	right: 100%;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 $sp-m;
	opacity: 0;
	transition: opacity 0.3s ease-in;

	.toggle-contents:hover + & {
		opacity: 1;
	}

	@include media('<tablet') {
		right: initial;
		left: 100%;
	}
}

.toggle-tooltip {
	--xyz-origin: 9.5rem center;
	--xyz-in-rotate-z: 0.5turn;
	--xyz-out-rotate-z: -0.5turn;
	line-height: 2rem;
	width: 6.5rem;
	color: $cyan;
	font-size: $fs-s;
	font-weight: 600;
	text-align: center;
	white-space: nowrap;
	background-color: primary-color(900, 0.85);
	backdrop-filter: invert(1);
	border-radius: 1rem;
	pointer-events: none;

	@include media('<tablet') {
		--xyz-origin: -3rem center;
		--xyz-in-rotate-z: -0.5turn;
		--xyz-out-rotate-z: 0.5turn;
	}
}
</style>
