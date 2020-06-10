<template>
  <div class="variables-input">
    <div class="variables-content">
      <div class="variable" v-for="row in rows" :key="row.string">
        <label class="variable-label" :for="row.id">{{row.string}}:</label>
        <input class="variable-input" type="text" :id="row.id" v-model="value[row.name]" />
      </div>
    </div>
  </div>
</template>

<script>
import { xyzVariables, getXyzVariable, getXyzVariableMode } from '~/utils/xyzVariables'

export default {
	name: 'XyzVariablesInput',
	props: ['value', 'variables'],
  computed: {
    computedVariables () {
      if (this.variables === 'all') {
        return xyzVariables
      }
      return this.variables.map((name) => {
        return getXyzVariable(name)
      })
    },
    rows () {
      return this.computedVariables.map((variable) => {
        const variableMode = getXyzVariableMode(variable.name)
        return {
          ...variableMode,
          id: `${this._uid}_${variableMode.string}`,
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
    color: primary-color(100);
  }

  .variable-input {
    flex-grow: 1;
    font-weight: bold;
    margin-left: $spacing-xxs;
    color: primary-color(100);
  }
}
</style>
