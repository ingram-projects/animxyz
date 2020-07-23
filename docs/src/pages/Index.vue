<template>
	<layout>
    <main class="page-content">
      <div class="banner__wrap">
        <banner></banner>
      </div>

      <xyz-transition appear>
        <div class="intro__wrap" xyz="fade small-2 duration-7 ease-out-back">
          <p class="intro-text">
            The first truly composable CSS animation toolkit. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring
            your website to life.
          </p>
        </div>
      </xyz-transition>
    </main>
  </layout>
</template>

<script>
import Banner from '~/components/banner/Banner'

export default {
	components: {
		Banner,
	},
	metaInfo() {
		return {
			title: '',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.intro__wrap {
	--xyz-duration: 0.7s;
	--xyz-delay: 1.2s;
	margin: 0 auto;
	margin-bottom: $sp-xxl;
	text-align: center;
}

.intro-text {
	padding: 0 $sp-l;
	font-size: $fs-xl;
	font-weight: 500;
	line-height: 1.75;
	max-width: 56ch;

	@include media('<phone') {
		font-size: $fs-l;
	}
}

.banner__wrap {
	margin: $sp-xxl auto;
	padding: 0 $sp-m;
	width: 100%;
	max-width: 80rem;

	@include media('<phone') {
		margin: $sp-l auto;
		max-width: 80vw;
	}
}
</style>
