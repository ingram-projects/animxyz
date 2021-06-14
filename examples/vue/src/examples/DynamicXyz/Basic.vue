<template>
	<div class="example-wrap flex-col">
		<XyzTransition xyz="fade duration-10" v-xyz="xyzUtilities" v-on="data.listeners">
			<div class="square" v-if="data.toggled"></div>
		</XyzTransition>
		<div class="flex-row mt-l">
			<label class="example-checkbox mt-l">
				<input type="checkbox" v-model="xyzUtilities['down']" />
				<span>down</span>
			</label>
			<label class="example-checkbox mt-l">
				<input type="checkbox" v-model="xyzUtilities['small']" />
				<span>small</span>
			</label>
			<label class="example-checkbox mt-l">
				<input type="checkbox" v-model="xyzUtilities['rotate-right']" />
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
			xyzUtilities: {
				down: false,
				small: false,
				'rotate-right': false,
			},
		}
	},
}
</script>
