<template>
	<div class="logo-scene">
		<div class="logo-wrap">
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
	perspective: 10000px;
	display: flex;
}

.logo-wrap {
	margin: auto;
	transform: rotateX(60deg) rotateZ(45deg);
	transform-style: preserve-3d;
}

.cube-side {
	position: absolute;
	@include size(2.25rem);
	border: 3px solid transparent;
}

.side--right {
	--xyz-rotate-x: 90deg;
	background-image: linear-gradient(to bottom, $red, transparent);
	transform-origin: top;
	transform: rotateX(90deg);
}

.side--left {
	--xyz-rotate-y: -90deg;
	background-image: linear-gradient(to bottom, $green, transparent);
	transform-origin: left;
	transform: rotateY(-90deg);
}

.side--bottom {
	background-image: linear-gradient(to right, $yellow, transparent);
}
</style>
