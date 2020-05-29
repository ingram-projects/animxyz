<template>
	<div class="banner-square" xyz="appear-duration-20 appear-stagger-1 duration-10" v-xyz="xyzModes">
		<xyz-transition :duration="2000">
			<div class="square-anim" v-if="show">
				<p
					class="square-anim-mode xyz-nested"
					:class="[`mode-${getModeType(xyzMode)}`]"
					xyz="fade in-left in-delay-5 in-stagger"
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

const absoluteValues = ['3', '4', '5']
const percentValues = ['25', '50', '75', '100']
const allValues = [...absoluteValues, ...percentValues]

const fadeModes = {
	misc: 'fade',
}

const translateModes = {
	x: ['left', 'right'],
	y: ['up', 'down'],
	z: ['front', 'back'],
}

const scaleModes = {
	misc: ['small', 'big'],
	x: ['narrow', 'wide'],
	y: ['short', 'tall'],
	z: ['thin', 'thick'],
}

const rotationModes = {
	x: ['flip-up', 'flip-down'],
	y: ['flip-left', 'flip-right'],
	z: ['turn-cw', 'turn-ccw'],
}

function getRandomMode(modeList, valueList) {
	return `${randomArrayItem(modeList)}-${randomArrayItem(valueList)}`
}

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
		getModeType(mode) {
			return mode
		},
		randomizeXyz() {
			this.xyzModes = [fadeModes.misc]

			const txMode = getRandomMode(translateModes.x, allValues)
			const tyMode = getRandomMode(translateModes.y, allValues)
			const tzMode = getRandomMode(translateModes.z, absoluteValues)
			const scaleMode = getRandomMode([...scaleModes.misc, ...scaleModes.x, ...scaleModes.y], allValues)
			const rotationMode = getRandomMode([...rotationModes.x, ...rotationModes.y, ...rotationModes.z], allValues)

			const modes = [txMode, tyMode, tzMode, scaleMode, rotationMode]
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
