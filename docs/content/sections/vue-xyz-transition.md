---
title: XyzTransition
id: vue-xyz-transition

examples:
  - name: Toggle
    component: ExampleXyzTransitionToggle
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear xyz="fade rotate-right ease-out-back">
            <div class="square" v-show="toggled"></div>
          </XyzTransition>
          <button @click="toggled = !toggled">Toggle</button>
  - name: Switch
    component: ExampleXyzTransitionSwitch
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear mode="out-in">
            <div class="square" xyz="fade left-100" v-if="shape === 'square'" key="square"></div>
            <div class="circle" xyz="fade up-100" v-if="shape === 'circle'" key="circle"></div>
            <div class="triangle" xyz="fade right-100" v-if="shape === 'triangle'" key="triangle"></div>
          </XyzTransition>
          <button @click="changeShape">Click to switch</button>
  - name: Key
    component: ExampleXyzTransitionKey
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear mode="out-in" xyz="flip-up out-flip-down duration-3 ease-out">
            <div class="square" :key="key">{{ key }}</div>
          </XyzTransition>
          <button @click="key += 1">Click to increment</button>
  - name: Nested
    component: ExampleXyzTransitionNested
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear duration="auto" xyz="fade up-100 duration-10">
            <div class="square-block" v-show="toggled">
              <div class="square xyz-nested" xyz="fade small stagger" v-for="index in 4" :key="index"></div>
            </div>
          </XyzTransition>
          <button @click="toggled = !toggled">Click to toggle</button>

---

The `<XyzTransition>` component is an extended version of the [&lt;Transition&gt;](https://vuejs.org/v2/api/#transition) Vue component used to animate single elements in and out of the page or to animate switching between elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<XyzTransition>` you only need to care about the `appear`, `duration`, and `mode` props.

```jsx
<XyzTransition
	appear={ boolean }
	duration={ number | 'auto' | { appear: number | 'auto', enter: number | 'auto', leave: number | 'auto' } }
	mode={ 'out-in' | 'in-out' }
>
	<child />
</XyzTransition>
```

---
## Properties

### appear

When set to `true` will trigger the xyz animation on initial render. Defaults to the **in** animation, however **appear**-specific behaviour can be set using the **appear**-specific xyz utilities and variables. See [active classes](#active-classes) for more information.

You can learn more about using this property in the [Vue docs](https://vuejs.org/v2/guide/transitions.html#Transitions-on-Initial-Render).

### duration

Sets the behavior of how long to apply the [active class](#active-classes) for the animation. By default the class will be applied only for the duration of the animation, however if you have [nested animations](#nesting) you will want them to complete before removing the class. To do this we've added `duration="auto"` which conviently waits for all nested animations to finish before removing the class.

To apply the class for a specific amount of time you can use a number in milliseconds like `:duration="2000"`.

You can also specify direction-specific behavior using an object describing the behavior for each direction such as `:duration="{ appear: 'auto', in: 2000, out: 1000 }"`.

You can learn more about using this property in the [Vue docs](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).

### mode

Sets the sequencing of element switch transitions. By default the new element will transition **in** simultanously to the old element transitioning **out**. Setting `mode="out-in"` will transition the old element **out** first and setting `mode="in-out"` will transition the new element **in** first.

You can learn more about using this property in the [Vue docs](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).

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