/**
 * Tiny replacement for the abandoned `remark-containers` plugin, hard-coded for
 * the only directive the docs site uses:
 *
 *     ::: note [Tag1,Tag2]
 *     body markdown
 *     :::
 *
 * Matches the original output: a `<div class="note ...">` wrapper around the
 * inner markdown, with an optional `<div class="note-tag__wrap">` of tags up
 * top. We do this by post-processing the parsed mdast: any paragraph whose
 * sole text child starts with `:::` is treated as an opener/closer.
 */
export default function remarkNoteContainers() {
  return (tree) => {
    const children = tree.children
    let i = 0
    while (i < children.length) {
      const node = children[i]
      const open = matchOpener(node)
      if (!open) {
        i += 1
        continue
      }
      // find the matching closer
      let j = i + 1
      while (j < children.length && !matchCloser(children[j])) {
        j += 1
      }
      if (j >= children.length) {
        // no closer found - leave as-is
        i += 1
        continue
      }

      const inner = children.slice(i + 1, j)
      const classes = ['note']
      const tagsHtmlNodes = []

      if (open.tags && open.tags.length) {
        classes.push('note--tagged')
        if (open.tags.length === 1) {
          classes.push(`note--${open.tags[0]}`)
        }
        const tagDivs = open.tags
          .map((tag) => `<div class="note-tag note-tag--${tag}">${tag}</div>`)
          .join('')
        tagsHtmlNodes.push({
          type: 'html',
          value: `<div class="note-tag__wrap">${tagDivs}</div>`,
        })
      }

      const wrapper = {
        type: 'paragraph',
        data: {
          hName: 'div',
          hProperties: { className: classes.join(' ') },
        },
        children: [...tagsHtmlNodes, ...inner],
      }

      children.splice(i, j - i + 1, wrapper)
      i += 1
    }
  }
}

function paragraphText(node) {
  if (!node || node.type !== 'paragraph' || !Array.isArray(node.children)) return null
  const text = node.children
    .map((c) => (c.type === 'text' ? c.value : ''))
    .join('')
    .trim()
  return text
}

function matchOpener(node) {
  const text = paragraphText(node)
  if (!text) return null
  // accept "::: note" or "::: note [Tag1,Tag2]"
  const m = text.match(/^:::\s*note\s*(?:\[(.*?)\])?\s*$/)
  if (!m) return null
  const tagsStr = m[1] || ''
  const tags = tagsStr
    ? tagsStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []
  return { tags }
}

function matchCloser(node) {
  const text = paragraphText(node)
  return text === ':::'
}
