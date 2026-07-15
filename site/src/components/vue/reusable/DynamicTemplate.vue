<script>
import { h } from 'vue'

export default {
  name: 'DynamicTemplate',
  inheritAttrs: false,
  props: {
    template: String,
    data: Object,
  },
  computed: {
    component() {
      return {
        template: this.template,
        props: {
          data: Object,
        },
      }
    },
  },
  render() {
    return h(this.component, {
      data: this.data,
      ...this.$attrs,
    })
  },
}
</script>
