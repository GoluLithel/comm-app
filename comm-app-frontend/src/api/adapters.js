export function fmtTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return (
    String(d.getHours()).padStart(2, '0') +
    ':' +
    String(d.getMinutes()).padStart(2, '0')
  )
}

export function toMessage(m) {
  return {
    id: m.id,
    name: m.sender?.name || 'Unknown',
    email: m.sender?.email || '',
    text: m.content,
    time: fmtTime(m.createdAt),
  }
}

export function toMyUpload(d) {
  return {
    id: d.id,
    label: d.label,
    file: d.fileName,
    sharedWith: (d.shares || []).map((s) => ({
      name: s.user?.name,
      email: s.user?.email,
    })),
  }
}

export function toSharedUpload(d) {
  return {
    label: d.label,
    file: d.fileName,
    by: d.owner?.email || '',
  }
}
