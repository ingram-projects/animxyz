<template>
  <div class="example-wrap flex-col">
    <XyzTransition data-xyz="fade duration-10" v-xyz="customData.xyzUtilities" v-on="data.listeners">
      <div class="square" v-if="data.toggled"></div>
    </XyzTransition>
    <div class="flex-row mt-l">
      <label class="example-checkbox mt-l">
        <input type="checkbox" v-model="customData.xyzUtilities['down']" />
        <span>down</span>
      </label>
      <label class="example-checkbox mt-l">
        <input type="checkbox" v-model="customData.xyzUtilities['small']" />
        <span>small</span>
      </label>
      <label class="example-checkbox mt-l">
        <input type="checkbox" v-model="customData.xyzUtilities['rotate-right']" />
        <span>rotate-right</span>
      </label>
    </div>
  </div>
</template>

<script>
import ExampleMixin from '~/components/vue/examples/exampleMixin'

export default {
  mixins: [ExampleMixin],
  data() {
    return {
      customData: {
        xyzUtilities: {
          down: false,
          small: false,
          'rotate-right': false,
        },
      },
    }
  },
}
</script>
