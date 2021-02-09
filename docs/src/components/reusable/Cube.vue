<template>
	<div class="cube">
		<div class="cube-sides">
			<div class="cube-side"></div>
			<div class="cube-side"></div>
			<div class="cube-side"></div>
			<div class="cube-side"></div>
			<div class="cube-side"></div>
			<div class="cube-side"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Cube',
}
</script>

<style lang="scss" scoped>
//Cube code from Ana Tudor based on this article: https://css-tricks.com/simplifying-css-cubes-custom-properties/
.cube {
	--cube-size: 2.25rem;
	@include size(var(--cube-size));
	transform-style: preserve-3d;
	transition: transform 0.3s $ease-out-back;
}

.cube-sides {
	@include size(100%);
	transform-style: preserve-3d;
	transform: translate(50%, 50%);
	transition: transform 0.3s $ease-out-back;
}

.cube-side {
	@include size(100%);
	position: absolute;
	margin: calc(-0.5 * var(--cube-size));
}

.cube-side:nth-child(1) {
	transform: rotateY(0deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube-side:nth-child(2) {
	transform: rotateY(90deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube-side:nth-child(3) {
	transform: rotateY(180deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube-side:nth-child(4) {
	transform: rotateY(270deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube-side:nth-child(5) {
	transform: rotateX(90deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube-side:nth-child(6) {
	transform: rotateX(-90deg) translateZ(calc(0.5 * var(--cube-size)));
}
</style>
