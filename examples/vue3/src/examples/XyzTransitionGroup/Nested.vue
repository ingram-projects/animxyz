<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			appear
			duration="auto"
			class="example-grid"
			xyz="fade flip-left origin-left duration-3 appear-stagger"
		>
			<div class="item-block" v-for="index in numElements" :key="index">
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
