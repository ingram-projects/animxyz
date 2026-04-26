<template>
  <div class="sandbox">
    <XyzTransition xyz="fade">
      <XyzModifiersInput
        v-if="modifiers"
        v-model="xyzModifiers"
        :modifiers="modifiers"
        ref="modifiersInput"
      ></XyzModifiersInput>
    </XyzTransition>
    <CodeExamples :examples="examples" :injected-data="injectedData" ref="examplesEl"></CodeExamples>
  </div>
</template>

<script>
import CodeExamples from '~/components/vue/reusable/CodeExamples.vue'
import XyzModifiersInput from '~/components/vue/reusable/XyzModifiersInput.vue'

export default {
  name: 'Sandbox',
  props: {
    name: String,
    examples: Array,
    modifiers: Object,
  },
  components: {
    CodeExamples,
    XyzModifiersInput,
  },
  data() {
    return {
      xyzModifiers: {
        utilities: {},
        variables: {},
      },
    }
  },
  computed: {
    utilitiesString() {
      return Object.keys(this.xyzModifiers.utilities).join(' ')
    },
    variablesString() {
      const variablesArray = []
      Object.entries(this.xyzModifiers.variables).forEach(([name, value]) => {
        variablesArray.push(`${name}: ${value}`)
      })
      return variablesArray.join('; ')
    },
    injectedData() {
      return {
        utilities: this.xyzModifiers.utilities,
        utilitiesString: this.utilitiesString,
        variables: this.xyzModifiers.variables,
        variablesString: this.variablesString,
      }
    },
  },
  watch: {
    name() {
      this.onLocationChange()
    },
    modifiers: {
      immediate: true,
      handler() {
        this.applyDefaults()
      },
    },
  },
  methods: {
    clearModifiers() {
      this.xyzModifiers = {
        utilities: {},
        variables: {},
      }
    },
    applyDefaults() {
      this.clearModifiers()
      if (!this.modifiers) return
      if (this.modifiers.utilities && this.modifiers.utilities.defaults) {
        this.modifiers.utilities.defaults.forEach((defaultUtility) => {
          this.xyzModifiers.utilities[defaultUtility] = true
        })
      }
      if (this.modifiers.variables && this.modifiers.variables.defaults) {
        this.modifiers.variables.defaults.forEach((defaultVariable) => {
          const [name, value] = defaultVariable.split(':')
          this.xyzModifiers.variables[`--xyz-${name}`] = value.trim()
        })
      }
    },
    onLocationChange() {
      if (typeof window === 'undefined') return
      if (window.location.hash !== `#${this.name}`) return
      const params = new URLSearchParams(window.location.search)
      if (params.get('example') && this.$refs.examplesEl) {
        this.$refs.examplesEl.setExample(params.get('example'))
      }
      if (params.get('group') && this.$refs.modifiersInput) {
        this.$refs.modifiersInput.setGroup(params.get('group'))
      }
      if (params.get('utilities') || params.get('variables')) {
        this.clearModifiers()
      }
      if (params.get('utilities')) {
        params
          .get('utilities')
          .split(';')
          .forEach((utility) => {
            this.xyzModifiers.utilities[utility] = true
          })
      }
      if (params.get('variables')) {
        params
          .get('variables')
          .split(';')
          .forEach((variable) => {
            const [name, value] = variable.split(':')
            this.xyzModifiers.variables[`--xyz-${name}`] = value.trim()
          })
      }
    },
    onHashChange() {
      this.onLocationChange()
    },
  },
  mounted() {
    this.onLocationChange()
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', this.onHashChange)
      window.addEventListener('popstate', this.onHashChange)
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', this.onHashChange)
      window.removeEventListener('popstate', this.onHashChange)
    }
  },
}
</script>

<style lang="scss" scoped>
.sandbox {
  background: primary-color(900);
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
}

.modifiers-input {
  border-bottom: 1px solid primary-color(800);
}

.code-examples {
  flex-grow: 1;
}

.sandbox-row {
  &:not(:last-child) {
    border-bottom: 1px solid;
    border-color: primary-color(800);
  }
}
</style>
