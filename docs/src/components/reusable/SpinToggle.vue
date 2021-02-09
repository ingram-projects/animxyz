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
	--toggle-center-offset: 3rem;
	position: relative;
}

.toggle-tooltip__wrap {
	position: absolute;
	right: 50%;
	top: 50%;
	margin: 0 var(--toggle-center-offset);
	transform: translateY(-50%);
	opacity: 0;
	transition: opacity 0.3s ease-in;
	pointer-events: none;

	.toggle-contents:hover + & {
		opacity: 1;
	}

	@include media('<tablet') {
		right: initial;
		left: 50%;
	}
}

.toggle-tooltip {
	line-height: 2rem;
	width: 6.5rem;
	color: $cyan;
	font-size: $fs-s;
	font-weight: 600;
	text-align: center;
	white-space: nowrap;
	background-color: primary-color(700);
	border-radius: 1rem;
	--xyz-origin: calc(100% + var(--toggle-center-offset)) center;
	--xyz-in-rotate-z: 0.5turn;
	--xyz-out-rotate-z: -0.5turn;

	@include media('<tablet') {
		--xyz-origin: calc(var(--toggle-center-offset) * -1) center;
		--xyz-in-rotate-z: -0.5turn;
		--xyz-out-rotate-z: 0.5turn;
	}
}
</style>
