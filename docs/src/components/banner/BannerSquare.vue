<template>
	<div class="banner-square" xyz="appear-duration-20 appear-stagger-1 duration-10" v-xyz="xyzClassStrings">
		<xyz-transition :duration="2000">
			<div class="square-anim" v-if="show">
				<p
					class="anim-name xyz-nested"
					:class="[`anim-axis-${getClassAxis(xyzClass)}`]"
					xyz="fade in-left in-delay-5 in-stagger"
					v-for="xyzClass in xyzClasses"
					:key="xyzClass"
				>
					{{ xyzClass.string }}
				</p>
			</div>
		</xyz-transition>
	</div>
</template>

<script>
import { xyzUtilityClasses, getXyzUtilityClass, randomArrayItem } from '~/utils'

const translateXClasses = xyzUtilityClasses.filter((xyzClass) => {
	return xyzClass.type === 'translate' &&  xyzClass.axis === 'x'
})

const translateYClasses = xyzUtilityClasses.filter((xyzClass) => {
	return xyzClass.type === 'translate' &&  xyzClass.axis === 'y'
})

const translateZClasses = xyzUtilityClasses.filter((xyzClass) => {
	return xyzClass.type === 'translate' &&  xyzClass.axis === 'z'
})

const scaleClasses = xyzUtilityClasses.filter((xyzClass) => {
	return xyzClass.type === 'scale' && xyzClass.axis !== 'z'
})

const rotateClasses = xyzUtilityClasses.filter((xyzClass) => {
	return xyzClass.type === 'rotate'
})

export default {
	name: 'BannerSquare',
	props: ['show'],
	data() {
		return {
			numXyzClasses: 2,
			xyzClasses: [],
		}
	},
	computed: {
		xyzClassStrings() {
			return this.xyzClasses.map((xyzClass) => xyzClass.string)
		}
	},
	watch: {
		show() {
			if (this.show) {
				this.randomizeXyz()
			}
		},
	},
	methods: {
		getClassAxis(xyzClass) {
			if (xyzClass.axis) {
				return xyzClass.axis
			}
			return 'none'
		},
		randomizeXyz() {
			this.xyzClasses = [getXyzUtilityClass('fade')]

			const xyzTranslateClassSelection = [
				randomArrayItem(translateXClasses),
				randomArrayItem(translateYClasses),
				randomArrayItem(translateZClasses),
				randomArrayItem(scaleClasses),
				randomArrayItem(rotateClasses)
			]

			for (let i = 0; i < this.numXyzClasses; i++) {
				const xyzClassIndex = Math.floor(Math.random() * xyzTranslateClassSelection.length)
				const [xyzClass] = xyzTranslateClassSelection.splice(xyzClassIndex, 1)
				const xyzClassLevel = randomArrayItem(Object.keys(xyzClass.utilityMap).filter((level) => level !== '0'))
				this.xyzClasses.push(getXyzUtilityClass(xyzClass.name, xyzClassLevel))
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
		font-size: 1.5rem;
	}
}

.anim-axis-x {
	color: $red;
}

.anim-axis-y {
	color: $yellow;
}

.anim-axis-z {
	color: $green;
}

.anim-axis-all, .anim-axis-none {
	color: $cyan;
}
</style>
