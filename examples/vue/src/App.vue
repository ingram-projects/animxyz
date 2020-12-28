<template>
	<div>
		<XyzTransitionGroup appear xyz="fade down duration-10 stagger">
			<div v-for="index in 5" :key="index">Hello</div>
		</XyzTransitionGroup>

		<XyzTransition appear mode="out-in" xyz="fade rotate-right duration-10" v-xyz="['big-100%']">
			<button @click="randomState" :key="switchState">State {{ switchState }}</button>
		</XyzTransition>
	</div>
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
