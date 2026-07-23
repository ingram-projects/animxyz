---
'@animxyz/core': major
---

Uncapped stagger via `sibling-index()`, plus v1 cleanups

Stagger indexing now uses CSS `sibling-index()` / `sibling-count()` where
supported, so staggers are no longer capped at `$xyz-index-levels` (default 20)
siblings. The nth-child ladder still ships as the fallback.

- Feature-detection uses `@supports (animation-delay: calc(1s * (sibling-index()
  - 1)))` — a real property test, because `@supports (--x: sibling-index())` is
  always true.
- The enhancement lives in the `xyz.index.modern` sublayer (declared after
  `xyz.index.ladder`), so it wins over the higher-specificity nth-child rules by
  layer order rather than specificity.
- New `$xyz-index-levels: 0` option skips the nth-child ladder entirely for
  Chromium-only consumers relying solely on `sibling-index()`.

**Breaking:** `backface-visibility: visible` is no longer emitted by the
animation mixin (it only re-forced the CSS initial value).
