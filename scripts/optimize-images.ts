import { readdir, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const ROOT = 'src/public'
const MAX_WIDTH = 1600
const PHOTO_QUALITY = 82
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])

const GRAPHIC_FLAT_RUN = 0.42
const SAMPLE_SIZE = 512

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(path)
    } else {
      yield path
    }
  }
}

async function isGraphic(source: string): Promise<boolean> {
  const { data, info } = await sharp(source)
    .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { channels, width, height } = info
  let identical = 0
  let compared = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x + 1 < width; x++) {
      const a = (y * width + x) * channels
      const b = a + channels
      if (
        data[a] === data[b] &&
        data[a + 1] === data[b + 1] &&
        data[a + 2] === data[b + 2]
      ) {
        identical++
      }
      compared++
    }
  }

  return identical / compared > GRAPHIC_FLAT_RUN
}

async function isUpToDate(source: string, target: string): Promise<boolean> {
  try {
    const [from, to] = await Promise.all([stat(source), stat(target)])
    return to.mtimeMs >= from.mtimeMs
  } catch {
    return false
  }
}

function mb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

let totalBefore = 0
let totalAfter = 0
let skipped = 0

for await (const source of walk(ROOT)) {
  if (!SOURCE_EXTENSIONS.has(extname(source).toLowerCase())) continue

  const target = source.replace(/\.(png|jpe?g)$/i, '.webp')

  if (await isUpToDate(source, target)) {
    skipped += 1
    continue
  }

  const graphic = await isGraphic(source)

  await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp(graphic ? { lossless: true } : { quality: PHOTO_QUALITY })
    .toFile(target)

  const before = (await stat(source)).size
  const after = (await stat(target)).size
  totalBefore += before
  totalAfter += after

  const mode = graphic ? 'lossless' : `q${PHOTO_QUALITY}`
  console.log(`${source}\n  ${mb(before)} -> ${mb(after)}  [${mode}]`)
}

if (skipped > 0) console.log(`${skipped} already up to date`)
console.log(`Converted: ${mb(totalBefore)} -> ${mb(totalAfter)}`)
