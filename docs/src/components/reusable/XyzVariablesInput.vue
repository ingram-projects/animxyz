<template>
  <div class="variables-input">
    <div class="variables-group" v-for="group in groups" :key="group.name">
      <div class="variable" v-for="variable in group.variables" :key="variable.string">
        <label class="variable-label" :for="variable.id">{{variable.string}}:</label>
        <input class="variable-input" type="text" :id="variable.id" v-model="value[variable.name]" />
      </div>
    </div>
  </div>
</template>

<script>
import { xyzVariables, getXyzVariable, getXyzVariableMode } from '~/utils/xyzVariables'

export default {
	name: 'XyzVariablesInput',
	props: ['value', 'variables', 'groupBy'],
  computed: {
    computedVariables () {
      if (this.variables === 'all') {
        return xyzVariables
      }
      return this.variables.map((name) => {
        return getXyzVariable(name)
      })
    },
    groups() {
			// Compute groups
			const groupsMap = {}
			if (!this.groupBy) {
				groupsMap.all = this.computedVariables
			} else {
				this.computedVariables.forEach((variable) => {
					const groupName = variable[this.groupBy]
					if (!groupsMap[groupName]) {
						groupsMap[groupName] = []
					}
					groupsMap[groupName].push(variable)
				})
			}

			return Object.entries(groupsMap).map(([name, group]) => {
				const groupObj = {
					name,
				}

				// Compute group variables
				groupObj.variables = group.map((variable) => {
          const variableMode = getXyzVariableMode(variable.name)
					return {
            ...variableMode,
            id: `${this._uid}_${variableMode.string}`,
					}
				})

				return groupObj
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

.variables-group {
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
