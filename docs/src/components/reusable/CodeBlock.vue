<template>
  <prism :language="activeCode.language">{{ activeCodeContent }}</prism>
</template>

<script>
import Prism from 'vue-prism-component'

export default {
	name: 'CodeBlock',
	props: ['code', 'data'],
  components: {
    Prism,
  },
  data () {
    return {
      activeCodeIndex: null,
    }
  },
  computed: {
    activeCode () {
      if (this.code.length) {
				return this.code[this.activeCodeIndex]
			}
			return null
    },
    activeCodeContent () {
      const data = this.data
      return eval(`\`${this.activeCode.content}\``)
    },
  },
  methods: {
    setActiveLang(index) {
      this.activeCodeIndex = index
    },
  },
  created () {
    this.setActiveLang(0)
  },
}
</script>

<style lang="scss" scoped>
</style>
