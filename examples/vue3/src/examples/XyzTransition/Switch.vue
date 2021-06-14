<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear mode="out-in">
			<div class="square" xyz="fade left-100%" v-if="shapes[shapeIndex] === 'square'" key="square"></div>
			<div class="circle" xyz="fade up-100%" v-else-if="shapes[shapeIndex] === 'circle'" key="circle"></div>
			<div class="triangle" xyz="fade right-100%" v-else-if="shapes[shapeIndex] === 'triangle'" key="triangle"></div>
		</XyzTransition>
		<button class="example-button mt-l" @click="changeShape">Click to switch</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			shapeIndex: 0,
			shapes: ['square', 'circle', 'triangle'],
		}
	},
	methods: {
		changeShape() {
			this.shapeIndex++
			if (this.shapeIndex === this.shapes.length) {
				this.shapeIndex = 0
			}
		},
	},
}
</script>
