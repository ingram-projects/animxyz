<template>
	<Layout>
		<div class="banner__wrap">
			<banner></banner>
		</div>
		<content-section></content-section>
		<content-section></content-section>
	</Layout>
</template>

<script>
import Banner from '~/components/banner/Banner'
import ContentSection from '~/components/contentSection/ContentSection'

export default {
	components: {
		Banner,
		ContentSection,
	},
	metaInfo() {
		return {
			title: 'AnimXYZ',
		}
	},
}
</script>

<style lang="scss" scoped>
.banner__wrap {
	padding: 10vh $spacing-l;

	@include media('<phone') {
		padding: $spacing-s;
	}
}

.banner {
	margin: 0 auto;
}
</style>
