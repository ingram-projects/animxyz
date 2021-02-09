<template>
	<XyzTransitionGroup appear class="banner">
		<BannerSquare :show="activeSquare === 0" key="0">A</BannerSquare>
		<BannerSquare :show="activeSquare === 1" key="1">n</BannerSquare>
		<BannerSquare :show="activeSquare === 2" key="2">i</BannerSquare>
		<BannerSquare :show="activeSquare === 3" key="3">m</BannerSquare>
		<BannerSquare :show="activeSquare === 4" key="4"><AnimXyzLogo></AnimXyzLogo></BannerSquare>
		<BannerSquare :show="activeSquare === 5" key="5">X</BannerSquare>
		<BannerSquare :show="activeSquare === 6" key="6">Y</BannerSquare>
		<BannerSquare :show="activeSquare === 7" key="7">Z</BannerSquare>
	</XyzTransitionGroup>
</template>

<script>
import AnimXyzLogo from '~/components/reusable/AnimXyzLogo'
import BannerSquare from '~/components/banner/BannerSquare'

export default {
	name: 'Banner',
	components: {
		AnimXyzLogo,
		BannerSquare,
	},
	data() {
		return {
			numSquares: 8,
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
		setInterval(() => {
			this.randomizeSquare()
		}, 3000)
	},
}
</script>

<style lang="scss" scoped>
.banner {
	position: relative;
	width: 100%;
	perspective: 1000px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);

	@include media('<phone') {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-auto-flow: column;
	}
}

.banner-square {
	color: #{primary-color(700)};
	&:nth-child(6) {
		color: #{$red};
	}
	&:nth-child(7) {
		color: #{$yellow};
	}
	&:nth-child(8) {
		color: #{$green};
	}

	font-size: 12vw;
	@include media('<phone') {
		font-size: 20vw;
	}
	@include media('>=laptop') {
		font-size: 8rem;
	}
}

.animxyz-logo {
	--logo-size: 0.6em;
}
</style>
