<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear mode="out-in" xyz="flip-up out-flip-down duration-3 ease-out">
			<div class="square text--xxl fw--bold" :key="key">{{ key }}</div>
		</XyzTransition>
		<button class="example-button mt-l" @click="key += 1">Click to increment</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			key: 1,
		}
	},
}
</script>
