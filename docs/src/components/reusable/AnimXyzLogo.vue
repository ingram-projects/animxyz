<template>
	<div class="animxyz-logo logo-scene">
		<div class="logo-sides">
			<div class="logo-side side--yellow"><div class="side-fill"></div></div>
			<div class="logo-side side--red"><div class="side-fill"></div></div>
			<div class="logo-side side--green"><div class="side-fill"></div></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AnimXyzLogo',
}
</script>

<style lang="scss" scoped>
$logo-size: 2.25rem;

.logo-scene {
	@include size(100%);
	display: flex;
	perspective: 1000px;
	transform: translate(-$logo-size / 2, -$logo-size / 2) scale(var(--logo-scale, 1));
	transition: transform 0.3s $ease-out-back;
	transform-style: preserve-3d;
	transform-origin: $logo-size / 2 $logo-size / 2;
}

.logo-sides {
	transform-style: preserve-3d;
	transform: rotateX(55deg) rotateZ(45deg);
	transition: transform 0.3s $ease-out-back;
	transform-origin: $logo-size / 2 $logo-size / 2;
}

.logo-side {
	@include size($logo-size);
	display: flex;
	position: absolute;
	transition: transform 0.3s $ease-in-out;
	transform-origin: center;
}

.side-fill {
	@include size(100%);
	border-radius: $br-l;
	background-image: linear-gradient(
		var(--logo-gradient-direction, to top),
		rgba(var(--logo-side-color), 1),
		rgba(var(--logo-side-color), 0.15)
	);
}

.side--red {
	--logo-side-color: var(--red-rgb);
	transform: rotateY(90deg);
}

.side--yellow {
	--logo-side-color: var(--yellow-rgb);
	transform: rotateX(90deg);
}

.side--green {
	--logo-gradient-direction: to left;
	--logo-side-color: var(--green-rgb);
}
</style>
