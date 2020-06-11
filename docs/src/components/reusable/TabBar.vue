<template>
	<div class="tab-bar">
		<div
			class="tab-bar__pill"
			:class="[`tab-direction--${direction}`]"
			:style="{
				left: `${position.left}px`,
				right: `${position.right}px`,
				top: `${position.top}px`,
				height: `${position.height}px`,
			}"
			v-if="position"
		></div>
		<button
			type="button"
			class="tab-bar__tab"
			:class="{ active: tab.name === value }"
			@click="setTab(tab)"
			:ref="tab.name === value && 'activeTab'"
		>
			{{ tab.title }}
		</button>
	</div>
</template>

<script>
export default {
	name: 'TabBar',
	props: ['value', 'tabs'],
	data() {
		return {
			position: null,
			direction: 'right',
		}
	},
	watch: {
		value() {
			this.$nextTick(() => {
				this.getPositions()
			})
		},
	},
	methods: {
		getPositions() {
			if (this.$refs.activeTab) {
				const activeTabEl = this.$refs.activeTab.$el
				if (this.position && activeTabEl.offsetLeft > this.position.left) {
					this.direction = 'right'
				} else {
					this.direction = 'left'
				}
				this.position = {
					left: activeTabEl.offsetLeft,
					right: this.$parent.$el.offsetWidth - activeTabEl.offsetWidth - activeTabEl.offsetLeft,
					top: activeTabEl.offsetTop,
					height: activeTabEl.offsetHeight,
				}
			}
		},
	},
	mounted() {
		this.getPositions()
		window.addEventListener('resize', this.getPositions)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getPositions)
	},
}
</script>

<style lang="scss" scoped>
.tab-bar {
}

.tab-bar__tab {
	.active {
	}
}

.tab-bar__pill {
	position: absolute;
	box-shadow: 0 0 4px theme-color(900, 0.25), 0 2px 12px theme-color(800, 0.4);
	background-color: white;
	border-radius: 1rem;
	transition: left 0.2s $ease-in-out-quad 0.06s, right 0.2s $ease-in-out-quad;

	&.tab-direction--left {
		transition: left 0.2s $ease-in-out-quad, right 0.2s $ease-in-out-quad 0.06s;
	}
}
</style>
