---
title: XyzTransitionGroup
id: react-xyz-transition-group

examples:
  - name: List
    component: XyzTransitionGroup_List
    code:
      - name: React
        content: |
          ##jsx
          <>
            <XyzTransitionGroup appear className="example-grid" xyz="fade small out-down out-rotate-right appear-stagger">
              {[...Array(numElements)].map((_, index) => (
                <div className="square" key={index} />
              ))}
            </XyzTransitionGroup>
            <button onClick={addElement}>Add Element</button>
            <button onClick={removeElement}>Remove Element</button>
          </>
  - name: Index
    component: XyzTransitionGroup_Index
    code:
      - name: React
        content: |
          ##jsx
          <>
            <XyzTransitionGroup
              className="example-grid"
              xyz="fade small out-back-5"
              duration={2500}
              style={{
                '--xyz-in-stagger': '0.025s',
                '--xyz-out-stagger-rev': '0.025s',
              }}
            >
              {${data.toggled} &&
                [...Array(81)].map((_, index) => (
                  <div className="square" key={index} style={{ '--xyz-index-rev': Math.random() * 81 }} />
                ))}
            </XyzTransitionGroup>
          </>
  - name: Nested
    component: XyzTransitionGroup_Nested
    code:
      - name: React
        content: |
          ##jsx
          <>
            <XyzTransitionGroup
              appear
              duration="auto"
              className="example-grid"
              xyz="fade flip-left origin-left duration-3 appear-stagger"
            >
              {[...Array(numElements)].map((_, index) => (
                <div className="item-block" key={index}>
                  {[...Array(4)].map((_, subIndex) => (
                    <div className="square xyz-nested" xyz="fade small stagger" key={subIndex} />
                  ))}
                </div>
              ))}
            </XyzTransitionGroup>
            <button onClick={addElement}>Add Element</button>
            <button onClick={removeElement}>Remove Element</button>
          </>
  - name: Appear Visible
    component: XyzTransitionGroup_AppearVisible
    code:
      - name: React
        content: |
          ##jsx
          <div className="scroll-wrap">
            <XyzTransitionGroup appearVisible className="example-grid" xyz="delay-2 fade small rotate-right">
              {[...Array(200)].map((_, index) => (
                <div className="square" key={index} />
              ))}
            </XyzTransitionGroup>
          </div>
---

The `<XyzTransitionGroup>` component is an extended version of the [&lt;TransitionGroup&gt;](https://reactcommunity.org/react-transition-group/transition-group) React component used to animate groups/lists of elements. The component exposes similar props and events as the React component with some presets to work seamlessly with AnimXYZ and some quality of life improvements.

Unlike the complexity of the React component, with `<XyzTransitionGroup>` you only need to care about the `appear`, `appearVisible`, `duration`, and `tag` props.

```jsx
<XyzTransitionGroup
  appear={ boolean }
  appearVisible={ boolean | IntersectionObserverOptions }
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

### appearVisible

Same as the `<XyzTransition>` component.

### duration

Same as the `<XyzTransition>` component.

### tag

Specifies the tag to use for the wrapper element. Defaults to `'div'`.

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
				<th scope="row">tag</th>
				<td>'div'</td>
				<td>string</td>
			</tr>
		</tbody>
	</table>
</div>