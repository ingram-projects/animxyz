<template>
	<div class="example-wrap">
		asdsadsadasdasdsad
		<XyzTransition v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
			<div class="square" v-show="data.toggled"></div>
		</XyzTransition>
	</div>
</template>

<script>
export default {
	name: 'TestExample',
	props: {
		data: Object,
	},
}
</script>
