<template>
	<div>Hello</div>
</template>

<script>
const switchStates = ['one', 'two', 'three', 'four', 'five']

export default {
	name: 'App',
	data() {
		return {
			switchState: switchStates[0],
		}
	},
	methods: {
		randomState() {
			this.switchState = switchStates[Math.floor(Math.random() * switchStates.length)]
		},
	},
}
</script>

<style lang="scss"></style>
