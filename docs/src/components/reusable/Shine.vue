<template>
  <div
    class="shine"
    :style="{ '--mouseX': `${mouseX}px`, '--mouseY': `${mouseY}px` }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Shine",
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
    };
  },
  methods: {
    onMouseMove(event) {
      const rect = this.$el.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onMouseMove);
  },
};
</script>

<style lang="scss" scoped>
.shine {
  mask-image: radial-gradient(
		100% 100% at var(--mouseX, 0) var(--mouseY, 0),
		rgba(0, 0, 0, var(--shine-strength, 1)) 0%,
		rgba(0, 0, 0, 0) var(--shine-size, 100%)),
    radial-gradient(
		circle at var(--mouseX, 0) var(--mouseY, 0),
		rgba(0, 0, 0, var(--shine-strength, 1)) calc(-200% * var(--shine-diffuse, 0)),
		rgba(0, 0, 0, 0) calc(200% * var(--shine-diffuse, 0))
  );
}
</style>
