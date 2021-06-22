<template>
	<div class="example-wrap">
		<div class="scroll-wrap">
			<XyzTransitionGroup appear-visible class="example-grid" xyz="delay-2 fade small rotate-right">
				<div class="square" v-for="index in 200" :key="index"></div>
			</XyzTransitionGroup>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.scroll-wrap {
	overflow-y: auto;
	max-height: 28rem;
}

.example-grid {
	gap: $sp-xxs;
}
</style>
