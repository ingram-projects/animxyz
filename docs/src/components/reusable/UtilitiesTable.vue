<template>
  <div class="utilities-table__wrap">
    <table class="utilities-table">
      <tr class="utility-header">
        <th></th>
        <th class="utility-level-header">default</th>
        <th class="utility-level-header" v-for="utilityLevel in utilityLevels">
          {{utilityLevel}}
        </th>
      </tr>
      <tr class="utility-class" v-for="utilityClass in utilityClasses" :key="utilityClass.name">
        <th>
          {{utilityClass.name}}
        </th>
        <td class="utility-level" v-for="utilityLevel in utilityLevels" :key="utilityLevel"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getXyzUtilityClass } from '~/utils'

export default {
  name: 'UtilitiesTable',
  props: ['utilities'],
  data () {
    return {
      toggled: {},
    }
  },
  computed: {
    utilityClasses () {
      return this.utilities.names.map((name) => {
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
      return Object.keys(utilityLevelsMap)
    }
  },
  methods: {
    toggleClass(utilityClass) {
      if (!this.utilities.multiple) {
        this.toggled = {}
      }
      if (this.toggled[utilityClass]) {
        delete this.toggled[utilityClass]
      } else {
        this.toggled[utilityClass] = true
      }
    }
  },
  created () {
    if (this.utilities.defaults) {
      this.utilities.defaults.forEach((defaultClass) => {
        this.toggleClass(defaultClass)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.utilities-table__wrap {
  overflow-x: auto;
  border-radius: $br-l;
  font-family: $font-stack-mono;
}

.utilities-table {
  width: 100%;
  border-collapse: collapse;
  color: primary-color(100);
  background-color: primary-color(900);

  th, td {
    padding: $spacing-xxs;
    vertical-align: middle;
  }

  .utility-class {
    text-align: right;
  }

  .utility-level {
    min-width: 2rem;
    text-align: center;
  }
}
</style>
