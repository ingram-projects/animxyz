<template>
	<div class="example-wrap">
		<XyzTransition appear duration="auto">
			<div class="page-wrap">
				<div class="page-hero" xyz="fade small stagger ease-out-back">
					<div class="hero-logo xyz-nested"></div>
					<p class="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
				</div>
				<div class="page-features" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
					<div class="feature-item xyz-nested"></div>
					<div class="feature-item xyz-nested"></div>
					<div class="feature-item xyz-nested"></div>
				</div>
				<div class="page-section" xyz="fade small stagger delay-4 ease-in-out">
					<div class="section-left" xyz="fade left stagger">
						<div class="section-item xyz-nested"></div>
						<div class="section-item xyz-nested"></div>
						<div class="section-item xyz-nested"></div>
					</div>
					<div class="section-right xyz-nested" xyz="fade big delay-10"></div>
				</div>
				<div class="page-footer" xyz="fade bottom ease-in-out delay-10">
					<div class="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
					<div class="footer-right" xyz="fade up stagger ease-in-out delay-10">
						<div class="footer-item xyz-nested"></div>
						<div class="footer-item xyz-nested"></div>
						<div class="footer-item xyz-nested"></div>
					</div>
				</div>
			</div>
		</XyzTransition>
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
	box-shadow: 0 0 0 2px primary-color(600);
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
	background-color: $cyan;
	margin-bottom: $sp-xs;
}

.hero-text {
	color: primary-color(200);
	font-size: $fs-xs;
	font-weight: 600;
	width: 50%;
	text-align: center;
}

.page-features {
	display: flex;
	padding: $sp-m;
}

.feature-item {
	background-color: primary-color(400);
	height: 4rem;
	flex-grow: 1;
	border-radius: $br-m;

	& + & {
		margin-left: $sp-m;
	}
}

.page-section {
	display: flex;
	background-color: primary-color(800);
	padding: $sp-m;
	border-radius: $br-m;
	margin: 0 $sp-m;
	margin-bottom: $sp-m;
}

.section-left {
	flex-grow: 1;
}

.section-right {
	border-radius: $br-m;
	flex-grow: 1;
	background-color: primary-color(700);
	margin-left: $sp-m;
}

.section-item {
	background-color: primary-color(400);
	height: 1rem;
	flex-grow: 1;
	border-radius: $br-m;

	& + & {
		margin-top: $sp-xs;
	}
}

.page-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: primary-color(800);
	padding: $sp-xxs $sp-xs;
}

.footer-logo {
	@include circle(1rem);
	background-color: $cyan;
}

.footer-right {
	width: 50%;
	display: flex;
	align-items: center;

	.footer-item {
		background-color: primary-color(400);
		height: 0.75rem;
		flex-grow: 1;
		border-radius: $br-m;
	}

	.footer-item + .footer-item {
		margin-left: $sp-xxs;
		margin-top: 0;
	}
}
</style>
