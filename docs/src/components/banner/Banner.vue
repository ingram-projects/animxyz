<template>
	<xyz-transition-group appear class="banner" tag="div">
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
		initMediaQuery() {
			const mediaQuery = window.matchMedia('(min-width: 540px)')
			const onMediaQuery = (mq) => {
				if (mq.matches) {
					this.numSquares = 8
				} else {
					this.numSquares = 12
				}
			}
			onMediaQuery(mediaQuery)
			mediaQuery.addListener(onMediaQuery)
		},
		randomizeSquare() {
			const oldActiveSquare = this.activeSquare
			while (this.activeSquare === oldActiveSquare) {
				this.activeSquare = Math.floor(Math.random() * this.numSquares)
			}
		},
	},
	created() {
		this.initMediaQuery()
		setInterval(() => {
			this.randomizeSquare()
		}, 3000)
	},
}
</script>

<style lang="scss" scoped>
.banner {
	position: relative;
	max-width: 60rem;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);

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
	font-size: 11vw;
	font-family: $font-stack-mono;

	@include media('<phone') {
		font-size: 14vw;
	}

	@include media('>=laptop') {
		font-size: 7rem;
	}
}

@mixin banner-square-letter($n, $letter, $color: primary-color(700)) {
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
	@include banner-square-letter(6, 'X', $red);
	@include banner-square-letter(7, 'Y', $yellow);
	@include banner-square-letter(8, 'Z', $green);
}
</style>
