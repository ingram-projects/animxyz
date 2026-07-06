---
"@animxyz/vue": patch
"@animxyz/vue3": patch
"@animxyz/react": patch
---

Fix the wrapper animation-done hook so cancelled animations no longer hang the transition (work brief A4).

- Correct the DOM event name from the nonexistent `animationcancelled` to `animationcancel` in the shared `getXyzAnimationHook`.
- Add a safety-net timeout to the `duration: 'auto'` path: once animations are running, resolve `done()` no later than a worst-case bound computed from the elements' computed `animation-duration` + `animation-delay` (with a 100ms buffer), falling back to a generous 10s constant. This guarantees `done()` fires even when a cancelled animation (element hidden, `animation-name` overridden, `xyz-none` applied mid-flight) emits neither `animationend` nor `animationcancel` (Chromium historically never fired the latter).
- Harden `getXyzDurationForMode` to coerce fully-numeric duration strings (e.g. `duration="500"` without `v-bind`) via `parseFloat` so they take the timeout path; `'auto'` and mode-object behavior unchanged.
- Export a named, idempotent `clearXyzElement(el)` teardown that clears pending safety-net/animation timeouts, event listeners, and the `appearVisible` IntersectionObserver, for wrappers to call on unmount.
