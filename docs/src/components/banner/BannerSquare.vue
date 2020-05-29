<template>
	<div class="banner-square" xyz="duration-10" v-xyz="xyzModes">
		<xyz-transition :duration="2000">
			<div class="square-anim" v-if="show">
				<p
					class="square-anim-mode xyz-nested"
					xyz="fade in-down in-delay-5 in-stagger"
					v-for="xyzMode in xyzModes"
					:key="xyzMode"
				>
					{{ xyzMode }}
				</p>
			</div>
		</xyz-transition>
	</div>
</template>

<script>
import { randomArrayItem } from '~/utils'

const translationXYValues = ['25', '50', '75', '100']
const translationZValues = ['3', '4', '5']
const scaleValues = ['25', '50', '75', '100']
const rotationValues = ['25', '50', '75', '100']

const xModes = ['left', 'right']
const yModes = ['up', 'down']
const zModes = ['front', 'back']
const scaleModes = ['big', 'small', 'wide', 'narrow', 'tall', 'short']
const rotationModes = ['turn-cw', 'turn-ccw', 'flip-left', 'flip-right', 'flip-up', 'flip-down']

export default {
	name: 'BannerSquare',
	props: ['show'],
	data() {
		return {
			numXyzModes: 2,
			xyzModes: null,
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
		randomizeXyz() {
			this.xyzModes = ['fade']

			const xMode = `${randomArrayItem(xModes)}-${randomArrayItem(translationXYValues)}`
			const yMode = `${randomArrayItem(yModes)}-${randomArrayItem(translationXYValues)}`
			const zMode = `${randomArrayItem(zModes)}-${randomArrayItem(translationZValues)}`
			const scaleMode = `${randomArrayItem(scaleModes)}-${randomArrayItem(scaleValues)}`
			const rotationMode = `${randomArrayItem(rotationModes)}-${randomArrayItem(rotationValues)}`

			const modes = [xMode, yMode, zMode, scaleMode, rotationMode]
			for (let i = 0; i < this.numXyzModes; i++) {
				const modeIndex = Math.floor(Math.random() * modes.length)
				const mode = modes.splice(modeIndex, 1)
				this.xyzModes.push(...mode)
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
	box-shadow: inset -2px -2px 1px rgba(255, 255, 255, 0.5), inset 2px 2px 1px rgba(23, 28, 51, 0.05);
}

.square-anim {
	@include size(100%);
	position: absolute;
	top: 0;
	left: 0;
	background-color: $blue900;
	z-index: 1;
	display: flex;
	flex-direction: column;
	color: $white;
	font-family: $font-stack-mono;

	font-size: 2.5vw;
	padding: 1em;

	.square-anim-mode + .square-anim-mode {
		margin-top: 0.75em;
	}

	@include media('<phone') {
		font-size: 4vw;
	}

	@include media('>=laptop') {
		font-size: 1.5rem;
	}
}
</style>
