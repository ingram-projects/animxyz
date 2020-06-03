<template>
  <div class="code-block">
    <prism :language="activeCode.language">{{ activeCode.content }}</prism>
  </div>
</template>

<script>
import Prism from 'vue-prism-component'

export default {
	name: 'CodeBlock',
	props: ['code'],
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
    }
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
