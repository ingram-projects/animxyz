---
title: XyzTransitionGroup
id: vue-xyz-transition-group

examples:
  - name: List
    component: XyzTransitionGroup_List
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup appear class="example-grid" xyz="fade small out-down out-rotate-right appear-stagger">
            <div class="square" v-for="index in numElements" :key="index"></div>
          </XyzTransitionGroup>
          <button @click="addElement">Add Element</button>
          <button @click="removeElement">Remove Element</button>
  - name: Index
    component: XyzTransitionGroup_Index
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup
            class="example-grid"
            xyz="fade small out-back-3"
            :duration="2500"
            :style="{
              '--xyz-in-stagger': '0.025s',
              '--xyz-out-stagger-rev': '0.025s',
            }"
          >
            <div
              class="square"
              v-if="${data.toggled}"
              v-for="index in 81"
              :key="index"
              :style="{ '--xyz-index-rev': Math.random() * 81 }"
            ></div>
          </XyzTransitionGroup>
  - name: Nested
    component: XyzTransitionGroup_Nested
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup appear duration="auto" class="example-grid" xyz="fade flip-left origin-left duration-3 appear-stagger">
            <div class="item-block" v-for="index in numElements" :key="index">
              <div class="square xyz-nested" xyz="fade small stagger" v-for="subIndex in 4" :key="subIndex"></div>
            </div>
          </XyzTransitionGroup>
          <button @click="addElement">Add Element</button>
          <button @click="removeElement">Remove Element</button>
  - name: Appear Visible
    component: XyzTransitionGroup_AppearVisible
    code:
      - name: Vue
        content: |
          ##vue
          <div class="scroll-wrap">
            <XyzTransitionGroup appear-visible class="example-grid" xyz="delay-2 fade small rotate-right">
              <div class="square" v-for="index in 200" :key="index"></div>
            </XyzTransitionGroup>
          </div>
---

The `<XyzTransitionGroup>` component is an extended version of the [&lt;TransitionGroup&gt;](https://vuejs.org/v2/api/#transition-group) Vue component used to animate groups/lists of elements. The component exposes the same props and events as the Vue component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the Vue component, with `<XyzTransitionGroup>` you only need to care about the `appear`, `appear-visible`, `duration`, and `tag` props.

```jsx
<XyzTransitionGroup
  appear={ boolean }
  appear-visible={ boolean | IntersectionObserverOptions }
	duration={ number | 'auto' | { appear: number | 'auto', in: number | 'auto', out: number | 'auto' } }
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

### appear-visible

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
				<td>--</td>
				<td>boolean</td>
			</tr>
      <tr>
				<th scope="row">appear-visible</th>
				<td>--</td>
				<td>boolean | IntersectionObserverOptions</td>
			</tr>
			<tr>
				<th scope="row">duration</th>
				<td>--</td>
				<td>number | 'auto' | { in: number | 'auto', out: number | 'auto', appear: number | 'auto' }</td>
			</tr>
			<tr>
				<th scope="row">tag</th>
				<td>'div'</td>
				<td>string</td>
			</tr>
		</tbody>
	</table>
</div>