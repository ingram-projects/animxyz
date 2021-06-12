---
title: Dynamic Xyz
id: react-dynamic-xyz

examples:
  - name: Basic
    component: DynamicXyz_Basic
    code:
      - name: React
        content: |
          ##javascript   
          import { xyz, XyzTransition } from '@animxyz/react'

          const xyzUtilities = {
            'down': ${data.xyzUtilities && data.xyzUtilities['down']},
            'small': ${data.xyzUtilities && data.xyzUtilities['small']},
            'rotate-right': ${data.xyzUtilities && data.xyzUtilities['rotate-right']},
          }
          
          ##jsx
          <XyzTransition xyz={xyz('fade duration-10', xyzUtilities)}>
            {${data.toggled} && <div className="square" />}
          </XyzTransition>
  - name: By Index
    component: DynamicXyz_ByIndex
    code:
      - name: React
        content: |
          ##javascript   
          import { xyz, XyzTransitionGroup } from '@animxyz/react'

          ##jsx
          <XyzTransitionGroup className="example-grid">
          {${data.toggled} &&
            [...Array(81)].map((_, index) => (
              <div
                className="square"
                xyz={xyz('fade out-small-50% out-duration-30', {
                  'in-down in-right in-stagger-1': index <= 41,
                  'in-up in-left in-stagger-rev-1': index > 41,
                  'out-rotate-right-5': index % 2,
                  'out-rotate-left-5': (index + 1) % 2,
                })}
                key={index}
              />
            ))}
          </XyzTransitionGroup>
---

The `v-xyz` directive allows you to dynamically set the `xyz` attribute using a similar syntax to the Vue dynamic [class and style](https://vuejs.org/v2/guide/class-and-style.html) bindings. For instance you can conditionally apply a transform on an element like so:

```html
<div v-xyz="{ 'left-5': isTransformed }"></div>
```

Or set the utility level dynamically:

```html
<div v-xyz="[`left-${utilityLevel}`]"></div>
```

To dynamically set XYZ variables simply use the existing dynamic `:style` binding:

```html
<div :style="{ '--xyz-translate-x': translateAmount }"></div>
```