import { FILE_TYPES, PALETTE } from '../data/constants'

export function initials(n) {
  return (n || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?'
}

export function acolors(seed) {
  const s = String(seed || '')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}

// Returns ONLY dynamic style — layout lives in the `.avatar` CSS class.
export function avStyle(seed, size, fs) {
  const [bg, fg] = acolors(seed)
  return {
    width: size + 'px',
    height: size + 'px',
    fontSize: fs + 'px',
    background: bg,
    color: fg,
  }
}

export function fmeta(file) {
  const ext = (String(file).split('.').pop() || '').toLowerCase()
  return FILE_TYPES[ext] || ['FILE', '#64748b', '#eef1f6']
}

// Layout lives in the `.file-badge` CSS class; only colors are dynamic.
export function fileBadge(file) {
  const [label, fg, bg] = fmeta(file)
  return {
    ext: label,
    style: { background: bg, color: fg },
  }
}

export function nameFromEmail(e) {
  const base = String(e).split('@')[0].replace(/[._-]+/g, ' ').trim()
  return (
    base
      .split(' ')
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
      .join(' ') || 'New User'
  )
}

export function nowTime() {
  const d = new Date()
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
}
