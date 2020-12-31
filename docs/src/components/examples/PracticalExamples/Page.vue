<template>
	<div class="example-wrap">
		<div class="page-wrap">
			<XyzTransition appear duration="auto" xyz="fade small stagger ease-out-back">
				<div class="page-hero xyz-none">
					<div class="hero-logo xyz-nested" xyz="fade small"></div>
					<p class="hero-text xyz-nested" xyz="fade small">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
				</div>
			</XyzTransition>
			<XyzTransition appear duration="auto" xyz="fade down stagger duration-10 delay-2 ease-out-back">
				<div class="page-thing1-wrap">
					<div class="page-thing1 xyz-nested"></div>
					<div class="page-thing1 xyz-nested"></div>
					<div class="page-thing1 xyz-nested"></div>
				</div>
			</XyzTransition>
			<XyzTransition appear duration="auto" xyz="fade small stagger delay-4 ease-in-out">
				<div class="page-thing2-wrap">
					<div class="page-thing2-left xyz-none" xyz="fade left stagger">
						<div class="page-thing2 xyz-nested"></div>
						<div class="page-thing2 xyz-nested"></div>
						<div class="page-thing2 xyz-nested"></div>
					</div>
					<div class="page-thing2-right xyz-nested" xyz="fade big delay-10"></div>
				</div>
			</XyzTransition>
		</div>
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
.page-wrap {
	color: primary-color(100);
	box-shadow: 0 0 0 2px primary-color(300);
	border-radius: $br-l;
	width: 100%;
	max-width: 24rem;
	overflow: hidden;
}

.page-hero {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: primary-color(800);
	padding: $sp-m;
}

.hero-logo {
	@include circle(3rem);
	background-color: primary-color(400);
	margin-bottom: $sp-xs;
}

.hero-text {
	color: primary-color(200);
	font-size: $fs-xs;
	font-weight: 600;
	width: 50%;
	text-align: center;
}

.page-thing1-wrap {
	display: flex;
	padding: $sp-m;
}

.page-thing1 {
	background-color: primary-color(400);
	height: 4rem;
	flex-grow: 1;
	border-radius: $br-m;

	& + & {
		margin-left: $sp-m;
	}
}

.page-thing2-wrap {
	display: flex;
	background-color: primary-color(800);
	padding: $sp-m;
	border-radius: $br-m;
	margin: 0 $sp-m;
	margin-bottom: $sp-m;
}

.page-thing2-left {
	flex-grow: 1;
}

.page-thing2-right {
	border-radius: $br-m;
	flex-grow: 1;
	background-color: primary-color(700);
	margin-left: $sp-m;
}

.page-thing2 {
	background-color: primary-color(400);
	height: 1rem;
	border-radius: $br-m;

	& + & {
		margin-top: $sp-xs;
	}
}
</style>
