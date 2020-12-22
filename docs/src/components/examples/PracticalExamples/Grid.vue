<template>
	<div class="example-wrap flex-col">
		<XyzTransitionGroup
			appear
			class="square-grid cat-grid"
			xyz="fade duration-5 appear-front-3 small-3 appear-small-0 stagger-2"
		>
			<div class="square" v-for="index in customData.numCats" :key="index">
				<img
					class="square-image image-filter-mono"
					:src="`https://cataas.com/cat?type=sm?id=${index}`"
					alt="Picture of a cat"
				/>
			</div>
		</XyzTransitionGroup>
		<div class="flex-row align-center mt-l">
			<label for="numCatsInput" class="example-input-label">Number of Cats</label>
			<input id="numCatsInput" type="number" class="example-input" v-model.number="customData.numCats" />
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
				numCats: 15,
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
.cat-grid {
	--grid-columns: auto-fill;
	--grid-square-size: 8rem;

	gap: $sp-xxs;

	@include media('<phone') {
		--grid-square-size: 5.5rem;
	}
}
</style>
