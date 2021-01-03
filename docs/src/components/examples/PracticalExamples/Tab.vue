<template>
	<div class="example-wrap">
		<div class="example-tabs-wrap">
			<XyzTransitionGroup
				class="example-tabs"
				appear
				duration="auto"
				xyz="fade flip-down origin-bottom stagger-1 delay-5"
			>
				<button
					class="example-tab"
					:class="{ active: tab === customData.activeTab }"
					v-for="tab in customData.tabs"
					@click="customData.activeTab = tab"
					:key="tab"
				>
					<span class="tab-text">{{ tab }}</span>
				</button>
			</XyzTransitionGroup>

			<div xyz="fade appear-short-100% origin-top ease-in-out duration-7" v-xyz="customData.tabDirectionXyz">
				<XyzTransition appear>
					<div class="example-tab-contents xyz-out-absolute" :key="customData.activeTab">
						<span class="text--x">x</span><span class="text--y">y</span><span class="text--z">z</span>=<span
							class="text--mark"
							>"</span
						><span class="text--value">{{ customData.tabDirectionXyz }}</span
						><span class="text--mark">"</span>
					</div>
				</XyzTransition>
			</div>
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
				tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
				activeTab: 'Tab 1',
			},
		}
	},
	computed: {
		activeTabIndex() {
			return this.customData.tabs.findIndex((tab) => tab === this.customData.activeTab)
		},
	},
	watch: {
		activeTabIndex(newIndex, oldIndex) {
			if (newIndex > oldIndex) {
				this.customData.tabDirectionXyz = 'out-left-100% in-right-100%'
			} else {
				this.customData.tabDirectionXyz = 'out-right-100% in-left-100%'
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.example-tabs-wrap {
	flex-direction: column;
	align-items: flex-start;
	width: 32rem;
	max-width: 100%;
	position: relative;
}

.example-tabs {
	display: flex;
}

.example-tab {
	display: block;
	padding: $sp-xs $sp-s;
	color: primary-color(100);
	font-weight: 640;
	background-color: primary-color(800);
	transition: 0.2s ease-in-out;
	transition-property: background-color, color;

	&:hover,
	&:focus {
		background-color: primary-color(700);
	}

	&:first-child {
		border-top-left-radius: $br-l;
	}

	&:last-child {
		border-top-right-radius: $br-l;
	}

	&.active {
		background-color: $cyan;
		color: primary-color(800);

		&:hover {
			background-color: $cyan;
		}
	}
}

.example-tab-contents {
	left: 0;
	right: 0;
	background-color: primary-color(800, 0.25);
	padding: $sp-l;
	border: 2px solid $cyan;
	border-radius: $br-l;
	border-top-left-radius: 0;
	color: primary-color(400);
	font-family: $font-stack-mono;
	font-weight: bold;
	font-size: $fs-xl;
	line-height: 1.25;

	@include media('<phone') {
		font-size: $fs-l;
	}
}

.text--x {
	color: $red;
}

.text--y {
	color: $yellow;
}

.text--z {
	color: $green;
}

.text--value {
	color: primary-color(200);
}

.text--mark {
	color: $cyan;
}
</style>
