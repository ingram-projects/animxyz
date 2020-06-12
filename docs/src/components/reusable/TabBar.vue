<template>
	<div class="tab-bar">
		<button
			type="button"
			class="tab-bar__tab"
			:class="{ active: tab === value }"
			v-for="tab in tabs"
			:ref="tab === value && 'activeTab'"
			:key="tab.name"
			@click="setTab(tab)"
		>
			{{ tab.title }}
		</button>
	</div>
</template>

<script>
export default {
	name: 'TabBar',
	props: ['value', 'tabs'],
	methods: {
		setTab(tab) {
			this.$emit('input', tab)
		},
	},
}
</script>

<style lang="scss" scoped>
.tab-bar {
	padding: $spacing-s;
	padding-bottom: 0;
	font-family: $font-stack-mono;
	font-weight: bold;
	display: flex;
	justify-content: space-around;
}

.tab-bar__tab {
	padding: $spacing-xxxs 0;
	color: primary-color(50);
	transition: color 0.2s $ease-in-out;

	&:not(:last-child) {
		margin-right: $spacing-xs;
	}

	&.active {
		color: $cyan;
		margin-bottom: -2px;
		border-bottom: 2px solid $cyan;
	}
}
</style>
