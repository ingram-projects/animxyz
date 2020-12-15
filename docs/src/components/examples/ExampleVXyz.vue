<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			appear
			class="square-grid square-grid-10"
			style="--xyz-appear-stagger: 0.025s"
			v-on="data.listeners"
		>
			<div class="square" v-if="data.toggled" v-for="index in 100" :key="index"></div>
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
