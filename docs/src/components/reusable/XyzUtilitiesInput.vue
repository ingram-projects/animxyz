<template>
  <div class="utilties-input">
    <table class="utilities-table">
      <tr>
        <th></th>
        <th class="utility-level__header" v-for="utilityLevel in utilityLevels">
          {{utilityLevel}}
        </th>
      </tr>
      <tr v-for="row in rows" :key="row.name">
        <th class="utility-class__header">
          {{row.name}}
        </th>
        <td class="utility-level" v-for="cell in row.cells" :key="cell.id">
          <div class="utility-level__content" v-if="cell.valid">
            <input class="toggle-input" type="radio" :id="cell.id" :value="cell.value" v-model="selectedObj[row.model]" @click="onCellClick(cell, row.model)">
            <label class="toggle-label" :for="cell.id">
              <div class="toggle-indicator"></div>
            </label>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getXyzUtilityClass, getXyzUtilityClassLevel } from '~/utils'

export default {
  name: 'XyzUtilitiesInput',
  props: ['value', 'utilities', 'multiple'],
  data () {
    return {
      selectedObj: {},
    }
  },
  computed: {
    utilityClasses () {
      return this.utilities.map((name) => {
        return getXyzUtilityClass(name)
      })
    },
    utilityLevels () {
      const utilityLevelsMap = {}
      this.utilityClasses.forEach((utilityClass) => {
        Object.keys(utilityClass.utilityMap).forEach((utilityLevel) => {
          utilityLevelsMap[utilityLevel] = true
        })
      })
      return ['default', ...Object.keys(utilityLevelsMap)]
    },
    rows () {
      return this.utilityClasses.map((utilityClass) => {
        return {
          name: utilityClass.name,
          model: this.getUtilityClassModel(utilityClass),
          cells: this.utilityLevels.map((utilityLevel) => {
            const utilityClassLevel = getXyzUtilityClassLevel(utilityClass.name, utilityLevel)
            return {
              id: `${this._uid}_${utilityClassLevel.string}`,
              value: utilityClassLevel.string,
              valid: utilityClassLevel.valid,
            }
          }),
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.selectedObj = {}
        const selectedUtilities = this.value.split(' ')
        selectedUtilities.forEach((selectedUtility) => {
          const match = selectedUtility.match(/^([a-zA-Z\-]+)(?:\-(\d+))?$/)
          if (match) {
            const name = match[1]
            const utilityClass = getXyzUtilityClass(name)
            const model = this.getUtilityClassModel(utilityClass)
            this.$set(this.selectedObj, model, selectedUtility)
          }
        })
      }
    },
    selectedObj: {
      deep: true,
      handler() {
        const selected = Object.values(this.selectedObj).join(' ')
        this.$emit('input', selected)
      }
    }
  },
  methods: {
    getUtilityClassModel (utilityClass) {
      let model = 'utility'
      if (this.multiple) {
        model += `_${utilityClass.type}`
        if (utilityClass.axis) {
          model += `_${utilityClass.axis}`
        }
      }
      return model
    },
    onCellClick (cell, model) {
      if (this.multiple && this.selectedObj[model] === cell.value) {
        this.$delete(this.selectedObj, model)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.utilties-input {
  padding: $spacing-xxs;
  border-radius: $br-l;
  font-family: $font-stack-mono;
  overflow-x: auto;
}

.utilities-table {
  width: 100%;
  border-collapse: collapse;
  color: primary-color(100);
  background-color: primary-color(900);

  th {
    padding: $spacing-xxs;
    vertical-align: middle;
  }

  .utility-class__header {
    width: 0.1%;
    text-align: right;
    white-space: nowrap;
  }

  .utility-level__header {
    min-width: 2.5rem;
  }

  .utility-level {
    position: relative;
  }

  .utility-level__content {
    width: 100%;
    height: 2rem;
  }

  .toggle-input {
    display: none;

    &:checked + .toggle-label .toggle-indicator {
      @include size(1.5rem);
      border-radius: $br-m;
      opacity: 1;
    }
  }

  .toggle-label {
    width: 100%;
    height: 100%;
    display: flex;

    &:hover {
      .toggle-indicator {
        @include circle(.5rem);
        opacity: 0.5;
      }
    }
  }

  .toggle-indicator {
    @include circle(.25rem);
    margin: auto;
    opacity: 0.25;
    background-color: primary-color(100);
    transition: all .15s $ease-in-out;
  }
}
</style>
