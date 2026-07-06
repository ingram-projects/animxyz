---
"@animxyz/react": patch
---

Make the React wrapper survive callback refs and empty children (work brief A6).

- Always hand `CSSTransition` the internal ref OBJECT and compose it with the child's own ref, handling both object and callback ref forms. A callback ref previously became the `nodeRef`, so `nodeRef.current` was `undefined` and the end listener threw `Cannot read properties of undefined (reading 'classList')` in the animation hook.
- Stop injecting `xyz`/`className`/`style`/`ref` onto the empty-state placeholder `<Fragment/>` (Fragments accept only `key`/`children`). This removes the React warning and the null-element crash on `mode="out-in"` transitions to empty.
- Guard the `addEndListener` hook against a missing element regardless: with no attached node there is nothing to wait on, so it resolves `done()` immediately instead of dereferencing a null/undefined element (defense in depth for both paths above).
- Clear the `appearVisible` IntersectionObserver and pending animation timeouts on `onExited` and on unmount via the shared idempotent `clearXyzElement(el)`.
- Replace the one-line `index.d.ts` stub with real typings for `XyzTransition`, `XyzTransitionGroup`, and the `xyz` helper (`xyz`, `duration`, `appearVisible`, lifecycle callbacks, and transition props), so consumers no longer get `any`.
