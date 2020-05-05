<script>
import { xyzTransitionProps } from './xyzTransitionUtils'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	render(h, context) {
		const data = {
			...context.data,
			attrs: {
				...xyzTransitionProps,
				moveClass: 'xyz-move',
				...context.data.attrs,
			},
		}

		return <transition-group {...data}>{context.children}</transition-group>
	},
}
</script>
