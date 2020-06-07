<template>
  <div class="variables-input">
    <div class="variables-content">
      <div class="variable" v-for="variable in computedVariables" :key="variable.string">
        <label class="variable-label" :class="[`color-axis-${getVariableAxis(variable)}`]" :for="variable.id">{{variable.string}}:</label>
        <input class="variable-input" type="text" :id="variable.id" v-model="value[variable.name]" />
      </div>
    </div>
  </div>
</template>

<script>
import { getXyzVariableMode } from '~/utils/xyzVariables'

export default {
	name: 'XyzVariablesInput',
	props: ['value', 'variables'],
  computed: {
    computedVariables () {
      return this.variables.map((variable) => {
        const xyzVariableMode = getXyzVariableMode(variable)
        return {
          ...xyzVariableMode,
          id: `${this._uid}_${xyzVariableMode.string}`,
        }
      })
    },
  },
  methods: {
    getVariableAxis(xyzVariable) {
      if (xyzVariable.axis) {
        return xyzVariable.axis
      }
      return 'none'
    },
  }
}
</script>

<style lang="scss" scoped>
.variables-input {
  border-radius: $br-l;
  font-family: $font-stack-mono;
  padding: $spacing-xs;
  overflow-x: auto;
}

.variables-content {
  background-color: primary-color(900);
}

.variable {
  padding: $spacing-xxxs;
  display: flex;
  align-items: center;

  .variable-label {
    font-weight: bold;
    white-space: nowrap;
  }

  .variable-input {
    flex-grow: 1;
    font-weight: bold;
    color: primary-color(100);
    margin-left: $spacing-xxs;
  }
}
</style>
