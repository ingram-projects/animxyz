<template>
  <div class="utilities-table__wrap">
    <table class="utilities-table">
      <tr>
        <th></th>
        <th class="utility-level__header" v-for="utilityLevel in utilityLevels">
          {{utilityLevel}}
        </th>
      </tr>
      <tr v-for="utilityClass in utilityClasses" :key="utilityClass.name">
        <th class="utility-class__header">
          {{utilityClass.name}}
        </th>
        <td class="utility-level" v-for="utilityLevel in utilityLevels" :key="utilityLevel">
          <button class="utility-level__toggle" :class="{ 'toggled': isToggled(utilityClass.name, utilityLevel) }" @click="toggle(utilityClass.name, utilityLevel)">
            <div class="toggle-indicator"></div>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getXyzUtilityClass, getXyzUtilityClassLevel } from '~/utils'

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
      return ['default', ...Object.keys(utilityLevelsMap)]
    }
  },
  methods: {
    isToggled(name, level) {
      const utilityClassLevel = getXyzUtilityClassLevel(name, level)
      return this.toggled[utilityClassLevel.string]
    },
    toggle(name, level) {
      const utilityClassLevel = getXyzUtilityClassLevel(name, level)
      if (!this.utilities.multiple) {
        this.toggled = {}
      }
      if (this.toggled[utilityClassLevel.string]) {
        delete this.toggled[utilityClassLevel.string]
      } else {
        this.toggled[utilityClassLevel.string] = true
      }
    }
  },
  created () {
    if (this.utilities.defaults) {
      this.utilities.defaults.forEach((defaultClass) => {
        this.toggle(defaultClass)
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

  th {
    padding: $spacing-xxs;
    vertical-align: middle;
  }

  .utility-class-header {
    text-align: right;
  }

  .utility-level-header {
    min-width: 2rem;
  }

  .utility-level {
    position: relative;
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

    &.toggled {
      .toggle-indicator {
        @include size(1.5rem);
        border-radius: $br-m;
        opacity: 1;
      }
    }
  }
}
</style>
