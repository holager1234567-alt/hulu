import fs from 'node:fs'

const file = new URL('../src/index.css', import.meta.url)
const css = fs.readFileSync(file, 'utf8')

const roots = [
  'compare-mockup',
  'pain-points-deck',
  'pain-point-card',
  'pain-points-cta-wrap--reveal',
  'hero-showcase',
  'splash-screen',
  'splash-grid',
  'splash-progress-fill',
  'hero-carousel',
  'benefits-scroll',
  'benefits-section',
  'value-grid',
]

const orphanKeyframes = ['hero-showcase', 'hero-carousel', 'hero-shape', 'pain-point-flash']

function isOrphanSelector(selector) {
  const trimmed = selector.trim()
  if (trimmed.includes('.pin-spacer:has(.benefits-section)')) return true
  if (trimmed.includes('.pin-spacer:has(.pain-points-deck-pin)')) return true
  return roots.some((root) => trimmed.includes(`.${root}`))
}

function extractBlock(input, braceStart) {
  let depth = 0
  for (let i = braceStart; i < input.length; i += 1) {
    if (input[i] === '{') depth += 1
    else if (input[i] === '}') {
      depth -= 1
      if (depth === 0) return { content: input.slice(braceStart, i + 1), end: i + 1 }
    }
  }
  return { content: input.slice(braceStart), end: input.length }
}

function stripRules(input) {
  let out = ''
  let i = 0

  while (i < input.length) {
    if (input.startsWith('/*', i)) {
      const end = input.indexOf('*/', i + 2)
      if (end === -1) break
      out += input.slice(i, end + 2)
      i = end + 2
      continue
    }

    if (input[i] === '@') {
      const brace = input.indexOf('{', i)
      if (brace === -1) break
      const header = input.slice(i, brace).trim()

      if (
        header.startsWith('@media') ||
        header.startsWith('@supports') ||
        header.startsWith('@layer')
      ) {
        const block = extractBlock(input, brace)
        const inner = block.content.slice(1, -1)
        const strippedInner = stripRules(inner)
        if (strippedInner.replace(/\s+/g, '').length === 0) {
          i = block.end
          continue
        }
        out += `${header} {${strippedInner}}`
        i = block.end
        continue
      }

      if (header.startsWith('@keyframes')) {
        const name = header.split(/\s+/)[1] ?? ''
        const block = extractBlock(input, brace)
        if (orphanKeyframes.some((key) => name.includes(key))) {
          i = block.end
          continue
        }
        out += input.slice(i, block.end)
        i = block.end
        continue
      }

      const block = extractBlock(input, brace)
      out += input.slice(i, block.end)
      i = block.end
      continue
    }

    const brace = input.indexOf('{', i)
    if (brace === -1) {
      out += input.slice(i)
      break
    }

    const selector = input.slice(i, brace)
    const block = extractBlock(input, brace)

    if (isOrphanSelector(selector)) {
      i = block.end
      continue
    }

    out += selector + block.content
    i = block.end
  }

  return out
}

const layerToken = '@layer utilities {'
const layerStart = css.indexOf(layerToken)
const layerEnd = css.indexOf('\n@layer components {')
const inner = css.slice(layerStart + layerToken.length, layerEnd)
const strippedInner = stripRules(inner).replace(/\n{3,}/g, '\n\n')
const cleaned = `${css.slice(0, layerStart + layerToken.length)}${strippedInner}${css.slice(layerEnd)}`

fs.writeFileSync(file, cleaned)
console.log(
  `CSS bytes before: ${css.length}, after: ${cleaned.length}, saved: ${css.length - cleaned.length}`,
)
