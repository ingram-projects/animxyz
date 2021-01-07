<template>
	<div class="animxyz-logo">
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
.animxyz-logo {
	--logo-size: 2.25rem;
	@include size(var(--logo-size));
	transform-style: preserve-3d;
	transition: transform 0.3s $ease-out-back;
}

.logo-sides {
	@include size(100%);
	transform: rotateX(55deg) rotateZ(45deg);
	transform-style: preserve-3d;
	transition: transform 0.3s $ease-out-back;
}

.logo-side {
	@include size(100%);
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
