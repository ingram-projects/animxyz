<template>
	<div class="example-wrap example-wrap-column">
		<XyzTransition mode="out-in" xyz="in-flip-up out-flip-down ease-out">
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
