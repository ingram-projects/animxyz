---
title: <XyzTransition>
id: react-xyz-transition

examples:
  - name: Toggle
    component: XyzTransition_Toggle
    code:
      - name: React
        content: |
          ##javascript   
          import { XyzTransition } from '@animxyz/react'

          const toggled = ${data.buttonToggled}

          ##jsx
          <XyzTransition appear xyz="fade rotate-right ease-out-back">
            {toggled && <div className="square" />}
          </XyzTransition>
  - name: Switch
    component: XyzTransition_Switch
    code:
      - name: React
        content: |
          ##javascript   
          import { XyzTransition } from '@animxyz/react'

          const shape = '${data.shapes && data.shapes[data.shapeIndex]}'

          ##jsx
          <XyzTransition appear mode="out-in">
            {shape === 'square' && <div className="square" xyz="fade left-100%" key="square" />}
            {shape === 'circle' && <div className="circle" xyz="fade up-100%" key="circle" />}
            {shape === 'triangle' && <div className="triangle" xyz="fade right-100%" key="triangle" />}
          </XyzTransition>
  - name: Key
    component: XyzTransition_Key
    code:
      - name: React
        content: |
          ##javascript   
          import { XyzTransition } from '@animxyz/react'

          const key = ${data.key}

          ##jsx
          <XyzTransition appear mode="out-in" xyz="flip-up out-flip-down duration-3 ease-out">
            <div className="square" key={key}>{key}</div>
          </XyzTransition>
  - name: Nested
    component: XyzTransition_Nested
    code:
      - name: React
        content: |
          ##javascript
          import { XyzTransition } from '@animxyz/react'

          const toggled = ${data.buttonToggled}

          ##jsx
          <XyzTransition appear duration="auto" xyz="fade up-100% duration-10">
            {toggled && (
              <div className="item-block">
                {[...Array(4)].map((_, index) => (
                  <div className="square xyz-nested" xyz="fade small stagger" key={index} />
                ))}
              </div>
            )}
          </XyzTransition>
---

The `<XyzTransition>` component is an extended version of the [ReactTransitionGroup &lt;SwitchTransition&gt;](https://reactcommunity.org/react-transition-group/switch-transition) component used to animate single elements in and out of the page or to animate switching between elements. The component exposes similar props and events as the React component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the ReactTransitionGroup component, with `<XyzTransition>` you only need to care about the `appear`, `appearVisible`, `duration`, and `mode` props. Most props available on the [ReactTransitionGroup &lt;Transition&gt;](https://reactcommunity.org/react-transition-group/transition) component can also be used but likely wont be needed in the majority of cases.

::: note [Warning]
Due to the [deprecation of React.findDOMNode](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage) and the need for internal usage of node refs it can be complicated to transition React Components as direct children of `<XyzTransition>`. In order to make this work the React Component must use [ref forwarding](https://reactjs.org/docs/forwarding-refs.html). Often you may be using components from an external library and don't have the ability to add ref forwarding. For this reason we recommend the workaround of wrapping the child components in an HTML element such as a `div` as shown here:

```jsx
<XyzTransition>
  <div><MyReactComponent /></div>
</XyzTransition>
```
:::

```jsx
import { XyzTransition } from '@animxyz/react'

<XyzTransition
  appear={ boolean }
  appearVisible={ boolean | IntersectionObserverOptions }
	duration={ number | 'auto' | { appear: number | 'auto', in: number | 'auto', out: number | 'auto' } }
	mode={ 'out-in' | 'in-out' }
>
	<child />
</XyzTransition>
```

---
## Properties

### appear

When set to `true` will animate elements in on initial render. You can set appear-specific behaviour using the appear-specific xyz utilities and variables. See [active classes](#active-classes) for more information.

### appearVisible

You can use this property instead of `appear` to pause the appear animation until the element is visible within the viewport. This uses an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) behind the scenes which can be customized by passing the `IntersectionObserver` options to the property such as `appearVisible={{ threshold: 0.5, rootMargin: '50px' }}`.

### duration

Sets the behavior of how long to apply the [active class](#active-classes) for the animation. By default the class will be applied only for the duration of the animation, however if you have [nested animations](#nesting) you will want them to complete before removing the class. To do this we've added `duration="auto"` which conviently waits for all nested animations to finish before removing the class.

To apply the class for a specific amount of time you can use a number in milliseconds like `duration={2000}`.

You can also specify direction-specific behavior using an object describing the behavior for each direction such as `duration={{ appear: 'auto', in: 2000, out: 1000 }}`.

### mode

Sets the sequencing of element switch transitions. By default the new element will transition **in** simultanously to the old element transitioning **out**. Setting `mode="out-in"` will transition the old element **out** first and setting `mode="in-out"` will transition the new element **in** first.

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
				<td>--</td>
				<td>boolean</td>
			</tr>
      <tr>
				<th scope="row">appearVisible</th>
				<td>--</td>
				<td>boolean | IntersectionObserverOptions</td>
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