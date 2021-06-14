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
                  'in-down-50% in-right-50% in-stagger-1': index <= 41,
                  'in-up-50% in-left-50% in-stagger-rev-1': index > 41,
                  'out-rotate-right-5': index % 2,
                  'out-rotate-left-5': (index + 1) % 2,
                })}
                key={index}
              />
            ))}
          </XyzTransitionGroup>
---

If you need to dynamically or conditionally set and combine `xyz` utilities you can use the `xyz(...)` helper function.

```jsx
import { xyz } from '@animxyz/react'

// Conditionally apply a transform on an element like so:
<div xyz={xyz({ 'left-5': isLeftTransformed, 'right-5': !isLeftTransformed })}></div>

// Set the utility level dynamically
<div xyz={xyz(`left-${leftTransformUtilityLevel}`)></div>

// To dynamically set XYZ variables simply use the `style` prop
<div style={{ '--xyz-translate-x': translateXAmount }}></div>
```