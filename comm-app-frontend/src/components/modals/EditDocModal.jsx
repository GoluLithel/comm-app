const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1.5px solid #e3e5f1',
  background: '#fafbff',
  fontSize: 14.5,
  color: '#232842',
  outline: 'none',
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

const saveBtn = {
  padding: '11px 20px',
  borderRadius: 12,
  border: 'none',
  background: '#4f46e5',
  color: '#fff',
  fontWeight: 800,
  fontSize: 14,
  cursor: 'pointer',
}

export default function EditDocModal({ draft, onChange, onCancel, onSave }) {
  return (
    <>
      <h3 style={{ margin: '0 0 18px', fontSize: 19, fontWeight: 800 }}>Rename document</h3>
      <div style={{ marginBottom: 22 }}>
        <label
          style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#3a4063', margin: '0 0 7px' }}
        >
          File description
        </label>
        <input
          className="input-field"
          value={draft.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button className="btn-outline" onClick={onCancel} style={cancelBtn}>
          Cancel
        </button>
        <button className="btn-primary" onClick={onSave} style={saveBtn}>
          Save
        </button>
      </div>
    </>
  )
}
