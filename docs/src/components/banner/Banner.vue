<template>
	<xyz-transition-group tag="div" appear class="banner">
		<banner-square v-for="index in numSquares" :show="activeSquare === index - 1" :key="index"></banner-square>
	</xyz-transition-group>
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
	perspective: 400px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);

	@include media('<phone') {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-auto-flow: column;
	}
}

@mixin banner-square-letter($n, $letter, $color: primary-color(700)) {
	&:nth-child(#{$n}) {
		&::before {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			content: $letter;
			color: $color;
		}
	}
}

.banner-square {
	font-size: 12vw;
	font-family: $font-stack-mono;

	@include banner-square-letter(1, 'A');
	@include banner-square-letter(2, 'n');
	@include banner-square-letter(3, 'i');
	@include banner-square-letter(4, 'm');
	@include banner-square-letter(6, 'X', $red);
	@include banner-square-letter(7, 'Y', $yellow);
	@include banner-square-letter(8, 'Z', $green);

	@include media('>=laptop') {
		font-size: 8rem;
	}

	@include media('<phone') {
		font-size: 16vw;
	}
}
</style>
