<template>
  <div class="example-wrap flex-col">
    <XyzTransition appear mode="out-in" xyz="flip-up out-flip-down duration-3 ease-out">
      <div class="square text--xxl fw--bold" :key="customData.key">{{ customData.key }}</div>
    </XyzTransition>
    <button class="example-button mt-l" @click="customData.key += 1">Click to increment</button>
  </div>
</template>

<script>
import ExampleMixin from '~/components/vue/examples/exampleMixin'

export default {
  mixins: [ExampleMixin],
  data() {
    return {
      customData: {
        key: 1,
      },
    }
  },
}
</script>
