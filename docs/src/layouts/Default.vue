<template>
	<main class="page-content" :style="{ 'perspective-origin': `50% ${this.scrollCenter}px`}">
		<slot />
	</main>
</template>

<script>
export default {
	data () {
		return {
			scrollCenter: 0,
		}
	},
	methods: {
		onWindowScroll () {
			this.scrollCenter = window.scrollY + window.innerHeight / 2
		},
	},
	mounted() {
		this.onWindowScroll()
		window.addEventListener('scroll', this.onWindowScroll)
	},
	beforeDestroy () {
		window.removeEventListener('scroll', this.onWindowScroll)
	},
}
</script>

<style lang="scss" scoped>
.page-content {
	perspective: 400px;
}
</style>
