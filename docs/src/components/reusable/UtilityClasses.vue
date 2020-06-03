<template>
  <div class="utility-classes">
  </div>
</template>

<script>
export default {
  name: 'UtilityClasses',
  props: ['names', 'multiple', 'defaults'],
  data () {
    return {
      toggled: {},
    }
  },
  computed: {
  },
  methods: {
    toggleClass(utilityClass) {
      if (!this.multiple) {
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
    this.defaults.forEach((defaultClass) => {
      this.toggleClass(defaultClass)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
