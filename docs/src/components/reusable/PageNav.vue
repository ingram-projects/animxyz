<template>
	<nav class="page-nav">
		<button class="nav-toggle">Menu</button>
		<ul class="nav-sections">
			<li v-for="section in sections" class="nav-section__item" :key="section.title">
				<a href="/" class="nav-section__link">
					<div class="link-dot__wrap">
						<span class="link-dot"></span>
					</div>
					<span class="link-title">{{ section.title }}</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'PageNav',
	props: ['sections'],
}
</script>

<style lang="scss" scoped>
.page-nav {
	position: fixed;
	// left: $spacing-l;
	top: 50%;
	left: -24rem;
	transform: translateY(-50%);
	width: 24rem;
	border-radius: $br-xl;
	background-color: primary-color(900);
}

.nav-toggle {
	position: absolute;
	left: 100%;
	top: 50%;
	transform: translateY(-50%) rotate(90deg);
	color: primary-color(700);
	font-family: $font-stack-mono;
	font-size: $fs-xlarge;
	font-weight: bold;
}

.nav-sections {
	padding: $spacing-l 0;
	list-style: none;
}

.nav-section__item {
	font-family: $font-stack-mono;
	font-size: $fs-large;
}

.nav-section__link {
	display: flex;
	align-items: center;
	height: 3rem;
	padding: 0 $spacing-l;
	color: primary-color(300);
	text-decoration: none;

	&:hover {
		.link-dot {
			@include size(1.25rem);
			opacity: 0.5;
			border-radius: $br-m;
			transition-duration: 0.2s;
		}

		.link-title {
			transform: translateX($spacing-xxs);
		}
	}

	&.active {
		.link-dot {
			@include size(1.25rem);
			opacity: 1;
			background-color: $cyan;
			border-radius: $br-m;
			transform: none;
			transition: all 0.25s $ease-out-back;
		}

		.link-title {
			font-weight: bold;
			color: primary-color(100);
			transform: translateX($spacing-s);
		}
	}
}

.link-title {
	transition: transform 0.2s $ease-in-out;
}

.link-dot__wrap {
	@include size(1.25rem);
	display: flex;
	margin-right: $spacing-m;
}

.link-dot {
	@include circle(0.25rem);
	margin: auto;
	opacity: 0.2;
	background-color: primary-color(100);
	transform: rotate(-0.125turn);
	transition: all 0.25s $ease-in-out;
}
</style>
