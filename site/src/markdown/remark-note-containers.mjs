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
 * top. We post-process the parsed mdast and support both standalone opener/
 * closer paragraphs and blocks where the opener/closer share a paragraph with
 * the note body (the common docs format without blank lines).
 */
export default function remarkNoteContainers() {
  return (tree) => {
    const children = tree.children
    let i = 0
    while (i < children.length) {
      const open = detectOpener(children[i])
      if (!open) {
        i += 1
        continue
      }

      const end = findBlockEnd(children, i)
      if (end < 0) {
        i += 1
        continue
      }

      const inner = extractInner(children, i, end, open.mode)
      const classes = ['note']
      const tagsHtmlNodes = []

      if (open.tags.length) {
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

      children.splice(i, end - i + 1, wrapper)
      i += 1
    }
  }
}

const OPENER_PREFIX_RE = /^:::\s*note\s*(?:\[(.*?)\])?\s*(?:\n|$)/
const OPENER_STANDALONE_RE = /^:::\s*note\s*(?:\[(.*?)\])?\s*$/
const CLOSER_SUFFIX_RE = /\n:::\s*$/

function paragraphText(node) {
  if (!node || node.type !== 'paragraph' || !Array.isArray(node.children)) return ''
  return node.children.map((c) => (c.type === 'text' ? c.value : '')).join('')
}

function parseTags(tagsStr) {
  if (!tagsStr) return []
  return tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
}

function detectOpener(node) {
  if (!node || node.type !== 'paragraph') return null

  const text = paragraphText(node).trim()
  const standalone = text.match(OPENER_STANDALONE_RE)
  if (standalone) {
    return { tags: parseTags(standalone[1]), mode: 'standalone' }
  }

  const first = node.children?.[0]
  if (first?.type === 'text') {
    const embedded = first.value.match(OPENER_PREFIX_RE)
    if (embedded) {
      return { tags: parseTags(embedded[1]), mode: 'embedded' }
    }
  }

  return null
}

function hasStandaloneCloser(node) {
  return node?.type === 'paragraph' && paragraphText(node).trim() === ':::'
}

function hasEmbeddedCloser(node) {
  const last = node?.children?.[node.children.length - 1]
  return last?.type === 'text' && CLOSER_SUFFIX_RE.test(last.value)
}

function findBlockEnd(children, start) {
  for (let j = start; j < children.length; j++) {
    const node = children[j]
    if (node.type !== 'paragraph') continue
    if (j > start && hasStandaloneCloser(node)) return j
    if (hasEmbeddedCloser(node)) return j
  }
  return -1
}

function cloneParagraph(node) {
  return structuredClone(node)
}

function stripOpener(node) {
  const cloned = cloneParagraph(node)
  const first = cloned.children[0]
  if (first?.type === 'text') {
    const match = first.value.match(OPENER_PREFIX_RE)
    if (match) {
      first.value = first.value.slice(match[0].length)
      if (first.value === '') cloned.children.shift()
    }
  }
  return isEmptyParagraph(cloned) ? null : cloned
}

function stripCloser(node) {
  const cloned = cloneParagraph(node)
  const last = cloned.children[cloned.children.length - 1]
  if (last?.type === 'text') {
    last.value = last.value.replace(CLOSER_SUFFIX_RE, '')
    if (last.value === '') cloned.children.pop()
  }
  return isEmptyParagraph(cloned) ? null : cloned
}

function isEmptyParagraph(node) {
  if (!node?.children?.length) return true
  return paragraphText(node).trim() === '' && !node.children.some((c) => c.type !== 'text')
}

function extractInner(children, start, end, openerMode) {
  const inner = []

  for (let k = start; k <= end; k++) {
    if (openerMode === 'standalone' && k === start) continue
    if (hasStandaloneCloser(children[k]) && k === end && k !== start) continue

    let node = cloneParagraph(children[k])

    if (k === start && openerMode === 'embedded') {
      node = stripOpener(node)
    }
    if (hasEmbeddedCloser(children[k])) {
      node = node ? stripCloser(node) : null
    }

    if (node) inner.push(node)
  }

  return inner
}
