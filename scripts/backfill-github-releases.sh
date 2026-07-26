#!/usr/bin/env bash
#
# One-time backfill of GitHub Releases for the Changesets-era tags.
#
# Why this exists
# ---------------
# The repo has 46 git tags but zero GitHub Releases, so the "Releases" panel on
# the repo page has always been empty. Two separate causes:
#
#   1. `changeset publish` (what `npm run release` runs) creates git tags but
#      never creates GitHub Releases. Only the Changesets GitHub Action does
#      that. See .github/workflows/release.yml, which fixes this going forward.
#
#   2. The 0.6.9 publish reached npm but its tags were never pushed —
#      `changeset publish` tags locally and relies on a follow-up
#      `git push --follow-tags`. So npm has @animxyz/{react,vue,vue3}@0.6.9
#      while the newest tags on GitHub are @0.6.8.
#
# This script fixes both for the existing history: it creates the three missing
# 0.6.9 tags, then files a GitHub Release for each Changesets-era tag using the
# notes already written in packages/<pkg>/CHANGELOG.md.
#
# The 42 Lerna-era `v*` tags (v0.0.1 .. v0.6.7) are deliberately left alone.
# They are repo-level tags from the fixed-versioning era, not package tags, and
# most of their changelog entries are "Version bump only for package animxyz".
#
# Notes are extracted from the changelogs at run time rather than hardcoded here
# so this can't drift from the source of truth.
#
# Usage
# -----
#   scripts/backfill-github-releases.sh            # dry run (default)
#   scripts/backfill-github-releases.sh --apply    # actually push tags + create releases
#
# Requires: gh (authenticated with repo write access), node, git.
# Safe to re-run: existing tags and releases are skipped, not overwritten.

set -euo pipefail

REPO="ingram-projects/animxyz"

# GitHub allows exactly one release to carry the "Latest" badge. With
# independent versioning there is no single project version, so pick the tag
# that should represent the project on the repo page.
LATEST_TAG='@animxyz/vue@0.6.9'

# pkg|version|anchor-commit-if-tag-missing
# Ordered oldest -> newest so the release list reads chronologically.
# An empty anchor means the tag must already exist; the script errors if it
# doesn't rather than guessing where to put it.
RELEASES=(
	'core|0.6.7|'
	'react|0.6.8|'
	'vue|0.6.8|'
	'vue3|0.6.8|'
	'react|0.6.9|57c985e'
	'vue|0.6.9|57c985e'
	'vue3|0.6.9|57c985e'
)

APPLY=false
[[ "${1:-}" == "--apply" ]] && APPLY=true

log() { printf '%b\n' "$*"; }
die() {
	printf 'error: %s\n' "$*" >&2
	exit 1
}
run() {
	if $APPLY; then
		"$@"
	else
		log "  [dry-run] would run: $*"
	fi
}

# --- preflight ---------------------------------------------------------------

[[ -f package.json && -d packages ]] || die "run this from the repo root"
command -v gh >/dev/null || die "gh CLI not found — https://cli.github.com"
command -v node >/dev/null || die "node not found"
gh auth status >/dev/null 2>&1 || die "gh is not authenticated — run: gh auth login"

$APPLY || log "DRY RUN — no tags pushed, no releases created. Re-run with --apply to commit.\n"

log "Fetching from origin..."
git fetch --quiet origin || die "could not reach origin"

# `git fetch --tags` exits non-zero when a local tag points somewhere other than
# origin's ("would clobber existing tag"), which under `set -e` would kill this
# script with no explanation. Remote state is read via ls-remote below, so this
# fetch is only a convenience for having tag objects locally — never fatal. Any
# real disagreement is reported per-tag as DIVERGED.
git fetch --tags --quiet origin 2>/dev/null ||
	log "  note: one or more local tags disagree with origin (reported per-tag below)"

# Tag presence MUST be judged against origin, not the local repo. The machine
# that ran `changeset publish` still has the 0.6.9 tags locally even though they
# were never pushed, and `git fetch --tags` above makes local a superset of
# origin — so a local `rev-parse` cannot tell "synced" from "local only".
remote_tag_sha() {
	local out
	out="$(git ls-remote --tags origin "refs/tags/${1}" "refs/tags/${1}^{}" 2>/dev/null || true)"
	[[ -n "$out" ]] || return 0
	# Annotated tags list both the tag object and its peeled commit; prefer peeled.
	awk '/\^\{\}$/ { peeled = $1 } !/\^\{\}$/ { plain = $1 } END { print (peeled != "" ? peeled : plain) }' <<<"$out"
}

local_tag_sha() { git rev-parse -q --verify "refs/tags/${1}^{commit}" 2>/dev/null || true; }

# Extract the changelog section for one version. Changesets-era headings are a
# bare "## X.Y.Z"; Lerna-era ones are "## [X.Y.Z](compare-link) (date)", so an
# exact match on the bare form keeps us in the Changesets era only.
notes_for() {
	local changelog="$1" version="$2"
	node -e '
		const [file, version] = process.argv.slice(1);
		const lines = require("fs").readFileSync(file, "utf8").split("\n");
		const start = lines.findIndex((l) => l.trim() === `## ${version}`);
		if (start === -1) {
			process.stderr.write(`no "## ${version}" heading in ${file}\n`);
			process.exit(1);
		}
		const rest = lines.slice(start + 1);
		const end = rest.findIndex((l) => l.startsWith("## "));
		const body = (end === -1 ? rest : rest.slice(0, end)).join("\n").replace(/^\n+|\n+$/g, "");
		if (!body) {
			process.stderr.write(`empty release notes for ${version} in ${file}\n`);
			process.exit(1);
		}
		process.stdout.write(body + "\n");
	' "$changelog" "$version"
}

# --- 1. create any missing tags ---------------------------------------------

log "\n== Tags =="
new_tags=()
for entry in "${RELEASES[@]}"; do
	IFS='|' read -r pkg version anchor <<<"$entry"
	tag="@animxyz/${pkg}@${version}"

	remote_sha="$(remote_tag_sha "$tag")"
	local_sha="$(local_tag_sha "$tag")"

	# Already on origin — nothing to do, but flag a local/remote disagreement
	# rather than silently trusting either side.
	if [[ -n "$remote_sha" ]]; then
		if [[ -n "$local_sha" && "$local_sha" != "$remote_sha" ]]; then
			log "  DIVERGED  ${tag}: local ${local_sha:0:9} != origin ${remote_sha:0:9} (origin left as-is)"
		else
			log "  on origin ${tag}"
		fi
		continue
	fi

	# Exists locally but was never pushed — this is the 0.6.9 case. Push the tag
	# that `changeset publish` actually created rather than re-deriving it; the
	# real publish commit is more authoritative than our configured anchor.
	if [[ -n "$local_sha" ]]; then
		log "  unpushed  ${tag} -> will push ($(git log -1 --format='%h %s' "$local_sha" 2>/dev/null))"
		new_tags+=("$tag")
		continue
	fi

	# Absent everywhere — create it at the configured anchor commit.
	[[ -n "$anchor" ]] || die "tag ${tag} exists neither on origin nor locally, and no anchor commit is configured for it"
	git rev-parse -q --verify "${anchor}^{commit}" >/dev/null ||
		die "anchor commit ${anchor} for ${tag} not found locally — try: git fetch --unshallow"

	log "  creating  ${tag} at ${anchor} ($(git log -1 --format='%s' "$anchor"))"
	run git tag "$tag" "$anchor"
	new_tags+=("$tag")
done

if ((${#new_tags[@]})); then
	# Push exactly the tags created above, not --tags, so unrelated local tags
	# are never pushed as a side effect.
	log "\n  pushing ${#new_tags[@]} new tag(s) to origin"
	run git push origin "${new_tags[@]}"
else
	log "\n  all tags already present — nothing to push"
fi

# --- 2. create the releases --------------------------------------------------

log "\n== Releases =="
for entry in "${RELEASES[@]}"; do
	IFS='|' read -r pkg version _anchor <<<"$entry"
	tag="@animxyz/${pkg}@${version}"
	changelog="packages/${pkg}/CHANGELOG.md"

	if gh release view "$tag" --repo "$REPO" >/dev/null 2>&1; then
		log "  exists   ${tag} — skipping"
		continue
	fi

	notes="$(notes_for "$changelog" "$version")" ||
		die "could not extract notes for ${tag} from ${changelog}"

	# --verify-tag refuses to invent a tag server-side if the push above failed.
	latest_flag='--latest=false'
	[[ "$tag" == "$LATEST_TAG" ]] && latest_flag='--latest'

	log "  creating ${tag}  (notes: $(wc -l <<<"$notes" | tr -d ' ') lines) ${latest_flag}"
	if $APPLY; then
		gh release create "$tag" \
			--repo "$REPO" \
			--title "@animxyz/${pkg} ${version}" \
			--notes "$notes" \
			--verify-tag \
			"$latest_flag"
	else
		log "  [dry-run] would run: gh release create ${tag} --title \"@animxyz/${pkg} ${version}\" --notes <${changelog} §${version}> --verify-tag ${latest_flag}"
	fi
done

log "\nDone."
$APPLY || log "This was a dry run. Re-run with --apply to make the changes."
