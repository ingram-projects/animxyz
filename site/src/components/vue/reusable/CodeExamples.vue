<template>
  <div class="code-examples">
    <TabBar :tabs="examples" v-if="examples.length > 1" v-model="activeExample"></TabBar>

    <XyzTransition xyz="fade" mode="out-in">
      <div class="examples-sections" v-if="activeExample">
        <div class="example-template">
          <component
            v-if="activeExample.component"
            :is="exampleComponents[activeExample.component]"
            :data="data"
            @custom-data="onCustomData"
          ></component>
          <DynamicTemplate
            v-if="activeExample.template"
            :template="activeExample.template"
            :data="data"
            @custom-data="onCustomData"
          ></DynamicTemplate>
        </div>

        <CodeBlock class="example-code" body-scroll-lock-ignore :code="activeExample.code" :data="data"></CodeBlock>
      </div>
    </XyzTransition>
  </div>
</template>

<script>
import CodeBlock from '~/components/vue/reusable/CodeBlock.vue'
import DynamicTemplate from '~/components/vue/reusable/DynamicTemplate.vue'
import TabBar from '~/components/vue/reusable/TabBar.vue'
import { exampleComponents } from '~/components/vue/examples'

export default {
  name: 'CodeExamples',
  components: {
    CodeBlock,
    DynamicTemplate,
    TabBar,
  },
  props: {
    examples: Array,
    injectedData: Object,
  },
  data() {
    return {
      exampleComponents,
      activeExample: null,
      animCount: 0,
      toggled: false,
      toggleTimeout: null,
      customData: null,
    }
  },
  computed: {
    data() {
      return {
        toggled: this.toggled,
        mode: this.toggled ? 'xyz-in' : 'xyz-out',
        listeners: {
          onBeforeAppear: this.beforeAnim,
          onBeforeEnter: this.beforeAnim,
          onBeforeLeave: this.beforeAnim,
          onAfterAppear: this.afterAnim,
          onAfterEnter: this.afterAnim,
          onAfterLeave: this.afterAnim,
          onAppearCancelled: this.afterAnim,
          onEnterCancelled: this.afterAnim,
          onLeaveCancelled: this.afterAnim,
        },
        ...this.injectedData,
        ...this.customData,
      }
    },
  },
  watch: {
    activeExample() {
      this.onExampleChange()
    },
    examples: {
      immediate: true,
      handler() {
        if (this.examples.length) {
          if (this.activeExample) {
            this.activeExample = this.examples.find((example) => example.name === this.activeExample.name)
          }
          if (!this.activeExample) {
            this.activeExample = this.examples[0]
          }
        } else {
          this.activeExample = null
        }
      },
    },
  },
  methods: {
    clearToggleTimeout() {
      clearTimeout(this.toggleTimeout)
      this.toggleTimeout = null
    },
    toggleExample() {
      this.animCount = 0
      this.clearToggleTimeout()
      this.toggleTimeout = setTimeout(() => {
        this.toggled = !this.toggled
      }, 1000)
    },
    beforeAnim() {
      this.animCount++
    },
    afterAnim() {
      this.animCount--
      if (this.animCount === 0) {
        this.toggleExample()
      }
    },
    onExampleChange() {
      this.toggled = false
      this.customData = {}
      this.toggleExample()
    },
    setExample(exampleName) {
      this.activeExample = this.examples.find((example) => example.name === exampleName)
    },
    onCustomData(customData) {
      this.customData = customData
    },
  },
  mounted() {
    this.onExampleChange()
  },
  beforeUnmount() {
    this.clearToggleTimeout()
  },
}
</script>

<style lang="scss" scoped>
.code-examples {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.examples-sections {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.example-template {
  position: relative;
  min-height: 10rem;
  flex-grow: 1;
  padding: $sp-m;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-code {
  font-size: 1.125rem;

  @include media('<tablet') {
    font-size: $fs-m;
  }
}
</style>
