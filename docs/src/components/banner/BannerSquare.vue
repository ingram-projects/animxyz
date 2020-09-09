<template>
	<div class="banner-square" xyz="appear-duration-20 appear-stagger-1 duration-10" v-xyz="xyzUtilityStrings">
		<xyz-transition duration="auto">
			<div class="square-anim" v-if="show">
				<p
					class="anim-name xyz-nested"
					:class="[`color-axis-${getUtilityAxis(xyzUtility)}`]"
					xyz="fade in-left in-delay-5 in-stagger"
					v-for="xyzUtility in xyzUtilities"
					:key="xyzUtility.string"
				>
					{{ xyzUtility.string }}
				</p>
			</div>
		</xyz-transition>
	</div>
</template>

<script>
import { xyzUtilities, getXyzUtility, randomArrayItem } from '~/utils'

const translateXClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'translate' && xyzUtility.axis === 'x'
})

const translateYClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'translate' && xyzUtility.axis === 'y'
})

const translateZClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'translate' && xyzUtility.axis === 'z'
})

const scaleXClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'scale' && xyzUtility.axis === 'x'
})

const scaleYClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'scale' && xyzUtility.axis === 'y'
})

const scaleAllClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'scale' && xyzUtility.axis === 'all'
})

const rotateXClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'rotate' && xyzUtility.axis === 'x'
})

const rotateYClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'rotate' && xyzUtility.axis === 'y'
})

const rotateZClasses = xyzUtilities.filter((xyzUtility) => {
	return xyzUtility.type === 'rotate' && xyzUtility.axis === 'z'
})

export default {
	name: 'BannerSquare',
	props: ['show'],
	data() {
		return {
			numXyzClasses: 2,
			xyzUtilities: [],
		}
	},
	computed: {
		xyzUtilityStrings() {
			return this.xyzUtilities.map((xyzUtility) => xyzUtility.string)
		},
	},
	watch: {
		show() {
			if (this.show) {
				this.randomizeXyz()
			}
		},
	},
	methods: {
		getUtilityAxis(xyzUtility) {
			if (xyzUtility.axis) {
				return xyzUtility.axis
			}
			return 'none'
		},
		randomizeXyz() {
			this.xyzUtilities = [getXyzUtility('fade')]

			for (let i=0; i < this.numXyzClasses; i++) {
				const randomUtility = randomArrayItem(xyzUtilities)
			}

			const xyzUtilitySelection = [
				randomArrayItem(translateXClasses),
				randomArrayItem(translateYClasses),
				randomArrayItem(translateZClasses),
				randomArrayItem(scaleXClasses),
				randomArrayItem(scaleYClasses),
				randomArrayItem(scaleAllClasses),
				randomArrayItem(rotateXClasses),
				randomArrayItem(rotateYClasses),
				randomArrayItem(rotateZClasses),
			]

			for (let i = 0; i < this.numXyzClasses; i++) {
				const xyzUtilityIndex = Math.floor(Math.random() * xyzUtilitySelection.length)
				const [xyzUtility] = xyzUtilitySelection.splice(xyzUtilityIndex, 1)
				const xyzUtilityLevel = randomArrayItem(Object.keys(xyzUtility.levels).filter((level) => level !== '0'))
				this.xyzUtilities.push(getXyzUtility(xyzUtility.name, xyzUtilityLevel))
			}
		},
	},
	created() {
		this.randomizeXyz()
	},
}
</script>

<style lang="scss" scoped>
.banner-square {
	position: relative;
	width: 100%;
	padding-top: 100%;
}

.square-anim {
	@include size(100%);
	position: absolute;
	top: 0;
	left: 0;
	background-color: primary-color(900);
	z-index: 1;
	display: flex;
	flex-direction: column;
	color: primary-color(50);
	border-radius: $br-l;
	font-family: $font-stack-mono;

	font-size: 2.5vw;
	padding: 1em;

	.anim-name + .anim-name {
		margin-top: 0.75em;
	}

	@include media('<phone') {
		font-size: 4vw;
	}

	@include media('>=laptop') {
		font-size: 1.25rem;
	}
}
</style>
