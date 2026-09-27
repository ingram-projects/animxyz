<template>
	<div class="xray__wrap">
		<SpinToggle
			:toggled="xRayToggled"
			on-text="XYZ-ray On"
			off-text="XYZ-ray Off"
		>
			<button
				ref="button"
				class="xray-toggle"
				:class="{ active: xRayToggled }"
				@click="toggleXRay(!xRayToggled)"
				data-visitors-event="x-ray-toggle"
			>
				<Cube
					class="xray-cube"
					:style="{ transform: xRayCubeTransform }"
				></Cube>
				<span class="screen-reader-only"
					>Turn X-Ray {{ xRayToggled ? "Off" : "On" }}</span
				>
			</button>
		</SpinToggle>
		<!--
			The inverting circles live at the top level of <body>: Firefox's
			backdrop-filter breaks inside the toggle's fixed/z-indexed stacking
			context and perspective, so they need an ancestor-free backdrop.
		-->
		<Teleport v-if="mounted" to="body">
			<div
				ref="invert"
				class="xray-invert__wrap"
				:class="{ expanded: xRayToggled, transitioning: invertTransitioning }"
				:style="invertOrigin"
			>
				<div class="xray-invert"></div>
				<div class="xray-invert"></div>
			</div>
		</Teleport>
	</div>
</template>

<script>
import Cube from "~/components/vue/reusable/Cube.vue";
import SpinToggle from "~/components/vue/reusable/SpinToggle.vue";

export default {
	name: "XrayToggle",
	props: {
		target: {
			type: String,
			default: ".page-content__wrap",
		},
	},
	components: {
		Cube,
		SpinToggle,
	},
	data() {
		return {
			xRayToggled: false,
			xRayCubeTransform: null,
			invertOrigin: null,
			invertTransitioning: false,
			invertGeneration: 0,
			mounted: false,
		};
	},
	methods: {
		toggleXRay(toggled) {
			this.measureInvertOrigin();
			this.xRayToggled = toggled;
			this.randomizeXRayCubeTransform();
			this.applyClass();
			this.trackInvertTransition();
		},
		randomizeXRayCubeTransform() {
			this.xRayCubeTransform = `rotateX(${-0.5 + Math.random()}turn) rotateY(${
				-0.5 + Math.random()
			}turn) rotateZ(${-0.5 + Math.random()}turn)`;
		},
		measureInvertOrigin() {
			const rect = this.$refs.button.getBoundingClientRect();
			this.invertOrigin = {
				left: `${rect.left + rect.width / 2}px`,
				top: `${rect.top + rect.height / 2}px`,
			};
		},
		// backdrop-filter is only needed while the circles are moving (at rest
		// they're either tiny or double-inverting the whole page), so keep it on
		// until every running transition settles. Transitions reverse mid-flight
		// when toggled again, so only the latest toggle is allowed to turn it off.
		async trackInvertTransition() {
			const generation = ++this.invertGeneration;
			this.invertTransitioning = true;
			await new Promise((resolve) => requestAnimationFrame(resolve));
			const transitions = this.$refs.invert.getAnimations({ subtree: true });
			await Promise.allSettled(transitions.map((t) => t.finished));
			if (generation === this.invertGeneration) {
				this.invertTransitioning = false;
			}
		},
		applyClass() {
			if (typeof document === "undefined") return;
			const targetEl = document.querySelector(this.target);
			if (!targetEl) return;
			targetEl.classList.toggle("xyz-xray", this.xRayToggled);
		},
	},
	mounted() {
		this.randomizeXRayCubeTransform();
		this.mounted = true;
	},
};
</script>

<style lang="scss" scoped>
.xray__wrap {
	position: fixed;
	bottom: $sp-m;
	right: $sp-m;
	z-index: 4;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (width < $bp-tablet) {
		right: initial;
		left: $sp-m;
		bottom: $sp-m;
		z-index: 3;
	}
}

.xray-toggle {
	perspective: 10rem;
	padding: 1rem;
	margin: -1rem;
	transition: transform 0.3s $ease-out-back;

	&:hover,
	&:focus {
		transform: scale(1.125);
	}
}

.xray-cube {
	--cube-size: 2rem;
	transition: transform 1s $ease-in-out-back;

	:deep(.cube-side) {
		box-shadow: inset 0 0 0 1.5px primary-color(50),
			inset 0 0 0 1rem primary-color(400);
		transition: 1s $ease-in-out;
		transition-property: background-color, box-shadow;

		.xray-toggle.active & {
			background-color: fade($cyan, 0.9);
			box-shadow: inset 0 0 0 2px $cyan;
		}
	}
}

.xray-invert__wrap {
	position: fixed;
	z-index: 4;
	pointer-events: none;

	@media (width < $bp-tablet) {
		z-index: 3;
	}
}

// Transitions rather than keyframes so toggling mid-way reverses from the
// current size. Kept 2D and opacity-free: Firefox drops backdrop-filter on
// elements with 3D transforms or opacity animations.
.xray-invert {
	@include size(1vmax);
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0.001);
	transition: transform 1.25s ease;

	// Transitions take their timing from the state being entered. Expanding, the
	// second circle lags by a delay; collapsing, it's just faster, so both
	// reverse at once when interrupted but still separate into a ring.
	& + & {
		transition-duration: 0.85s;
	}

	.expanded & + & {
		transition-duration: 1.25s;
		transition-delay: 0.4s;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	.expanded & {
		transform: translate(-50%, -50%) scale(283);
	}

	.transitioning & {
		backdrop-filter: invert(1);
	}
}
</style>
