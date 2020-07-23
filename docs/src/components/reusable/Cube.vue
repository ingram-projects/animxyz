<template>
	<div class="cube">
		<div class="cube__face"></div>
		<div class="cube__face"></div>
		<div class="cube__face"></div>
		<div class="cube__face"></div>
		<div class="cube__face"></div>
		<div class="cube__face"></div>
	</div>
</template>

<script>
export default {
	name: 'Cube',
}
</script>

<style lang="scss" scoped>
//Cube code from Ana Tudor based on this article: https://css-tricks.com/simplifying-css-cubes-custom-properties/
.cube,
.cube__face {
	position: absolute;
}

.cube {
	transform-style: preserve-3d;
}

.cube__face {
	margin: calc(-0.5 * var(--cube-size));
	width: var(--cube-size);
	height: var(--cube-size);
}

.cube__face:nth-child(1) {
	transform: rotateY(0deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube__face:nth-child(2) {
	transform: rotateY(90deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube__face:nth-child(3) {
	transform: rotateY(180deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube__face:nth-child(4) {
	transform: rotateY(270deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube__face:nth-child(5) {
	transform: rotateX(90deg) translateZ(calc(0.5 * var(--cube-size)));
}
.cube__face:nth-child(6) {
	transform: rotateX(-90deg) translateZ(calc(0.5 * var(--cube-size)));
}
</style>
