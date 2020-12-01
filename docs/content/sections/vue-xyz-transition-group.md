---
title: XyzTransitionGroup
id: vue-xyz-transition-group
---

The `<XyzTransitionGroup>` component is an extended version of the [&lt;TransitionGroup&gt;](https://vuejs.org/v2/api/#transition-group) Vue component used to animate groups/lists of elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<XyzTransitionGroup>` you only need to care about the `appear`, `duration`, and `tag` props.

```jsx
<XyzTransitionGroup
	appear={ boolean }
	duration={ number | 'auto' | { appear: number | 'auto', enter: number | 'auto', leave: number | 'auto' } }
	tag={ string }
>
	<child />
	<child />
	<child />
	...
</XyzTransitionGroup>
```

---
## Properties

### appear

Same as the `<XyzTransition>` component.

### duration

Same as the `<XyzTransition>` component.

### tag

Specifies the tag to use for the wrapper element. Defaults to `'span'`.

<div class="properties-table table-wrap">
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Default</th>
				<th>Syntax</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">appear</th>
				<td>false</td>
				<td>boolean</td>
			</tr>
			<tr>
				<th scope="row">duration</th>
				<td>--</td>
				<td>number | 'auto' | { in: number | 'auto', out: number | 'auto', appear: number | 'auto' }</td>
			</tr>
			<tr>
				<th scope="row">tag</th>
				<td>'span'</td>
				<td>string</td>
			</tr>
		</tbody>
	</table>
</div>