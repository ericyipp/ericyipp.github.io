// Minimal parser for the Windows .ani (animated cursor) RIFF format.
// Browsers have no native decoder for .ani, but they can render the
// individual .cur/.ico frames packed inside it via <img>, so we pull
// those frames out ourselves and drive the animation manually.

function readAscii(view, offset, length) {
  let s = ''
  for (let i = 0; i < length; i++) s += String.fromCharCode(view.getUint8(offset + i))
  return s
}

export async function loadAniFrames(url) {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  const view = new DataView(buf)

  if (readAscii(view, 0, 4) !== 'RIFF' || readAscii(view, 8, 4) !== 'ACON') {
    throw new Error(`Not a valid ANI file: ${url}`)
  }

  let header = null
  let rate = null
  let seq = null
  const iconBlobs = []

  let offset = 12
  while (offset < buf.byteLength - 8) {
    const id = readAscii(view, offset, 4)
    const size = view.getUint32(offset + 4, true)
    const dataStart = offset + 8

    if (id === 'anih') {
      header = {
        cFrames: view.getUint32(dataStart + 4, true),
        cSteps: view.getUint32(dataStart + 8, true),
        jifRate: view.getUint32(dataStart + 28, true),
      }
    } else if (id === 'rate') {
      rate = []
      for (let i = 0; i < size / 4; i++) rate.push(view.getUint32(dataStart + i * 4, true))
    } else if (id === 'seq ') {
      seq = []
      for (let i = 0; i < size / 4; i++) seq.push(view.getUint32(dataStart + i * 4, true))
    } else if (id === 'LIST') {
      const listType = readAscii(view, dataStart, 4)
      if (listType === 'fram') {
        let subOffset = dataStart + 4
        const listEnd = dataStart + size
        while (subOffset < listEnd) {
          const subId = readAscii(view, subOffset, 4)
          const subSize = view.getUint32(subOffset + 4, true)
          const subDataStart = subOffset + 8
          if (subId === 'icon') {
            const bytes = buf.slice(subDataStart, subDataStart + subSize)
            iconBlobs.push(new Blob([bytes], { type: 'image/x-icon' }))
          }
          subOffset += 8 + subSize + (subSize % 2)
        }
      }
    }

    offset += 8 + size + (size % 2)
  }

  if (!header || iconBlobs.length === 0) {
    throw new Error(`No frames found in ANI file: ${url}`)
  }

  const frameUrls = iconBlobs.map((blob) => URL.createObjectURL(blob))
  const steps = seq && seq.length ? seq : frameUrls.map((_, i) => i)
  const msFor = (jiffies) => Math.max(16, (jiffies || header.jifRate || 6) * (1000 / 60))

  return steps.map((frameIdx, stepIdx) => ({
    url: frameUrls[frameIdx] ?? frameUrls[0],
    duration: msFor(rate ? rate[stepIdx] : header.jifRate),
  }))
}
