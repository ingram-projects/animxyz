<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			appear
			duration="auto"
			class="example-grid"
			xyz="fade flip-left origin-left duration-3 appear-stagger"
		>
			<div class="item-block" v-for="index in customData.numElements" :key="index">
				<div class="square xyz-nested" xyz="fade small stagger" v-for="subIndex in 4" :key="subIndex"></div>
			</div>
		</XyzTransitionGroup>
		<div class="flex-row">
			<button class="example-button mt-l" @click="addElement">Add Element</button>
			<button class="example-button mt-l" @click="removeElement">Remove Element</button>
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
