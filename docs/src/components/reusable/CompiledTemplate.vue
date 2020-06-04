<script>
export default {
  name: 'CompiledTemplate',
  props: ['template', 'data'],
  render(createElement) {
    return createElement({
      template: this.template,
      props: ['data'],
    }, {
      props: {
        data: this.data,
      }
    })
  }
}
</script>
