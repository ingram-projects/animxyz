# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets). It tracks pending version bumps and changelog entries for the `@animxyz/*` packages.

## Authoring a changeset

When you make a change that should ship in a release, run:

```bash
npm run changeset
```

This will prompt you to pick the affected packages and bump types (`patch` / `minor` / `major`) and write a Markdown file under `.changeset/`. Commit that file alongside your code change.

The `@animxyz/site` package is intentionally ignored — it's the internal docs website, not a published package.

## Releasing

Maintainers run, on the release branch:

```bash
npm run version-packages   # consume changesets, bump versions, update CHANGELOGs
npm run release            # build + npm publish
```
