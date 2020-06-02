<template>
	<section class="section">
		<div class="section-column example-column">
			<div class="column-content example-content">
				<h1 class="section-title">{{section.title}}</h1>
				<div class="example" v-if="section.examples.length">
					<div class="example-item"></div>
					<!-- {{section.examples[activeExample]}} -->
				</div>
			</div>
		</div>
		<div class="section-column text-column">
			<div class="column-content text-content" v-html="section.content"></div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ContentSection',
	props: ['section'],
	data () {
		return {
			activeExample: 0,
		}
	},
}
</script>

<style lang="scss" scoped>
.section {
	display: flex;
	align-items: flex-start;
	max-width: 80rem;
	margin: $spacing-xxxl auto;
}

.section-column {
	width: 50%;
	padding: $spacing-xs;
}

.column-content {
	margin: 0 auto;
	max-width: 36rem;
}

.section-title {
	text-align: center;
	font-size: $fs-xlarge;
}

.example-column {
	display: flex;
	position: sticky;
	top: 0;
}

.example-content {
	width: 100%;
}

.example {
	display: flex;
	min-height: 14rem;
}

.text-column {
	p {
		font-size: 1.125rem;
	}
}

.example-item {
	@include size(6rem);
	background-color: white;
	border: 4px solid $cyan;
	box-shadow: 0 0 1rem transparentize($cyan, 0.25), 0 0 2rem transparentize($cyan, 0.5);
	border-radius: $br-l;
	margin: auto;
}

.code {
	background-color: var(--primary-900);
	border-radius: $br-l;
}
</style>
