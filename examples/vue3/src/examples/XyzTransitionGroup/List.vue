<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup appear class="example-grid" xyz="fade small out-down out-rotate-right appear-stagger">
			<div class="square" v-for="index in numElements" :key="index"></div>
		</XyzTransitionGroup>
		<div class="flex-row">
			<button class="example-button mt-l" @click="addElement">Add Element</button>
			<button class="example-button mt-l" @click="removeElement">Remove Element</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			numElements: 3,
		}
	},
	methods: {
		addElement() {
			this.numElements += 1
		},
		removeElement() {
			if (this.numElements > 0) {
				this.numElements -= 1
			}
		},
	},
}
</script>
