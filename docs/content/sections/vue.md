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
## &lt;xyz-transition&gt; component

The `<xyz-transition>` component is an extended version of the [&lt;transition&gt;](https://vuejs.org/v2/api/#transition) Vue component used to animate single elements in and out of the page or to animate switching between elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<xyz-transition>` you only need to care about the `appear`, `duration`, and `mode` props.

### appear
<div class="properties-table table-wrap">
	<table>
		<tbody>
			<tr>
				<th scope="row">syntax</th>
				<td>boolean</td>
			</tr>
			<tr>
				<th scope="row">default</th>
				<td>false</td>
			</tr>
		</tbody>
	</table>
</div>

By setting `appear` to 

### duration
<div class="properties-table table-wrap">
	<table>
		<tbody>
			<tr>
				<th scope="row">syntax</th>
				<td>number | 'auto' | { in: number | 'auto', out: number | 'auto', appear: number | 'auto' }</td>
			</tr>
			<tr>
				<th scope="row">default</th>
				<td>--</td>
			</tr>
		</tbody>
	</table>
</div>

asdsada

### mode
<div class="properties-table table-wrap">
	<table>
		<tbody>
			<tr>
				<th scope="row">syntax</th>
				<td>'out-in' | 'in-out'</td>
			</tr>
			<tr>
				<th scope="row">default</th>
				<td>--</td>
			</tr>
		</tbody>
	</table>
</div>

---
## &lt;xyz-transition-group&gt; component

The `<xyz-transition-group>` component is an extended version of the [&lt;transition-group&gt;](https://vuejs.org/v2/api/#transition-group) Vue component used to animate lists/groups of elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<xyz-transition-group>` you only need to care about the `appear`, `duration`, and `tag` props.

---
## v-xyz directive