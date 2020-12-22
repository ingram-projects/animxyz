<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup appear class="chat-list" xyz="fade duration-3 appear-front-3">
			<div class="chat-item" v-for="chatText in customData.chatTexts" :key="chatText">{{chatText}}</div>
		</XyzTransitionGroup>
		<div class="flex-col mt-l">
			<label for="numCatsInput" class="example-input-label mb-xxs">Say Something!</label>
			<input id="chatListInput" class="example-input chat-input" />
		</div>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {
				chatTexts: ['Hello world!'],
			},
		}
	},
	watch: {
		'customData.numCats'() {
			if (this.customData.numCats > 15) {
				this.customData.numCats = 15
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.chat-input {
	width: 20rem;
}
</style>
