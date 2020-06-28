<template>
	<div class="animxyz-logo logo-scene">
		<div class="cube-wrap">
			<div class="cube-side side--left"><div class="side-fill"></div></div>
			<div class="cube-side side--right"><div class="side-fill"></div></div>
			<div class="cube-side side--bottom"><div class="side-fill"></div></div>
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
	@include size(100%);
	display: flex;
	perspective: 1000px;
}

.cube-wrap {
	margin: auto;
	position: relative;
	top: 2px;
	transform: rotateX(60deg) rotateZ(45deg);
	transform-style: preserve-3d;
	transition: transform 0.3s $ease-out-back;
}

.cube-side {
	@include size(2rem);
	display: flex;
	position: absolute;
	padding: 3px;
	transition: transform 0.3s $ease-in-out;
}

.side-fill {
	@include size(100%);
	border-bottom-right-radius: $br-xl;

	.side--right & {
		background-image: linear-gradient(to bottom, rgba(var(--red-rgb), 1), rgba(var(--red-rgb), 0.15));
	}

	.side--left & {
		background-image: linear-gradient(to bottom, rgba(var(--yellow-rgb), 1), rgba(var(--yellow-rgb), 0.15));
	}

	.side--bottom & {
		background-image: linear-gradient(to right, rgba(var(--green-rgb), 1), rgba(var(--green-rgb), 0.15));
	}
}

.side--right {
	transform-origin: top;
	transform: rotateX(90deg) translateZ(var(--logo-side-z, 0));
}

.side--left {
	transform-origin: left;
	transform: rotateY(-90deg) translateZ(var(--logo-side-z, 0));
}

.side--bottom {
	transform: translateZ(calc(var(--logo-side-z, 0) * -1));
}
</style>
