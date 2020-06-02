<template>
	<section class="section">
		<div class="section-column example-column">
			<div class="column-content example-content">
				<h1 class="section-title">Rotate</h1>
				<div class="example">
					<div class="example-item"></div>
				</div>
			</div>
		</div>
		<div class="section-column text-column">
			<div class="column-content text-content">
				<p>
					Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis
					mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem
					malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna
					mollis ornare vel eu leo.
				</p>
				<p>
					Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis
					mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem
					malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna
					mollis ornare vel eu leo.
				</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ContentSection',
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
