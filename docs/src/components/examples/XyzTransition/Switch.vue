<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear mode="out-in">
			<div
				class="square"
				xyz="fade left-100%"
				v-if="customData.shapes[customData.shapeIndex] === 'square'"
				key="square"
			></div>
			<div
				class="circle"
				xyz="fade up-100%"
				v-if="customData.shapes[customData.shapeIndex] === 'circle'"
				key="circle"
			></div>
			<div
				class="triangle"
				xyz="fade right-100%"
				v-if="customData.shapes[customData.shapeIndex] === 'triangle'"
				key="triangle"
			></div>
		</XyzTransition>
		<button class="example-button mt-l" @click="changeShape">Click to switch</button>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				shapeIndex: 0,
				shapes: ['square', 'circle', 'triangle'],
			},
		}
	},
	methods: {
		changeShape() {
			this.customData.shapeIndex++
			if (this.customData.shapeIndex === this.customData.shapes.length) {
				this.customData.shapeIndex = 0
			}
		},
	},
}
</script>
