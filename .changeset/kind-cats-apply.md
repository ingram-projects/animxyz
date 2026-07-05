---
'@animxyz/core': patch
---

Fix the `xyz-apply` Sass mixin (work brief A2). It previously errored on every call because it passed level/mode to `xyz-utility` in the wrong order, and its substring-based token parser mis-read `thin`/`origin` as mode `in` and let `up` shadow `flip-up`. The token parser is now deterministic — mode is matched as an exact `in-`/`out-`/`appear-` prefix, and the utility name by exact match then longest `-`-boundary prefix — so `xyz-apply('fade up-100% in-rotate-right')` works. Unknown utilities/levels now raise a Sass `@error` listing the valid names/levels.
