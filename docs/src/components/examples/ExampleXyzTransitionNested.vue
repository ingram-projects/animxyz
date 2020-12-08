<template>
	<div class="example-wrap example-wrap-column">
		<XyzTransition appear duration="auto" xyz="fade up-100 duration-10">
			<div class="square-block" v-show="customData.buttonToggled">
				<div class="square xyz-nested" xyz="fade small stagger" v-for="index in 4" :key="index"></div>
			</div>
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
