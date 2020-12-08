<template>
	<div class="example-wrap">
		<XyzTransition xyz="fade up flip-up">
			<div class="square" v-show="customData.buttonToggled"></div>
		</XyzTransition>
		<button @click="toggle">Toggle Me</button>
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
	methods: {
		toggle() {
			this.customData.buttonToggled = !this.customData.buttonToggled
		},
	},
}
</script>
