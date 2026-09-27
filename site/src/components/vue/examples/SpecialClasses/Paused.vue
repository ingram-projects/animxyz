<template>
  <div class="example-wrap flex-col">
    <XyzTransitionGroup
      class="example-grid"
      appear
      duration="auto"
      v-on="data.listeners"
      data-xyz="in-duration-10 out-duration-3 fade rotate-right-3 flip-down origin-bottom stagger-1 out-stagger-rev"
    >
      <!-- eslint-disable -->
      <template v-if="data.toggled">
        <div
          class="square"
          :class="{ 'xyz-paused': customData.paused }"
          v-for="index in 4"
          :key="index"
        ></div>
      </template>
      <!-- eslint-enable -->
    </XyzTransitionGroup>

    <button class="example-button mt-l" @click="customData.paused = !customData.paused" :disabled="!data.toggled">
      {{ customData.paused ? 'Resume' : 'Pause' }}
    </button>
  </div>
</template>

<script>
import ExampleMixin from '~/components/vue/examples/exampleMixin'

export default {
  mixins: [ExampleMixin],
  data() {
    return {
      customData: {
        paused: false,
      },
    }
  },
}
</script>
