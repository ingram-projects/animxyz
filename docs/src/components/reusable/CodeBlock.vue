<template>
  <prism :language="activeCode.language">{{ activeCodeContent }}</prism>
</template>

<script>
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import Prism from 'vue-prism-component'

const langParsers = {
  html: {
    name: 'html',
    parser: parserHtml,
  },
  javascript: {
    name: 'javascript',
    parser: parserBabel,
  },
}

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
      const evalData = eval(`\`${this.activeCode.content}\``)
      const parser = langParsers[this.activeCode.language]
      const prettierData = prettier.format(evalData, {
        parser: parser.name,
        plugins: [parser.parser],
        printWidth: 80,
				semi: false,
				singleQuote: true,
				trailingComma: 'es5',
      })
      return prettierData
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
