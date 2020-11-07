<template>
	<div class="page__wrap" :class="{ 'xyz-xray': xRayToggled }">
		<div class="xray__wrap">
			<button class="xray-toggle" :class="{ active: xRayToggled }" @click="toggleXRay(!xRayToggled)">
				<cube class="xray-cube" :style="{ transform: xRayCubeTransform }"></cube>
				<span class="screen-reader-only">Turn X-Ray {{ xRayToggled ? 'Off' : 'On' }}</span>
			</button>

			<div class="xray-overlay__wrap">
				<div class="xray-overlay"></div>
				<div class="xray-overlay"></div>
			</div>
		</div>

		<slot></slot>
	</div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Cube from '~/components/reusable/Cube'
import { openGraphMeta } from '~/utils'

export default {
	components: {
		Cube,
	},
	data() {
		return {
			xRayToggled: false,
			xRayCubeTransform: null,
		}
	},
	methods: {
		toggleXRay(toggled) {
			this.xRayToggled = toggled
			this.randomizeXRayCubeTransform()
		},
		randomizeXRayCubeTransform() {
			this.xRayCubeTransform = `rotateX(${-0.5 + Math.random()}turn) rotateY(${-0.5 + Math.random()}turn) rotateZ(${
				-0.5 + Math.random()
			}turn)`
		},
	},
	mounted() {
		this.randomizeXRayCubeTransform()
	},
	metaInfo() {
		return {
			titleTemplate: (titleChunk) => {
				return titleChunk
			},
			...openGraphMeta({
				title: 'AnimXYZ',
				description: 'The first composable CSS animation toolkit',
				image: 'https://animxyz.com/animxyz-link-preview.png',
				url: 'https://animxyz.com',
			}),
		}
	},
}
</script>

<style lang="scss" scoped>
.xray__wrap {
	position: fixed;
	bottom: $sp-xl;
	right: $sp-xl;
	z-index: 4;

	@include media('<tablet') {
		right: initial;
		left: 2.25rem;
		bottom: 2.25rem;
		z-index: 3;
	}
}

.xray-toggle {
	perspective: 10rem;
	transition: transform 0.3s $ease-out-back;

	&:hover,
	&:focus {
		transform: scale(1.125);
	}
}

.xray-cube {
	--cube-size: 2rem;
	transition: transform 1s $ease-in-out-back;

	::v-deep {
		.cube__face {
			box-shadow: inset 0 0 0 1.5px primary-color(50), inset 0 0 0 1rem primary-color(400);
			transition: 1s $ease-in-out;
			transition-property: background-color, box-shadow;

			.xray-toggle.active & {
				background-color: transparentize($cyan, 0.9);
				box-shadow: inset 0 0 0 2px $cyan;
			}
		}
	}
}

.xray-overlay,
.xray-overlay__wrap {
	&::after {
		display: none !important; //Hides xray-overlay copy showing xyz values
	}
}

.xray-overlay__wrap {
	pointer-events: none;
}

.xray-overlay {
	@include size(1vmax);
	position: absolute;
	border-radius: 50%;
	backdrop-filter: invert(1);
	transform: translate(-50%, -50%);
	transition: transform 0.5s ease-in-out, visibility 0.5s;
	visibility: hidden;

	.xyz-xray & {
		transform: translate(-50%, -50%) scale(283);
		visibility: visible;
	}

	&:last-child {
		transition-delay: 0.4s;
	}
}
</style>
