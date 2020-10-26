<template>
	<div class="modifiers-presets">
		<ul class="presets-list">
			<li class="preset-item__wrap" v-for="preset in presets" :key="preset.title">
				<a class="preset-item">
					<div class="preset-title">{{preset.title}}</div>
					<div class="square" v-xyz="preset.utilities" :style="preset.variables"></div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'XyzModifiersPresets',
	props: ['presets'],
}
</script>

<style lang="scss" scoped>
.modifiers-presets {
	background-color: primary-color(900);
}

.presets-list {
	padding: $sp-m;
	padding-right: 0;
	overflow-x: auto;
	display: flex;
	list-style: none;
}

.preset-item__wrap {
	padding-right: $sp-m;
}

.preset-item {
	position: relative;
	cursor: pointer;
	display: flex;
	flex-shrink: 0;
	height: 12rem;
	width: 16rem;
	box-shadow: inset 0 0 0 2px primary-color(800);
	border-radius: $br-xl;
	transition: box-shadow 0.2s $ease-in-out;

	.square {
		@include size(4rem);
		margin: auto;
		background-color: primary-color(200, 0.65);
		transition: background-color 0.2s $ease-in-out;
	}

	&:hover,
	&.active {
		box-shadow: inset 0 0 0 4px primary-color(700);

		.preset-title {
			color: primary-color(100);
		}

		.square {
			background-color: $cyan;
		}
	}
}

.preset-title {
	position: absolute;
	font-family: $font-stack-mono;
	top: $sp-xs;
	left: $sp-xs;
	color: primary-color(300);
	transition: color 0.2s $ease-in-out;
}
</style>
