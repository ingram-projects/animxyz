<template>
	<div class="example-wrap">
		<xyz-transition duration="auto" xyz="fade out-delay-5">
			<div class="modal__overlay" v-if="customData.modalToggled" @click.stop="customData.modalToggled = false">
				<div class="modal xyz-nested" xyz="fade short-100 in-delay-3 out-delay-3 ease-out-back">
					<div class="modal__header xyz-nested" xyz="up-100 in-delay-3">
						<h1 class="xyz-nested" xyz="fade left in-delay-5">I am a modal</h1>
						<button
							xyz="fade small in-delay-5"
							class="modal__close xyz-nested"
							@click="customData.modalToggled = false"
						>
							<IconClose></IconClose>
						</button>
					</div>
					<div class="modal__body"></div>
					<div class="modal__footer xyz-nested" xyz="down-100 in-delay-3">
						<button
							class="modal__button xyz-nested"
							xyz="fade in-right in-delay-5"
							@click="customData.modalToggled = false"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</xyz-transition>
		<button class="modal-toggle example-button mt-l" @click="customData.modalToggled = !customData.modalToggled">
			{{ customData.modalToggled ? 'Hide' : 'Show' }} Modal
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
				modalToggled: false,
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.example-wrap {
	perspective: initial;
}

.modal__overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: $sp-l;
	background-color: primary-color(800, 0.5);
	display: flex;
	justify-content: center;
	z-index: 99999999;
}

.modal {
	display: flex;
	flex-direction: column;
	color: $cyan;
	width: 100%;
	max-width: 32rem;
	background-color: primary-color(900);
	border: 4px solid $cyan;
	border-radius: $br-xxl;
	height: 24rem;
	margin: auto;
	overflow: hidden;
}

.modal__header {
	padding: $sp-s;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 4px solid $cyan;

	h1 {
		color: $cyan;
		font-weight: 600;
	}
}

.modal__close {
	--icon-color: #{$cyan};
	@include circle(2rem);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0 0 2px $cyan;
	color: $cyan;
	transition: 0.2s ease-in-out;
	transition-property: background-color, box-shadow;

	svg {
		@include size(.75rem);
		stroke-width: 3px;
		transition: stroke-width 0.2s ease-in-out;
	}

	&:hover {
		background-color: transparentize($cyan, 0.85);
		box-shadow: 0 0 0 4px $cyan;

		svg {
			stroke-width: 4px;
		}
	}
}

.modal__body {
	flex-grow: 1;
}

.modal__footer {
	border-top: 4px solid $cyan;
	padding: $sp-s;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.modal__button {
	background-color: $cyan;
	border-radius: $br-m;
	color: primary-color(900);
	padding: 0 $sp-s;
	height: 2rem;
	font-weight: 700;
}
</style>
