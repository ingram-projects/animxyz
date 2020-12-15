<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear xyz="fade" v-xyz="customData.xyzUtilities" v-on="data.listeners">
			<div class="square" v-if="data.toggled"></div>
		</XyzTransition>
		<label class="example-checkbox mt-l">
			<input type="checkbox" v-model="customData.xyzUtilities['down']" />
			down
		</label>
		<label class="example-checkbox mt-l">
			<input type="checkbox" v-model="customData.xyzUtilities['small']" />
			small
		</label>
		<label class="example-checkbox mt-l">
			<input type="checkbox" v-model="customData.xyzUtilities['rotate-right']" />
			rotate-right
		</label>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

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
