---
'@animxyz/vue': patch
'@animxyz/vue3': patch
'@animxyz/react': patch
---

Fix transitions hanging forever on elements using the `v-xyz` directive, and infinite animations being cut short by the safety-net timeout.

- vue/vue3: remove the directive `unbind`/`unmounted` `clearXyzElement` cleanup added in 0.6.8. Vue invokes those hooks during the unmount flush, while the `<Transition>` leave is still animating the element, so the cleanup destroyed the animation hook's listeners/timeouts before they could call `done()` — the leave never completed, `after-leave` never fired, and anything sequenced on it (like the docs examples' toggle loop) stalled permanently. The animation hook already tears everything down when the animation resolves.
- all wrappers: the auto-mode safety-net timeout now accounts for `animation-iteration-count` — finite counts multiply the duration, and `infinite` animations get no safety timeout at all (they legitimately never fire `animationend`; force-completing them froze `iterate-infinite` showcases after one iteration).
