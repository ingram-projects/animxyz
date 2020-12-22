<template>
	<div class="example-wrap">
		<xyz-transition-group class="square-grid cat-grid">
			<div class="square" v-for="index in 15" :key="index">
				<img class="square-image" :src="`https://cataas.com/cat?type=sq?id=${index}`" alt="Picture of a cat" />
			</div>
		</xyz-transition-group>
	</div>
</template>

<script>
import ExampleMixin from '../ExampleMixin'

export default {
	mixins: [ExampleMixin],
	data() {
		return {
			customData: {},
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
