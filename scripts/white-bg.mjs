import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const input = path.resolve(root, '../src/assets/hulu-portrait.png')
const output = path.resolve(root, '../src/assets/hulu-portrait-white.png')

const THRESHOLD = 16

function isBackground(r, g, b) {
  return r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height } = info
const total = width * height
const bg = new Uint8Array(total)
const queue = []

const idx = (x, y) => y * width + x
const px = (i) => i * 4

for (let x = 0; x < width; x += 1) {
  const i = idx(x, 0)
  if (!isBackground(data[px(i)], data[px(i) + 1], data[px(i) + 2])) continue
  bg[i] = 1
  queue.push(i)
}

while (queue.length) {
  const i = queue.pop()
  const x = i % width
  const y = (i - x) / width

  for (const [nx, ny] of [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]) {
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
    const ni = idx(nx, ny)
    if (bg[ni]) continue
    const p = px(ni)
    if (!isBackground(data[p], data[p + 1], data[p + 2])) continue
    bg[ni] = 1
    queue.push(ni)
  }
}

for (let i = 0; i < total; i += 1) {
  const p = px(i)
  if (bg[i]) {
    data[p] = 255
    data[p + 1] = 255
    data[p + 2] = 255
    data[p + 3] = 255
  }
}

const bottomStart = Math.floor(height * 0.9)
for (let y = bottomStart; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = idx(x, y)
    const p = px(i)
    if (isBackground(data[p], data[p + 1], data[p + 2])) {
      data[p] = 255
      data[p + 1] = 255
      data[p + 2] = 255
      data[p + 3] = 255
    }
  }
}

await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(output)

console.log(`Saved white background image to ${output}`)
