<template>
	<div class="banner-square" xyz="appear-duration-20 appear-stagger-1 duration-10" v-xyz="xyzModes">
		<xyz-transition :duration="2000">
			<div class="square-anim" v-if="show">
				<p
					class="square-anim-mode xyz-nested"
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

function generateMode(modeList, valueList) {
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
		randomizeXyz() {
			this.xyzModes = ['fade']

			const txMode = generateMode(['left', 'right'], allValues)
			const tyMode = generateMode(['up', 'down'], allValues)
			const tzMode = generateMode(['front', 'back'], absoluteValues)
			const scaleMode = generateMode(['big', 'small', 'wide', 'narrow', 'tall', 'short'], allValues)
			const rotationMode = generateMode(
				['turn-cw', 'turn-ccw', 'flip-left', 'flip-right', 'flip-up', 'flip-down'],
				allValues
			)

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
