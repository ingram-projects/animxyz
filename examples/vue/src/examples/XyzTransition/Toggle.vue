<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear xyz="fade rotate-right ease-out-back">
			<div class="square" v-if="buttonToggled"></div>
		</XyzTransition>
		<button class="example-button mt-l" @click="buttonToggled = !buttonToggled">Click to toggle</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			buttonToggled: true,
		}
	},
}
</script>
