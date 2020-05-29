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
	max-width: 60rem;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	perspective: 500px;

	@include media('<phone') {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-auto-flow: column;
	}
}

%banner-square-letter {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 10vw;
	font-family: $font-stack-mono;

	@include media('>=laptop') {
		font-size: 6.5rem;
	}
}

@mixin banner-square-letter($n, $letter, $color: $blue700) {
	&:nth-child(#{$n}) {
		&::before {
			@extend %banner-square-letter;
			content: $letter;
			color: $color;
		}
	}
}

.banner-square {
	@include banner-square-letter(1, 'A');
	@include banner-square-letter(2, 'n');
	@include banner-square-letter(3, 'i');
	@include banner-square-letter(4, 'm');

	@include banner-square-letter(6, 'X', #eb5757);
	@include banner-square-letter(7, 'Y', #f2c94c);
	@include banner-square-letter(8, 'Z', #6fcf97);
}
</style>
