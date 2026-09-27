import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portfolioDir = path.join(__dirname, '../public/images/portfolio')

const files = [
  'master-money-monitor.png',
  'noa-pilates-monitor.png',
  'cohen-law-monitor.png',
  'mels-school-monitor.png',
  'ride-yoav-monitor.png',
]

/** Edge-connected near-white only — keeps silver monitor stands (often ~235 avg). */
const WHITE_CHANNEL_MIN = 248
const CHROMA_MAX = 18

function isBackgroundPixel(r, g, b) {
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  return min >= WHITE_CHANNEL_MIN && max - min <= CHROMA_MAX
}

async function removeWhiteBg(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const visited = new Uint8Array(width * height)
  const queue = []

  const pushIfBg = (x, y) => {
    const idx = y * width + x
    if (visited[idx]) return
    const px = idx * 4
    if (!isBackgroundPixel(data[px], data[px + 1], data[px + 2])) return
    visited[idx] = 1
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

  for (let idx = 0; idx < width * height; idx++) {
    if (!visited[idx]) continue
    data[idx * 4 + 3] = 0
  }

  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(outputPath)
}

for (const file of files) {
  const input = path.join(portfolioDir, file)
  const output = path.join(portfolioDir, file.replace('.png', '-nobg.png'))
  await removeWhiteBg(input, output)
  console.log(`OK ${file} -> ${path.basename(output)}`)
}
