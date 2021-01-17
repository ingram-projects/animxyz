<template>
	<div class="example-wrap">
		<div class="scroll-wrap">
			<XyzTransitionGroup appear-visible class="item-grid" xyz="delay-2 fade small rotate-right">
				<div class="square" v-for="index in 200" :key="index"></div>
			</XyzTransitionGroup>
		</div>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
}
</script>

<style lang="scss" scoped>
.scroll-wrap {
	overflow-y: auto;
	max-height: 28rem;
}

.item-grid {
	gap: $sp-xxs;
}
</style>
