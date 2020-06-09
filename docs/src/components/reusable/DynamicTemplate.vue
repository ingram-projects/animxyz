<script>
export default {
  name: 'DynamicTemplate',
  props: ['template', 'data'],
  computed: {
    component () {
      return {
        template: this.template,
        props: ['data'],
      }
    }
  },
  render(createElement) {
    return createElement(this.component, {
      props: {
        data: this.data,
      }
    })
  }
}
</script>
