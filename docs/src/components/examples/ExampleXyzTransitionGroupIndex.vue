<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			appear
			class="square-grid square-grid-10"
			xyz="fade small down"
			:style="{
				'--xyz-appear-stagger': '0.025s',
				'--xyz-in-stagger': '0.025s',
				'--xyz-out-stagger-rev': '0.025s',
			}"
			v-on="data.listeners"
		>
			<div
				class="square"
				v-if="data.toggled"
				v-for="index in 100"
				:key="index"
				:style="{ '--xyz-index-rev': Math.random() * 100 }"
			></div>
		</XyzTransitionGroup>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			math: Math,
		}
	},
}
</script>
