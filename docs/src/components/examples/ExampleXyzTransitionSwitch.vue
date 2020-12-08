<template>
	<div class="example-wrap example-wrap-column">
		<XyzTransition appear mode="out-in" xyz="appear-fade appear-small in-flip-up out-flip-down duration-3 ease-out">
			<div class="square" :key="customData.key">{{ customData.key }}</div>
		</XyzTransition>
		<button @click="customData.key += 1">Click to switch</button>
	</div>
</template>

<script>
import ExampleMixin from './ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				key: 1,
			},
		}
	},
}
</script>
