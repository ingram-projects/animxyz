<template>
  <div class="section-examples">
    <div class="section-example">
      <compiled-template :template="this.activeExample.template"></compiled-template>
    </div>
    <code-block :code="this.activeExample.code"></code-block>
  </div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import CompiledTemplate from '~/components/reusable/CompiledTemplate'

export default {
	name: 'SectionExamples',
	props: ['examples'],
  components: {
    CodeBlock,
    CompiledTemplate,
  },
	data () {
		return {
			activeExampleIndex: null,
      activeCodeType: null,
		}
	},
	computed: {
		activeExample () {
			if (this.examples.length) {
				return this.examples[this.activeExampleIndex]
			}
			return null
		},
    compiledTemplate () {
      return this.activeExample.template
    }
	},
  methods: {
    setActiveExample(index) {
      this.activeExampleIndex = index
    }
  },
  created () {
    this.setActiveExample(0)
    console.log(this.activeExample)
  }
}
</script>

<style lang="scss" scoped>
.section-example {
	display: flex;
	min-height: 14rem;
}
</style>
