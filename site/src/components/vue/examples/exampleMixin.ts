import type { ComponentOptions } from 'vue'

const ExampleMixin: ComponentOptions = {
  props: {
    data: Object,
  },
  emits: ['custom-data'],
  watch: {
    customData: {
      deep: true,
      handler() {
        this.onCustomData()
      },
    },
  },
  methods: {
    onCustomData() {
      this.$emit('custom-data', this.customData)
    },
  },
  created() {
    this.$nextTick(() => this.onCustomData())
  },
}

export default ExampleMixin
