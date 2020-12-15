---
title: Contexts
id: contexts
quote: The div doesn't fall far from the tree.

examples:
  - name: Basic
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade rotate-right" v-on="data.listeners">
          <div class="square-group xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-group" xyz="fade rotate-right">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="square-group" xyz="fade rotate-right">
            <div class="square" v-if="${data.toggled}"></div>
            <div class="square" v-if="${data.toggled}"></div>
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup className="square-group" xyz="fade rotate-right">
            {${data.toggled} && <div className="square" />}
            {${data.toggled} && <div className="square" />}
            {${data.toggled} && <div className="square" />}
          </XyzTransitionGroup>
  - name: Override
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small" v-on="data.listeners">
          <div class="square-group xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" :key="1"></div>
            <div class="square xyz-nested" xyz="fade big" :key="2"></div>
            <div class="square xyz-nested" :key="3"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-group" xyz="fade small">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}" xyz="fade big"></div>
            <div class="square ${data.mode}"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="square-group" xyz="fade small">
            <div class="square" v-if="${data.toggled}"></div>
            <div class="square" v-if="${data.toggled}" xyz="fade big"></div>
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup className="square-group" xyz="fade small">
            {${data.toggled} && <div className="square" />}
            {${data.toggled} && <div className="square" xyz="fade big" />}
            {${data.toggled} && <div className="square" />}
          </XyzTransitionGroup>
  - name: Inherit
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade up rotate-right duration-10 ease-out-back stagger" v-on="data.listeners">
          <div class="square-group xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" :key="1"></div>
            <div class="square xyz-nested" xyz="inherit rotate-left" :key="2"></div>
            <div class="square xyz-nested" :key="3"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-group" xyz="fade up rotate-right duration-10 ease-out-back stagger">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}" xyz="inherit rotate-left"></div>
            <div class="square ${data.mode}"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="square-group" xyz="fade up rotate-right duration-10 ease-out-back stagger">
            <div class="square" v-if="${data.toggled}"></div>
            <div class="square" v-if="${data.toggled}" xyz="inherit rotate-left"></div>
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup className="square-group" xyz="fade up rotate-right duration-10 ease-out-back stagger">
            {${data.toggled} && <div className="square" />}
            {${data.toggled} && <div className="square" xyz="inherit rotate-left" />}
            {${data.toggled} && <div className="square" />}
          </XyzTransitionGroup>
---

The `xyz` attribute creates an animation context where any AnimXYZ animations that take place within will use the animation variables it sets. This can be very useful when applying the same animation to lists or groups of elements without having to add them to each element. [Basic Example](?tab=examples&example=Basic#contexts)

To have a child element animate differently than it's parent context, add an `xyz` attribute to the child to override it. This new XYZ context resets all utilities and variables. [Override Example](?tab=examples&example=Override#contexts)

If you want to only override some of the parent context, add `inherit` along with the new `xyz` values. [Inherit Example](?tab=examples&example=Inherit#contexts)
