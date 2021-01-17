<template>
	<div class="example-wrap">
		<XyzTransitionGroup appear-visible class="item-grid" xyz="delay-2 fade small rotate-right">
			<div class="square" v-for="index in 100" :key="index"></div>
		</XyzTransitionGroup>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
}
</script>

<style lang="scss" scoped>
.example-wrap {
	overflow-y: auto;
	max-height: 28rem;
}
</style>
