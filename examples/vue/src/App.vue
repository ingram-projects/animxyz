<template>
	<div>
		<xyz-transition-group appear xyz="fade down duration-10 stagger">
			<div v-for="index in 5" :key="index">Hello</div>
		</xyz-transition-group>

		<xyz-transition appear mode="out-in" xyz="fade turn-ccw duration-10" v-xyz="['big-100']">
			<button v-if="!toggled" @click="toggle" key="untoggle">Toggle</button>
			<button v-if="toggled" @click="toggle" key="toggle">Untoggle</button>
		</xyz-transition>

		<xyz-transition-visible v-for="index in 100" xyz="fade turn-ccw duration-10" v-xyz="['big-100']" :key="index">
			<div>Visible</div>
		</xyz-transition-visible>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			toggled: false,
		}
	},
	methods: {
		toggle() {
			this.toggled = !this.toggled
		},
	},
}
</script>

<style lang="scss"></style>
