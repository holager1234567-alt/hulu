import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const input = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(
      process.env.USERPROFILE ?? '',
      '.cursor/projects/c-Users-USER-Projects-hulu/assets/c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_66d75ce0c01665dfb01bc5a875853dca_images______-a262933d-1f15-4856-b696-d09a0b8fee3e.jpg',
    )
const output = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.resolve(root, '../public/images/hulu-hero-cloud-cutout.png')

/**
 * Studio backdrop is pure/near-pure black connected to the image border.
 * Subject clothing includes dark neutrals (often max RGB > 10 with slight chroma).
 * Only flood-fill removable background from edges — never key out interior dark pixels.
 */
const FLOOD_MAX = 10
const FLOOD_CHROMA_MAX = 6

/** Soft edge only on pixels touching removed background (anti-alias halo). */
const FEATHER_MAX = 16
const FEATHER_CHROMA_MAX = 8

function isFloodBackground(r, g, b) {
  const max = Math.max(r, g, b)
  if (max > FLOOD_MAX) return false
  return max - Math.min(r, g, b) <= FLOOD_CHROMA_MAX
}

function isFeatherPixel(r, g, b) {
  const max = Math.max(r, g, b)
  if (max > FEATHER_MAX) return false
  return max - Math.min(r, g, b) <= FEATHER_CHROMA_MAX
}

function featherAlpha(r, g, b) {
  const max = Math.max(r, g, b)
  const t = Math.min(1, max / FEATHER_MAX)
  return Math.round(t * t * 255)
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height } = info
const total = width * height
const removed = new Uint8Array(total)
const queue = []

const pushIfBg = (x, y) => {
  const idx = y * width + x
  if (removed[idx]) return
  const px = idx * 4
  if (!isFloodBackground(data[px], data[px + 1], data[px + 2])) return
  removed[idx] = 1
  queue.push(idx)
}

for (let x = 0; x < width; x++) {
  pushIfBg(x, 0)
  pushIfBg(x, height - 1)
}
for (let y = 0; y < height; y++) {
  pushIfBg(0, y)
  pushIfBg(width - 1, y)
}

while (queue.length) {
  const idx = queue.pop()
  const x = idx % width
  const y = (idx - x) / width
  if (x > 0) pushIfBg(x - 1, y)
  if (x < width - 1) pushIfBg(x + 1, y)
  if (y > 0) pushIfBg(x, y - 1)
  if (y < height - 1) pushIfBg(x, y + 1)
}

const touchesRemoved = (idx) => {
  const x = idx % width
  const y = (idx - x) / width
  if (x > 0 && removed[idx - 1]) return true
  if (x < width - 1 && removed[idx + 1]) return true
  if (y > 0 && removed[idx - width]) return true
  if (y < height - 1 && removed[idx + width]) return true
  return false
}

for (let idx = 0; idx < total; idx++) {
  const px = idx * 4
  const r = data[px]
  const g = data[px + 1]
  const b = data[px + 2]

  if (removed[idx]) {
    data[px + 3] = 0
    continue
  }

  if (touchesRemoved(idx) && isFeatherPixel(r, g, b)) {
    const edgeAlpha = featherAlpha(r, g, b)
    if (edgeAlpha < 255) data[px + 3] = Math.min(data[px + 3], edgeAlpha)
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9, palette: false })
  .toFile(output)

const meta = await sharp(output).metadata()
console.log(
  `Saved ${output} (${meta.width}x${meta.height}, ${(await import('node:fs')).statSync(output).size} bytes)`,
)
