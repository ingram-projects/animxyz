<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup appear class="square-grid square-grid-10" v-on="data.listeners">
			<div
				class="square"
				xyz="fade"
				v-xyz="{
					'down right in-stagger-1': index < 50,
					'up left in-stagger-rev-1': index >= 50,
					'small-100': index % 2,
					'rotate-right': index % 3,
					'flip-up': index % 5,
				}"
				v-if="data.toggled"
				v-for="index in 100"
				:key="index"
			></div>
		</XyzTransitionGroup>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

export default {
	mixins: [ExampleMixin],
}
</script>
