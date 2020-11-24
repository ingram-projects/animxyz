---
title: Vue
quote: May the force be with Vue.
---

VueAnimXYZ seamlessly integrates with Vue using our provided components.

---
## Installation

### Using a package manager

VueAnimXYZ can be installed using your favorite package manager:

```bash
# with npm
npm install @animxyz/vue

# with yarn
yarn install @animxyz/vue
```

After installation, you will need to import VueAnimXYZ into your project and tell the Vue instance to use the [plugin](https://vuejs.org/v2/guide/plugins.html). This has to be done before you instantiate your Vue app.

```js
import Vue from 'vue'
import VueAnimXYZ from '@animxyz/vue'

Vue.use(VueAnimXYZ)

// Instantiate your Vue instance after using plugins
// new Vue({...})
```

### Using jsDelivr

To install VueAnimXYZ using a CDN put this script in the `<head>` of your `index.html` file:

```html
<script src="https://cdn.jsdelivr.net/npm/@animxyz/vue@0.1.0/dist/VueAnimXyz.js"></script>
```
---
## &lt;XyzTransition&gt; component

```jsx
<XyzTransition
	appear={ boolean }
	duration={ number | 'auto' | { appear: number | 'auto', enter: number | 'auto', leave: number | 'auto' } }
	mode={ 'out-in' | 'in-out' }
	xyz="fade up ..."
	style="--xyz-duration: 0.75s; ..."
>
	<child-component />
</XyzTransition>
```

The `<XyzTransition>` component is an extended version of the [&lt;Transition&gt;](https://vuejs.org/v2/api/#transition) Vue component used to animate single elements in and out of the page or to animate switching between elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<XyzTransition>` you only need to care about the `appear`, `duration`, and `mode` props.

### appear

When set to `true` will trigger the xyz animation on initial render. Defaults to the **in** animation, however **appear**-specific behaviour can be set using the **appear**-specific xyz utilities and variables. See [active classes](#active-classes) for more information.

You can learn more about using this property in the [Vue docs](https://vuejs.org/v2/guide/transitions.html#Transitions-on-Initial-Render).

### duration

Sets the behavior of how long to apply the [active class](#active-classes) for the animation. By default the class will be applied only for the duration of the animation, however if you have [nested animations](#nesting) you will want them to complete before removing the class. To do this we've added `duration="auto"` which conviently waits for all nested animations to finish before removing the class.

To apply the class for a specific amount of time you can use a number in milliseconds like `:duration="2000"`.

You can also specify direction-specific behavior using an object describing the behavior for each direction such as `:duration="{ appear: 'auto', enter: 2000, leave: 1000 }"`.

You can learn more about using this property in the [Vue docs](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).

### mode

Sets the sequencing of element switch transitions. By default the new element will transition **in** simultanously to the old element transitioning **out**. Setting `mode="out-in"` will transition the old element **out** first and setting `mode="in-out"` will transition the new element **in** first.

You can learn more about using this property in the [Vue docs](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).

### Properties

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
				<th scope="row">mode</th>
				<td>--</td>
				<td>'out-in' | 'in-out'</td>
			</tr>
		</tbody>
	</table>
</div>

---
## &lt;XyzTransitionGroup&gt; component

```jsx
<XyzTransitionGroup
	appear={ boolean }
	duration={ number | 'auto' | { appear: number | 'auto', enter: number | 'auto', leave: number | 'auto' } }
	tag={ string }
	xyz="fade up ..."
	style="--xyz-duration: 0.75s; ..."
>
	<child-component key="..." />
	<child-component key="..." />
	<child-component key="..." />
</XyzTransitionGroup>
```

The `<XyzTransitionGroup>` component is an extended version of the [&lt;TransitionGroup&gt;](https://vuejs.org/v2/api/#transition-group) Vue component used to animate groups/lists of elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<XyzTransitionGroup>` you only need to care about the `appear`, `duration`, and `tag` props.

### appear

Same as the `<XyzTransition>` component.

### duration

Same as the `<XyzTransition>` component.

### tag

Specifies the tag to use for the wrapper element. Defaults to `'span'`.

### Properties

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

---
## v-xyz directive