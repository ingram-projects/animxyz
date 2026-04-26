<template>
  <div class="example-wrap flex-col">
    <XyzTransitionGroup
      class="example-grid example-grid-9"
      xyz="fade small out-back-3"
      :duration="2500"
      :style="{
        '--xyz-in-stagger': '0.025s',
        '--xyz-out-stagger-rev': '0.025s',
      }"
      v-on="data.listeners"
    >
      <!-- eslint-disable -->
      <template v-if="data.toggled">
        <div
          class="square"
          v-for="index in 81"
          :key="index"
          :style="{ '--xyz-index-rev': Math.random() * 81 }"
        ></div>
      </template>
      <!-- eslint-enable -->
    </XyzTransitionGroup>
  </div>
</template>

<script>
import ExampleMixin from '~/components/vue/examples/exampleMixin'

export default {
  mixins: [ExampleMixin],
  data() {
    return {
      math: Math,
    }
  },
}
</script>
