<script>
export default {
  name: 'CompiledTemplate',
  props: ['template'],
  render(createElement) {
    return createElement({
      template: this.template,
      props: ['data'],
    }, {
      props: {
        data: this.$attrs,
      }
    })
  }
}
</script>
