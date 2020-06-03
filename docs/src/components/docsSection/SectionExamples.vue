<template>
  <div class="section-examples">
    <div class="section-example">
      <utilities-table class="example-utilities" :utilities="utilities"></utilities-table>
      <div class="example-template">
        <xyz-transition appear @after-enter="afterEnter" @after-leave="afterLeave">
          <compiled-template :template="activeExample.template" v-if="exampleToggled"></compiled-template>
        </xyz-transition>
      </div>
      <code-block class="example-code" :code="activeExample.code"></code-block>
    </div>
  </div>
</template>

<script>
import CodeBlock from '~/components/reusable/CodeBlock'
import CompiledTemplate from '~/components/reusable/CompiledTemplate'
import UtilitiesTable from '~/components/reusable/UtilitiesTable'

export default {
	name: 'SectionExamples',
	props: ['examples', 'utilities'],
  components: {
    CodeBlock,
    CompiledTemplate,
    UtilitiesTable,
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
  margin-top: $spacing-m;
  background: primary-color(900);
  border-radius: $br-l;
}

.example-template {
  min-height: 12rem;
  display: flex;
  --xyz-duration-default: 1s;
  border-bottom: 1px solid;
  border-top: 1px solid;
  border-color: primary-color(800);
}

.example-utilities {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.example-code {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
}
</style>
