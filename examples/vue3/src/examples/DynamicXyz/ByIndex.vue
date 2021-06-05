<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup class="example-grid example-grid-9" v-on="data.listeners">
			<!-- eslint-disable -->
			<div
				class="square"
				xyz="fade out-small-50% out-duration-30"
				v-xyz="{
					'in-down in-right in-stagger-1': index <= 41,
					'in-up in-left in-stagger-rev-1': index > 41,
					'out-rotate-right-5': index % 2,
					'out-rotate-left-5': (index + 1) % 2,
				}"
				v-if="data.toggled"
				v-for="index in 81"
				:key="index"
			></div>
			<!-- eslint-enable -->
		</XyzTransitionGroup>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
}
</script>
