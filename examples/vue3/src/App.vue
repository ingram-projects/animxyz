<template>
	<XyzTransitionGroup class="example-list" appear-visible xyz="fade small delay-1">
		<div class="example-item" v-for="example in examples" :key="example">
			<h1 class="example-title mb-s">{{ example }}</h1>
			<div class="example-content">
				<component :is="example"></component>
			</div>
		</div>
	</XyzTransitionGroup>
</template>

<script>
import examples from './examples'

export default {
	name: 'App',
	components: examples,
	data() {
		return {
			examples: Object.keys(examples),
		}
	},
}
</script>

<style lang="scss" scoped>
.example-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

.example-item {
	min-height: 400px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: $sp-s;
	border: 1px solid primary-color(800);
}

.example-title {
	text-align: center;
	font-size: $fs-xl;
	color: primary-color(50);
}

.example-content {
	flex-grow: 1;
	display: flex;
}
</style>
