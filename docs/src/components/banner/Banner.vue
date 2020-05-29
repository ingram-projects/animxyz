<template>
	<div class="banner-wrap">
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
.banner-wrap {
	position: relative;
	max-width: 1000px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3);
	perspective: 500px;

	@include media('<phone') {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4);
	}
}
</style>
