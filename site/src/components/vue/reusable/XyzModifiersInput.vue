<template>
  <div class="modifiers__wrap">
    <TabBar :tabs="computedGroups" v-if="computedGroups.length > 1" v-model="activeGroup"></TabBar>

    <div class="modifiers-sections__wrap" data-xyz="ease-in-out duration-3" v-xyz="tabDirectionXyz">
      <XyzTransition class="xyz-out-absolute">
        <div class="modifiers-sections" v-if="activeGroup && activeGroup.presets" key="Presets">
          <XyzModifiersPresets :presets="activeGroup.presets" @select-preset="onSelectPreset"></XyzModifiersPresets>
        </div>
        <div class="modifiers-sections" v-else-if="activeGroup" :key="activeGroup.name">
          <XyzUtilitiesInput
            v-if="showUtilities"
            class="modifiers-utilities modifiers-section"
            :utilities="activeGroup.utilityNames"
            :multiple="modifiers.utilities && modifiers.utilities.multiple"
            v-model="utilitiesModel"
          ></XyzUtilitiesInput>

          <XyzVariablesInput
            v-if="showVariables"
            class="modifiers-variables modifiers-section"
            :variables="activeGroup.variableNames"
            v-model="variablesModel"
            :style="{ '--xyz-delay': `${activeGroup.utilityNames.length * 0.05}s` }"
          ></XyzVariablesInput>
        </div>
      </XyzTransition>
    </div>

    <XyzTransition appear data-xyz="fade right skew-right-3 ease-out-back">
      <button v-if="numActiveModifiers" class="clear-modifiers" @click="clearModifiers">
        Clear All
        <XyzTransition mode="out-in" data-xyz="in-flip-right out-flip-left duration-1 ease-out">
          <div class="num-active-modifiers" :key="numActiveModifiers">{{ numActiveModifiers }}</div>
        </XyzTransition>
      </button>
    </XyzTransition>
  </div>
</template>

<script>
import IconPresets from '~/assets/icons/IconPresets.svg?component'
import TabBar from '~/components/vue/reusable/TabBar.vue'
import XyzModifiersPresets from '~/components/vue/reusable/XyzModifiersPresets.vue'
import XyzUtilitiesInput from '~/components/vue/reusable/XyzUtilitiesInput.vue'
import XyzVariablesInput from '~/components/vue/reusable/XyzVariablesInput.vue'
import { xyzUtilities, xyzVariables, createXyzUtilityRegex, createXyzVariableRegex } from '~/utils'

export default {
  name: 'XyzModifiersInput',
  props: {
    modelValue: Object,
    modifiers: Object,
  },
  emits: ['update:modelValue', 'group-changed'],
  components: {
    TabBar,
    XyzModifiersPresets,
    XyzUtilitiesInput,
    XyzVariablesInput,
  },
  data() {
    return {
      activeGroup: null,
      tabDirectionXyz: null,
    }
  },
  computed: {
    showUtilities() {
      return this.modifiers.utilities && !this.modifiers.utilities.hide
    },
    showVariables() {
      return this.modifiers.variables && !this.modifiers.variables.hide
    },
    utilitiesModel: {
      get() {
        return this.modelValue.utilities || {}
      },
      set(val) {
        this.$emit('update:modelValue', { ...this.modelValue, utilities: val })
      },
    },
    variablesModel: {
      get() {
        return this.modelValue.variables || {}
      },
      set(val) {
        this.$emit('update:modelValue', { ...this.modelValue, variables: val })
      },
    },
    computedGroups() {
      const computedGroups = (this.modifiers.groups || []).map((group) => {
        const utilities = []
        const variables = []

        group.types.forEach((type) => {
          utilities.push(...xyzUtilities.filter((utility) => utility.type === type))
          variables.push(...xyzVariables.filter((variable) => variable.type === type))
        })

        const utilityNames = utilities.map((utility) => utility.name)
        const variableNames = variables.map((variable) => variable.name)

        const utilityRegex = createXyzUtilityRegex(utilityNames)
        const variableRegex = createXyzVariableRegex(variableNames)

        const hasToggledUtilities = Object.keys(this.modelValue.utilities || {}).some((utility) => {
          return utility.match(utilityRegex)
        })
        const hasToggledVariables = Object.keys(this.modelValue.variables || {}).some((variable) => {
          return variable.match(variableRegex)
        })

        return {
          ...group,
          utilityNames,
          variableNames,
          hasContent: hasToggledUtilities || hasToggledVariables,
        }
      })

      if (this.modifiers.presets) {
        const presetsGroup = {
          name: 'Examples',
          icon: IconPresets,
          presets: this.modifiers.presets,
        }
        return [presetsGroup, ...computedGroups]
      }

      return computedGroups
    },
    activeGroupIndex() {
      if (this.activeGroup) {
        return this.computedGroups.findIndex((group) => group.name === this.activeGroup.name)
      }
      return -1
    },
    numActiveModifiers() {
      return Object.keys(this.modelValue.utilities || {}).length + Object.keys(this.modelValue.variables || {}).length
    },
  },
  watch: {
    activeGroup() {
      this.$emit('group-changed', this.activeGroup)
    },
    activeGroupIndex(newIndex, oldIndex) {
      if (newIndex > oldIndex) {
        this.tabDirectionXyz = 'out-left-100% in-right-100%'
      } else {
        this.tabDirectionXyz = 'out-right-100% in-left-100%'
      }
    },
    computedGroups: {
      immediate: true,
      handler() {
        if (this.computedGroups.length) {
          if (this.activeGroup) {
            this.setGroup(this.activeGroup.name)
          }
          if (!this.activeGroup) {
            this.activeGroup = this.computedGroups[0]
          }
        } else {
          this.activeGroup = null
        }
      },
    },
  },
  methods: {
    setGroup(groupName) {
      this.activeGroup = this.computedGroups.find((group) => group.name === groupName)
    },
    onSelectPreset(preset) {
      const newValue = {
        utilities: {},
        variables: {},
      }

      if (preset.utilities) {
        preset.utilities.forEach((utility) => {
          newValue.utilities[utility] = true
        })
      }
      if (preset.variables) {
        preset.variables.forEach((variable) => {
          const [name, value] = variable.split(':')
          newValue.variables[`--xyz-${name}`] = value.trim()
        })
      }

      this.$emit('update:modelValue', newValue)
    },
    clearModifiers() {
      this.$emit('update:modelValue', {
        utilities: {},
        variables: {},
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.modifiers__wrap {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.modifiers-sections__wrap {
  position: relative;
  overflow: hidden;
}

.modifiers-sections {
  width: 100%;
}

.modifiers-section {
  padding: $sp-s 0;

  & + & {
    padding-top: 0;
  }

  @media (width < $bp-laptop) {
    padding: $sp-xxs 0;
  }
}

.clear-modifiers {
  color: primary-color(200);
  padding: $sp-xxs $sp-xs;
  margin-left: auto;
  margin-right: $sp-xxs;
  font-size: $fs-s;
  font-weight: 500;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  border-radius: $br-m;
  display: flex;
  align-items: center;

  .num-active-modifiers {
    @include size(1.125rem);
    color: primary-color(900);
    background-color: primary-color(200);
    border-radius: $br-m;
    margin-left: $sp-xxs;
    text-align: center;
    line-height: 1.125rem;
    backface-visibility: hidden;
  }

  &:hover,
  &:focus {
    background-color: primary-color(800, 0.5);
    color: primary-color(50);
  }
}
</style>
