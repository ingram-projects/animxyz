<template>
  <div class="xray__wrap">
    <SpinToggle :toggled="xRayToggled" on-text="XYZ-ray On" off-text="XYZ-ray Off">
      <button class="xray-toggle" :class="{ active: xRayToggled }" @click="toggleXRay(!xRayToggled)">
        <Cube class="xray-cube" :style="{ transform: xRayCubeTransform }"></Cube>
        <span class="screen-reader-only">Turn X-Ray {{ xRayToggled ? 'Off' : 'On' }}</span>
        <XyzTransition xyz duration="auto">
          <div class="xray-invert__wrap xyz-none" v-if="xRayToggled">
            <div class="xray-invert xyz-nested"></div>
            <div class="xray-invert xyz-nested" xyz="inherit delay-4"></div>
          </div>
        </XyzTransition>
      </button>
    </SpinToggle>
  </div>
</template>

<script>
import Cube from '~/components/vue/reusable/Cube.vue'
import SpinToggle from '~/components/vue/reusable/SpinToggle.vue'

export default {
  name: 'XrayToggle',
  props: {
    target: {
      type: String,
      default: '.page-content__wrap',
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
    }
  },
  methods: {
    toggleXRay(toggled) {
      this.xRayToggled = toggled
      this.randomizeXRayCubeTransform()
      this.applyClass()
    },
    randomizeXRayCubeTransform() {
      this.xRayCubeTransform = `rotateX(${-0.5 + Math.random()}turn) rotateY(${-0.5 + Math.random()}turn) rotateZ(${
        -0.5 + Math.random()
      }turn)`
    },
    applyClass() {
      if (typeof document === 'undefined') return
      const targetEl = document.querySelector(this.target)
      if (!targetEl) return
      targetEl.classList.toggle('xyz-xray', this.xRayToggled)
    },
  },
  mounted() {
    this.randomizeXRayCubeTransform()
  },
}
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

  @include media('<tablet') {
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
    box-shadow: inset 0 0 0 1.5px primary-color(50), inset 0 0 0 1rem primary-color(400);
    transition: 1s $ease-in-out;
    transition-property: background-color, box-shadow;

    .xray-toggle.active & {
      background-color: transparentize($cyan, 0.9);
      box-shadow: inset 0 0 0 2px $cyan;
    }
  }
}

.xray-invert__wrap {
  pointer-events: none;
  --xyz-translate-x: -50%;
  --xyz-translate-y: -50%;
  --xyz-scale-x: 0.001;
  --xyz-scale-y: 0.001;
  --xyz-duration: 1.25s;
}

.xray-invert {
  @include size(1vmax);
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(283);

  .xyz-in &,
  .xyz-out & {
    backdrop-filter: invert(1);
  }
}
</style>
