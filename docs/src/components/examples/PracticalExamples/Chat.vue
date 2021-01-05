<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup appear tag="ul" class="chat-list list--no-style" duration="auto">
			<li
				class="chat-item"
				:class="{ 'chat-item--user': chatMessage.isUser }"
				v-for="chatMessage in customData.chatMessages"
				:key="chatMessage.timestamp"
				xyz="duration-10 fade appear-front-3 ease-out-back appear-left-0"
				v-xyz="{ left: !chatMessage.isUser, right: chatMessage.isUser }"
			>
				<div class="chat-avatar xyz-nested" xyz="fade small in-delay-3">{{ chatMessage.isUser ? '🐤' : '🐔' }}</div>
				{{ chatMessage.text }}
			</li>
		</XyzTransitionGroup>
		<div class="flex-col mt-l">
			<label for="chatListInput" class="example-input-label mb-xxs">Say Something!</label>
			<input
				id="chatListInput"
				class="example-input chat-input"
				v-model="customData.userMessage"
				@keydown.enter="sendMessage"
			/>
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
				chatMessages: [],
				userMessage: '',
			},
			possibleReplies: ['Elements go brrrrrrrr!', 'I like chimichangas.', '🟦 🌀 🔷'],
			replyTimeout: null,
		}
	},
	methods: {
		addMessage(text, isUser = false) {
			this.customData.chatMessages.push({
				text,
				isUser,
				timestamp: Date.now(),
			})
			if (this.customData.chatMessages.length > 6) {
				this.customData.chatMessages.shift()
			}
		},
		sendMessage() {
			this.addMessage(this.customData.userMessage, true)
			this.customData.userMessage = ''
			this.sendReplyMessage()
		},
		sendReplyMessage() {
			clearTimeout(this.replyTimeout)
			this.replyTimeout = setTimeout(() => {
				const replyMessage = this.possibleReplies[Math.floor(Math.random() * this.possibleReplies.length)]
				this.addMessage(replyMessage)
			}, 300 + Math.random() * 300)
		},
	},
	created() {
		this.addMessage('Hello I am AnimXYZ.')
	},
	beforeDestroy() {
		clearTimeout(this.replyTimeout)
	},
}
</script>

<style lang="scss" scoped>
.chat-input {
	width: 20rem;
}

.chat-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	width: 28rem;
	max-width: 100%;
	overflow-y: hidden;
	max-height: 18.5rem;
	padding: 0 $sp-xl;
}

.chat-item {
	position: relative;
	color: primary-color(100);
	font-weight: 500;
	background-color: primary-color(800, 0.5);
	padding: $sp-xxs $sp-xs;
	border-radius: $br-l;
	border-bottom-left-radius: 0;
	box-shadow: inset 0 0 0 2px primary-color(700);
	margin: $sp-s 0;

	&::before {
		content: '';
		position: absolute;
		right: 100%;
		bottom: 0;
		border: 0.25rem solid transparent;
		border-bottom: 0.25rem solid primary-color(700);
		border-right: 0.25rem solid primary-color(700);
	}

	.chat-avatar {
		font-size: $fs-l;
		display: flex;
		align-items: center;
		justify-content: center;
		@include circle(1.75rem);
		background-color: primary-color(700);
		position: absolute;
		right: 100%;
		bottom: 0;
		margin-right: 0.75rem;
		margin-bottom: -0.875rem;
	}
}

.chat-item--user {
	margin-left: auto;
	border-radius: $br-l;
	border-bottom-right-radius: 0;
	background-color: transparentize($cyan, 0.85);
	color: $cyan;
	box-shadow: inset 0 0 0 2px $cyan;

	&::before {
		right: initial;
		left: 100%;
		border: 0.25rem solid transparent;
		border-bottom: 0.25rem solid $cyan;
		border-left: 0.25rem solid $cyan;
	}

	.chat-avatar {
		right: initial;
		left: 100%;
		margin-right: 0;
		margin-left: 0.75rem;
	}
}
</style>
