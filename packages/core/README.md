# @animxyz/core

AnimXYZ is a composable animation library that makes your site shine.

See [animxyz.com](https://animxyz.com) for full documentation.

## Testing

Tests live in `test/` and run on the plain Node.js test runner (`node:test`,
no extra framework). From this package directory:

```sh
npm test
```

or from the repo root:

```sh
npm test -w @animxyz/core
# or
turbo run test
```

`turbo run test` builds this package first (the `test` task depends on
`^build` in `turbo.json`), so the snapshot and size-budget tests always run
against freshly built output.

What's covered:

- **Compile test** (`test/compile.test.js`) — `build.scss` compiles without
  errors, and without any Sass deprecation warnings (`build.scss` uses
  `@use`, not `@import`).
- **Mixin API tests** (`test/mixin-api.test.js`) — small fixture `.scss`
  files under `test/fixtures/` `@use` the source directly and invoke the
  public mixins/functions (`xyz-utility`, `xyz-var`, `xyz-set-all`,
  `xyz-animation`, `xyz-make-keyframes`), asserting they compile and spot
  checking emitted declarations. `test/fixtures/xyz-apply.scss` documents a
  **known bug** (tracked by work brief A2, `fix/xyz-apply`): the mixin
  currently always errors due to swapped constructor arguments. Once A2
  lands, flip that test from asserting the `@error` to asserting a
  successful compile. `test/fixtures/xyz-time-levels-override.scss` proves
  that `$xyz-duration-levels` / `$xyz-delay-levels` / `$xyz-stagger-levels`
  remain independently `!default`-overridable after being derived from the
  shared `$xyz-time-levels` map (work brief A3).
- **Snapshot test** (`test/snapshot.test.js`) — compiles `build.scss`
  (expanded), normalizes it (strips comments, collapses whitespace, reflows
  to one declaration per line for reviewable diffs), and compares it against
  the committed `test/__snapshots__/animxyz.css`. If you intentionally
  change compiled output, regenerate the snapshot with:

  ```sh
  npm run test:update-snapshot
  ```

  then review the resulting `git diff` and explain the change in your PR
  description — don't just regenerate and commit blindly.
- **Size budget** (`test/size-budget.test.js`) — asserts the gzipped size of
  `dist/animxyz.min.css` stays under a fixed byte budget (measured size +
  10% headroom). If a change intentionally grows the output, remeasure and
  update `BUDGET_BYTES` in that file with justification in the PR.

## Building from source

This package requires **Dart Sass** to compile `src/*.scss` (see `sass` in
`devDependencies`).

**Minimum Dart Sass version: 1.57.0.** The source uses `sass:string`'s
`string.split()`, which was added in Dart Sass 1.57. If you `@use` this
package's `src/*.scss` directly (rather than consuming the prebuilt
`dist/animxyz.css`), make sure your own Sass compiler is at least 1.57.
