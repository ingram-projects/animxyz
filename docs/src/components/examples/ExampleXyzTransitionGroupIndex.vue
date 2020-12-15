<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup appear class="square-row" xyz="fade appear-stagger small out-down out-rotate-right">
			<div class="square" v-for="index in customData.numElements" :key="index"></div>
		</XyzTransitionGroup>
		<div class="flex-row">
			<button class="example-button mt-l" @click="addElement">Add Element</button>
			<button class="example-button mt-l" @click="removeElement">Remove Element</button>
		</div>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				numElements: 3,
			},
		}
	},
	methods: {
		addElement() {
			this.customData.numElements += 1
		},
		removeElement() {
			if (this.customData.numElements > 0) {
				this.customData.numElements -= 1
			}
		},
	},
}
</script>
