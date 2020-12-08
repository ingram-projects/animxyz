<template>
	<div class="example-wrap example-wrap-column">
		<XyzTransition appear xyz="fade rotate-right ease-out-back appear-duration-10">
			<div class="square" v-show="customData.buttonToggled"></div>
		</XyzTransition>
		<button @click="customData.buttonToggled = !customData.buttonToggled">Click to toggle</button>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				buttonToggled: true,
			},
		}
	},
}
</script>
