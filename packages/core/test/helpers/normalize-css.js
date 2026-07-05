'use strict'

/**
 * Normalize compiled CSS for snapshotting: strip comments and collapse
 * insignificant whitespace so the snapshot is stable across Sass/OS
 * formatting differences but still diffs meaningfully on real output changes.
 *
 * Output is re-flowed to one declaration/rule-boundary per line (rather than
 * one giant line) so that `git diff` on the committed snapshot stays
 * reviewable.
 *
 * @param {string} css
 * @returns {string}
 */
function normalizeCss(css) {
  const collapsed = css
    // Strip /* ... */ comments (CSS doesn't support nesting, so non-greedy is safe)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Collapse all whitespace runs (including newlines) to a single space
    .replace(/\s+/g, ' ')
    // Normalize spacing around common punctuation for a cleaner, still-meaningful diff
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim()

  // Re-flow onto one line per `{`, `}`, or `;`-terminated declaration so the
  // committed snapshot is line-diffable instead of one 100+KB line.
  return collapsed
    .replace(/([{}])/g, '$1\n')
    .replace(/;/g, ';\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n')
}

module.exports = { normalizeCss }
