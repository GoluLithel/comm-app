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

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  color: '#3a4063',
  margin: '0 0 7px',
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

export default function UploadModal({ draft, onChange, onFile, onCancel, onUpload }) {
  return (
    <>
      <h3 style={{ margin: '0 0 18px', fontSize: 19, fontWeight: 800 }}>Upload document</h3>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>File description</label>
        <input
          className="input-field"
          value={draft.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
          placeholder="e.g. Sales Report"
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>File</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label
            className="btn-ghost-indigo"
            style={{
              padding: '10px 16px',
              borderRadius: 11,
              border: '1.5px solid #d9dcec',
              background: '#f6f7fd',
              color: '#4f46e5',
              fontWeight: 700,
              fontSize: 13.5,
              cursor: 'pointer',
              flex: '0 0 auto',
            }}
          >
            Choose file
            <input
              type="file"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0]
                onFile(f ? f.name : '')
              }}
              style={{ display: 'none' }}
            />
          </label>
          {draft.file ? (
            <span
              style={{
                fontSize: 13.5,
                color: '#4a5072',
                fontWeight: 700,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {draft.file}
            </span>
          ) : (
            <span style={{ fontSize: 13.5, color: '#a0a6c0' }}>No file selected</span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button className="btn-outline" onClick={onCancel} style={cancelBtn}>
          Cancel
        </button>
        <button className="btn-primary" onClick={onUpload} style={saveBtn}>
          Upload now
        </button>
      </div>
    </>
  )
}
