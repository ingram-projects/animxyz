<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear duration="auto" xyz="fade up-100% duration-10">
			<div class="item-block" v-show="customData.buttonToggled">
				<div class="square xyz-nested" xyz="fade small stagger" v-for="index in 4" :key="index"></div>
			</div>
		</XyzTransition>
		<button class="example-button mt-l" @click="customData.buttonToggled = !customData.buttonToggled">
			Click to toggle
		</button>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

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
