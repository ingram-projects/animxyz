<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			class="example-grid example-grid-9"
			xyz="fade small out-back-5"
			:duration="2500"
			:style="{
				'--xyz-in-stagger': '0.025s',
				'--xyz-out-stagger-rev': '0.025s',
			}"
			v-on="data.listeners"
		>
			<!-- eslint-disable -->
			<div
				class="square"
				v-if="data.toggled"
				v-for="index in 81"
				:key="index"
				:style="{ '--xyz-index-rev': Math.random() * 81 }"
			></div>
			<!-- eslint-enable -->
		</XyzTransitionGroup>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			math: Math,
		}
	},
}
</script>
