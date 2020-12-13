<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear mode="out-in">
			<div class="square" xyz="fade left-100" v-if="customData.shape === 'square'" key="square"></div>
			<div class="circle" xyz="fade up-100" v-if="customData.shape === 'circle'" key="circle"></div>
			<div class="triangle" xyz="fade right-100" v-if="customData.shape === 'triangle'" key="triangle"></div>
		</XyzTransition>
		<button
			class="example-button mt-l"
			@click="customData.shape = ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)]"
		>
			Click to switch
		</button>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				shape: 'square',
			},
		}
	},
}
</script>
