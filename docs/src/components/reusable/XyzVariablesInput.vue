<template>
  <div class="variables-input">
    <div class="variables-content">
      <div class="variable" v-for="variable in variables">{{variable}}</div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'XyzVariablesInput',
	props: ['value', 'variables'],
  computed: {
    variableObjs () {
    },
  },
}
</script>

<style lang="scss" scoped>
.variables-input {
  padding: $spacing-xs;
  border-radius: $br-l;
  font-family: $font-stack-mono;
  overflow-x: auto;
}

.variables-content {
  color: primary-color(100);
  background-color: primary-color(900);
}

.variable {

}
</style>
