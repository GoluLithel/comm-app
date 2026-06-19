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

export function avStyle(seed, size, fs) {
  const [bg, fg] = acolors(seed)
  return {
    width: size + 'px',
    height: size + 'px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: fs + 'px',
    background: bg,
    color: fg,
    flex: '0 0 auto',
  }
}

export function fmeta(file) {
  const ext = (String(file).split('.').pop() || '').toLowerCase()
  return FILE_TYPES[ext] || ['FILE', '#64748b', '#eef1f6']
}

export function fileBadge(file) {
  const [label, fg, bg] = fmeta(file)
  return {
    ext: label,
    style: {
      width: '46px',
      height: '46px',
      borderRadius: '13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: '11.5px',
      letterSpacing: '.03em',
      background: bg,
      color: fg,
      flex: '0 0 auto',
    },
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

export function tabStyle(active) {
  return {
    padding: '9px 17px',
    borderRadius: '999px',
    border: 'none',
    background: active ? '#4f46e5' : 'transparent',
    color: active ? '#fff' : '#5b6180',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flex: '0 0 auto',
  }
}
