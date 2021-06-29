<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			class="example-grid"
			appear
			duration="auto"
			v-on="data.listeners"
			xyz="in-duration-10 out-duration-3 fade rotate-right-3 flip-down origin-bottom stagger-1 out-stagger-rev"
		>
			<!-- eslint-disable -->
			<div
				class="square"
				:class="{ 'xyz-paused': customData.paused }"
				v-for="index in 4"
				v-if="data.toggled"
				:key="index"
			></div>
			<!-- eslint-enable -->
		</XyzTransitionGroup>

		<button class="example-button mt-l" @click="customData.paused = !customData.paused" :disabled="!data.toggled">
			{{ customData.paused ? 'Resume' : 'Pause' }}
		</button>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				paused: false,
			},
		}
	},
}
</script>

<style lang="scss" scoped></style>
