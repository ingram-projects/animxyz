<template>
  <div class="code-block">
  </div>
</template>

<script>
export default {
	name: 'CodeBlock',
	props: ['code', 'activeType'],
}
</script>

<style lang="scss" scoped>
.code-block {
	min-height: 14rem;
}
</style>
