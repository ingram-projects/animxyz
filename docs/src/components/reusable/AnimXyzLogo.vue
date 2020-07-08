<template>
	<div class="animxyz-logo logo-scene">
		<div class="cube-wrap">
			<div class="cube-half cube-half--back">
				<div class="cube-side side--yellow"><div class="side-fill"></div></div>
				<div class="cube-side side--red"><div class="side-fill"></div></div>
				<div class="cube-side side--green"><div class="side-fill"></div></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AnimXyzLogo',
}
</script>

<style lang="scss" scoped>
$logo-size: 1.75rem;

.logo-scene {
	@include size(100%);
	display: flex;
	perspective: 1000px;
}

.cube-wrap {
	margin: auto;
	position: relative;
	transition: transform 0.3s $ease-out-back;
	transform-style: preserve-3d;
}

.cube-half {
	transform-style: preserve-3d;
	transform: rotateX(55deg) rotateZ(45deg);
	transition: transform 0.3s $ease-out-back;
}

.cube-side {
	@include size($logo-size);
	display: flex;
	position: absolute;
	transition: transform 0.3s $ease-in-out;
}

.side-fill {
	@include size(100%);
	border-bottom-right-radius: $br-xl;
	background-image: linear-gradient(
		var(--logo-gradient-direction, to bottom),
		rgba(var(--logo-side-color), 1),
		rgba(var(--logo-side-color), 0.15)
	);
}

.side--red {
	transform-origin: top;
	--logo-side-color: var(--red-rgb);
}

.side--yellow {
	transform-origin: left;
	--logo-side-color: var(--yellow-rgb);
}

.side--green {
	--logo-side-color: var(--green-rgb);
	--logo-gradient-direction: to right;
}

.cube-half--back {
	.side--red {
		transform: rotateX(90deg) translateZ(var(--logo-side-z, 3px));
	}

	.side--yellow {
		transform: rotateY(-90deg) translateZ(var(--logo-side-z, 3px));
	}

	.side--green {
		transform: translateZ(calc(var(--logo-side-z, 3px) * -1));
	}
}
</style>
