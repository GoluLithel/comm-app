const dangerIcon = {
  width: 54,
  height: 54,
  borderRadius: 16,
  background: '#fde7ea',
  color: '#e5484d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 26,
  fontWeight: 800,
  margin: '0 0 16px',
}

const cancelBtn = {
  padding: '11px 18px',
  borderRadius: 12,
  border: '1.5px solid #e6e8f3',
  background: '#fff',
  color: '#5b6180',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
}

const deleteBtn = {
  padding: '11px 18px',
  borderRadius: 12,
  border: 'none',
  background: '#e5484d',
  color: '#fff',
  fontWeight: 800,
  fontSize: 14,
  cursor: 'pointer',
}

export default function DeleteDocModal({ label, onCancel, onConfirm }) {
  return (
    <>
      <div style={dangerIcon}>!</div>
      <h3 style={{ margin: '0 0 7px', fontSize: 19, fontWeight: 800 }}>Delete document</h3>
      <p style={{ margin: '0 0 22px', color: '#767c99', fontSize: 14.5, lineHeight: 1.55 }}>
        Delete <b style={{ color: '#232842' }}>{label}</b>? This will permanently remove the file and its sharing.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button className="btn-outline" onClick={onCancel} style={cancelBtn}>
          Cancel
        </button>
        <button className="btn-delete" onClick={onConfirm} style={deleteBtn}>
          Delete
        </button>
      </div>
    </>
  )
}
