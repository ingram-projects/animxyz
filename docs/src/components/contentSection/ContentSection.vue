<template>
	<section class="section">
		<div class="section-example">
			<div class="example-content">
				<h1 class="section-title">Rotate</h1>
				<div class="example">
					<div class="example-item"></div>
				</div>
				<div class="code"></div>
			</div>
		</div>
		<div class="section-content">
			<div class="content">
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
	width: 80%;
	margin: $spacing-xxxl auto;
}

.section-title {
	text-align: right;
	font-size: $fs-xlarge;
}

.section-example {
	display: flex;
	width: 50%;
	flex-shrink: 0;
	position: sticky;
	top: 0;
	padding-top: $spacing-m;
}

.example-content {
	width: 100%;
}

.example {
	display: flex;
	height: 24rem;
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
	height: 24rem;
}

.section-content {
	flex-grow: 1;
	padding-top: $spacing-m;
}

.content {
	margin: 0 auto;
	max-width: 36rem;
}

p {
	margin-bottom: $spacing-m;
	font-size: 1.125rem;
}
</style>
