<template>
  <div class="example-wrap flex-col">
    <XyzTransition appear mode="out-in">
      <div
        class="square"
        data-xyz="fade left-100%"
        v-if="customData.shapes[customData.shapeIndex] === 'square'"
        key="square"
      ></div>
      <div
        class="circle"
        data-xyz="fade up-100%"
        v-else-if="customData.shapes[customData.shapeIndex] === 'circle'"
        key="circle"
      ></div>
      <div
        class="triangle"
        data-xyz="fade right-100%"
        v-else-if="customData.shapes[customData.shapeIndex] === 'triangle'"
        key="triangle"
      ></div>
    </XyzTransition>
    <button class="example-button mt-l" @click="changeShape">Click to switch</button>
  </div>
</template>

<script>
import ExampleMixin from '~/components/vue/examples/exampleMixin'

export default {
  mixins: [ExampleMixin],
  data() {
    return {
      customData: {
        shapeIndex: 0,
        shapes: ['square', 'circle', 'triangle'],
      },
    }
  },
  methods: {
    changeShape() {
      this.customData.shapeIndex++
      if (this.customData.shapeIndex === this.customData.shapes.length) {
        this.customData.shapeIndex = 0
      }
    },
  },
}
</script>
