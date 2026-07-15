<template>
  <div class="example-wrap flex-col">
    <XyzTransition appear xyz="fade rotate-right ease-out-back">
      <div class="square" v-if="customData.buttonToggled"></div>
    </XyzTransition>
    <button class="example-button mt-l" @click="customData.buttonToggled = !customData.buttonToggled">
      Click to toggle
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
        buttonToggled: true,
      },
    }
  },
}
</script>
