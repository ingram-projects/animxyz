<template>
	<div class="example-wrap flex-col">
		<XyzTransition appear duration="auto" xyz="fade up-100% duration-10">
			<div class="item-block" v-show="buttonToggled">
				<div class="square xyz-nested" xyz="fade small stagger" v-for="index in 4" :key="index"></div>
			</div>
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
