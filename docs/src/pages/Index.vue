<template>
	<Layout>
		<banner></banner>
	</Layout>
</template>

<script>
import Banner from '~/components/banner/Banner'

export default {
	components: {
		Banner,
	},
	metaInfo() {
		return {
			title: 'AnimXYZ',
		}
	},
}
</script>

<style lang="scss" scoped></style>
