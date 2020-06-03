<template>
  <div class="section-examples">
    <div class="section-example">
      <div class="example-template">
        <xyz-transition appear @after-enter="afterEnter" @after-leave="afterLeave">
          <compiled-template :template="this.activeExample.template" v-if="exampleToggled"></compiled-template>
        </xyz-transition>
      </div>
      <div class="example-code">
        <code-block :code="this.activeExample.code"></code-block>
      </div>
    </div>
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
      exampleToggled: true,
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
    },
    afterEnter() {
      this.exampleToggled = false
    },
    afterLeave() {
      this.exampleToggled = true
    }
  },
  created () {
    this.setActiveExample(0)
  }
}
</script>

<style lang="scss" scoped>
.section-example {
  margin-top: $spacing-s;
  background: primary-color(100);
  border-radius: $br-l;
}

.example-template {
  min-height: 10rem;
  display: flex;
  --xyz-duration-default: 1s;
}

.example-code {
  pre[class*="language-"] {
    margin: 0;
  }
}
</style>
