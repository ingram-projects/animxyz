<template>
	<div class="example-wrap">
		<XyzTransitionGroup class="example-tab-wrap" appear duration="auto" xyz="fade flip-down origin-bottom stagger">
			<button
				class="example-tab"
				:class="{ active: tab === customData.activeTab }"
				v-for="(tab, index) in customData.tabs"
				:key="index"
				@click="setTab(tab, index)"
			>
				<span class="tab-text">{{ tab }}</span>
			</button>
		</XyzTransitionGroup>
		<XyzTransition
			appear
			xyz="fade duration-10 appear-big"
			v-xyz="{
				'in-left out-right': customData.direction === 'left',
				'in-right out-left': customData.direction === 'right',
			}"
			mode="out-in"
		>
			<div class="tab-contents-wrap" :key="customData.activeTab">
				{{ customData.activeTab }}
				{{ customData.direction }}
			</div>
		</XyzTransition>
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
				oldIndex: 0,
				direction: 'left',
			},
		}
	},
	methods: {
		setTab(tab, index) {
			this.customData.activeTab = tab
			index > this.customData.oldIndex ? (this.customData.direction = 'right') : (this.customData.direction = 'left')
			this.customData.oldIndex = index
		},
	},
}
</script>

<style lang="scss" scoped>
.example-wrap {
	flex-direction: column;
}

.example-tab-wrap {
	display: flex;
}

.example-tab {
	display: block;
	padding: $sp-xxs $sp-xs;
	color: primary-color(100);

	&.active {
		color: $cyan;
	}
}

.tab-contents-wrap {
	border: 2px solid $cyan;
	padding: $sp-l;
	color: $cyan;
	font-size: $fs-xl;
}
</style>
