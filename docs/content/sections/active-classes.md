---
title: Active Classes
quote: Element goes in, element goes out, you can't explain that.

examples:
  - name: Direction variation
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="fade up in-left in-rotate-left out-right out-rotate-right" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="fade up in-left in-rotate-left out-right out-rotate-right"></div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade up in-left in-rotate-left out-right out-rotate-right">
            <div class="square" v-show="${data.toggled}"></div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition xyz="fade up in-left in-rotate-left out-right out-rotate-right">
            {${data.toggled} && <div class="square" />}
          </XyzTransition>
  - name: Direction override
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="fade big-100 out-big-25" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="fade big-100 out-big-25"></div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade big-100 out-big-25">
            <div class="square" v-show="${data.toggled}"></div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition xyz="fade big-100 out-big-25">
            {${data.toggled} && <div class="square" />}
          </XyzTransition>
  - name: Mixing it up
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade up out-down stagger" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" xyz="inherit out-left out-rotate-left" :key="1"></div>
            <div class="square xyz-nested" xyz="inherit out-flip-down" :key="2"></div>
            <div class="square xyz-nested" xyz="inherit out-right out-rotate-right" :key="3"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-group" xyz="fade up out-down stagger">
            <div class="square ${data.mode}" xyz="inherit out-left out-rotate-left"></div>
            <div class="square ${data.mode}" xyz="inherit out-flip-down"></div>
            <div class="square ${data.mode}" xyz="inherit out-right out-rotate-right"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup tag="div" class="square-group" xyz="fade up out-down stagger">
            <div class="square" v-show="${data.toggled}" xyz="inherit out-left out-rotate-left"></div>
            <div class="square" v-show="${data.toggled}" xyz="inherit out-flip-down"></div>
            <div class="square" v-show="${data.toggled}" xyz="inherit out-right out-rotate-right"></div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup tag="div" class="square-group" xyz="fade up out-down stagger">
            {${data.toggled} && <div class="square" xyz="inherit out-left out-rotate-left" />}
            {${data.toggled} && <div class="square" xyz="inherit out-flip-down" />}
            {${data.toggled} && <div class="square" xyz="inherit out-right out-rotate-right" />}
          </XyzTransitionGroup>
---

AnimXYZ animates elements in and out when activated by their respective classes. `.xyz-in` animates elements **from** the values set by XYZ utilities and variables, while `.xyz-out` animates elements **to** those values.

For example an element with `.xyz-in` and `xyz="fade"` will fade from 0 to its natural opacity, while `.xyz-out` will fade it from its natural opacity to 0.

By default AnimXYZ utilities and variables apply to both the **in** and **out** classes, but you can set specific animations for each direction. Utilities and variables have **in** and **out** variants which apply only to the corresponding direction. For example an element with `xyz="in-left in-rotate-left out-right out-rotate-right"` will slide/rotate in from the left and slide/rotate out to the right. [See example](<?tab=examples&example=Direction variation#active-classes>)

Direction-specific utilities and variables take precedence over the basic variants. For example an element with `xyz="big-100 out-big-25"` will have a more pronounced scale effect in the **in** direction than in the **out** direction. [See example](<?tab=examples&example=Direction override#active-classes>)

You can combine direction-specific utilities and variables to achieve some very cool effects.
[See example](<?tab=examples&example=Mixing it up#active-classes>)

::: note [Vue,React]
The Vue and React libraries also expose an `.xyz-appear` class and a full set of **appear** utilities and variables that you can use to define a specific animation for when an element initially appears on the page.
:::
