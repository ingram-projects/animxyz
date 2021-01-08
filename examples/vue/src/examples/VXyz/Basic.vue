<template>
	<div class="example-wrap flex-col">
		<XyzTransition xyz="fade duration-10" v-xyz="customData.xyzUtilities" v-on="data.listeners">
			<div class="square" v-xyz-visible="data.toggled"></div>
		</XyzTransition>
		<div class="flex-row mt-l">
			<label class="example-checkbox mt-l">
				<input type="checkbox" v-model="customData.xyzUtilities['down']" />
				<span>down</span>
			</label>
			<label class="example-checkbox mt-l">
				<input type="checkbox" v-model="customData.xyzUtilities['small']" />
				<span>small</span>
			</label>
			<label class="example-checkbox mt-l">
				<input type="checkbox" v-model="customData.xyzUtilities['rotate-right']" />
				<span>rotate-right</span>
			</label>
		</div>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				xyzUtilities: {
					down: false,
					small: false,
					rotate: false,
				},
			},
		}
	},
}
</script>
