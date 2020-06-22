<template>
	<div class="logo-scene">
		<div class="cube-wrap">
			<div class="cube-side side--left"></div>
			<div class="cube-side side--right"></div>
			<div class="cube-side side--bottom"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AnimXyzLogo',
}
</script>

<style lang="scss" scoped>
.logo-scene {
	display: flex;
	perspective: 1000px;
}

.cube-wrap {
	transform: rotateX(60deg) rotateZ(45deg);
	transform-style: preserve-3d;
}

.cube-side {
	position: absolute;
	@include size(2rem);
	border: 3px solid transparent;
}

.side--right {
	background-image: linear-gradient(to bottom, $red, transparent);
	transform-origin: top;
	transform: rotateX(90deg);
}

.side--left {
	background-image: linear-gradient(to bottom, $green, transparent);
	transform-origin: left;
	transform: rotateY(-90deg);
}

.side--bottom {
	background-image: linear-gradient(to right, $yellow, transparent);
}
</style>
