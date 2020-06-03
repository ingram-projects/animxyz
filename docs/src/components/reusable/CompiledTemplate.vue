<script>
export default {
  name: 'CompiledTemplate',
  props: ['template'],
  render(createElement) {
    return createElement({
      template: this.template,
      methods: {
      }
    })
  }
}
</script>
