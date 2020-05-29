<template>
	<div class="page-content-wrap">
		<main class="page-content">
			<slot />
		</main>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.page-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: $spacing-l;

	@include media('<phone') {
		padding: $spacing-s;
	}
}
</style>
