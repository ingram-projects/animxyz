<template>
	<div class="wrapper">
		<banner-square v-for="index in numSquares" :show="activeSquare === index - 1" :key="index"></banner-square>
	</div>
</template>

<script>
import BannerSquare from '~/components/banner/BannerSquare'

export default {
	name: 'Banner',
	components: {
		BannerSquare,
	},
	data() {
		return {
			numSquares: 12,
			activeSquare: null,
		}
	},
	methods: {
		randomizeSquare() {
			const oldActiveSquare = this.activeSquare
			while (this.activeSquare === oldActiveSquare) {
				this.activeSquare = Math.floor(Math.random() * this.numSquares)
			}
		},
	},
	created() {
		this.randomizeSquare()
		setInterval(() => {
			this.randomizeSquare()
		}, 3000)
	},
}
</script>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	flex-wrap: wrap;
	perspective: 500px;
}
</style>
