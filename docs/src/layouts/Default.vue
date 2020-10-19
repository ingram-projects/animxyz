<template>
	<div class="page__wrap" :class="{ 'xyz-xray': xRayToggled }">
		<button class="xray-toggle" :class="{ active: xRayToggled }" @click="toggleXRay(!xRayToggled)">
			<cube class="xray-cube" :style="{ transform: xRayCubeTransform }"></cube>
			<span class="screen-reader-only">Turn X-Ray {{ xRayToggled ? 'Off' : 'On' }}</span>
		</button>

		<xyz-transition xyz="duration-15 ease-in-out" duration="auto">
			<div class="xray-overlay__wrap xyz-none" v-if="xRayToggled">
				<div class="xray-overlay xyz-nested"></div>
				<div class="xray-overlay xyz-nested" xyz="inherit delay-5"></div>
			</div>
		</xyz-transition>

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
				return titleChunk ? `${titleChunk} | ${this.$static.metadata.siteName}` : this.$static.metadata.siteName
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.xray-toggle {
	position: fixed;
	bottom: $sp-xl;
	right: $sp-xl;
	z-index: 3;
	perspective: 10rem;

	@include media('<tablet') {
		right: initial;
		left: 2.5rem;
		bottom: 2.5rem;
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

.xray-overlay__wrap {
	position: fixed;
	right: 0;
	bottom: 0;
	z-index: 99999;
	pointer-events: none;
}

.xray-overlay {
	position: absolute;
	left: 50%;
	right: 50%;
	border-radius: 50%;
	transform: translate(-50%, -50%);
	--xyz-translate-x: -50%;
	--xyz-translate-y: -50%;
	--xyz-in-keyframes: xray-scan;
	--xyz-out-keyframes: xray-scan;

	&::after {
		display: none !important;
	}
}
</style>
