<template>
  <div class="utilities-table__wrap">
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
          <input class="toggle-input" type="radio" :id="cell.id" :value="cell.value" v-model="toggled[row.identifier]" @click="toggleCell(row.identifier, cell)">
          <label class="utility-level__toggle" :for="cell.id">
            <div class="toggle-indicator"></div>
          </label>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getXyzUtilityClass, getXyzUtilityClassLevel } from '~/utils'

export default {
  name: 'UtilitiesTable',
  props: ['value', 'classes', 'multiple'],
  data () {
    return {
      toggled: {},
    }
  },
  computed: {
    utilityClasses () {
      return this.classes.map((name) => {
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
        let identifier = this._uid

        if (this.multiple) {
          identifier += `_${utilityClass.type}`
          if (utilityClass.axis) {
            identifier += `_${utilityClass.axis}`
          }
        }

        return {
          name: utilityClass.name,
          identifier,
          cells: this.utilityLevels.map((utilityLevel) => {
            const utilityClassLevel = getXyzUtilityClassLevel(utilityClass.name, utilityLevel)
            return {
              id: `${identifier}_${utilityClassLevel.string}`,
              value: utilityClassLevel.string,
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
        console.log(this.value)
      }
    },
    toggled: {
      deep: true,
      handler() {
        console.log(this.toggled)
      }
    }
  },
  methods: {
    toggleCell (identifier, cell) {
      if (this.multiple && this.toggled[identifier] === cell.value) {
        this.toggled[identifier] = {}
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.utilities-table__wrap {
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
    text-align: right;
    width: 0.1%;
  }

  .utility-level__header {
    min-width: 2.5rem;
  }

  .utility-level {
    position: relative;
  }


  .toggle-input {
    display: none;

    &:checked + .utility-level__toggle .toggle-indicator {
      @include size(1.5rem);
      border-radius: $br-m;
      opacity: 1;
    }
  }

  .utility-level__toggle {
    width: 100%;
    height: 2rem;
    display: flex;

    .toggle-indicator {
      @include circle(.25rem);
      margin: auto;
      opacity: 0.25;
      background-color: primary-color(100);
      transition: all .15s $ease-in-out;
    }

    &:hover {
      .toggle-indicator {
        @include circle(.5rem);
        opacity: 0.5;
      }
    }
  }
}
</style>
