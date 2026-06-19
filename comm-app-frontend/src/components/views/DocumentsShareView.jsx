import { avStyle, initials } from '../../utils/helpers'

export default function DocumentsShareView({
  target,
  shareCandidates,
  shareSelect,
  onShareSelectChange,
  onAddShare,
  onRemove,
  onBack,
}) {
  return (
    <div className="anim-fade">
      <button
        className="btn-back"
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#8a90ab',
          fontWeight: 700,
          fontSize: 13.5,
          cursor: 'pointer',
          padding: '2px 0',
          margin: '0 0 8px',
        }}
      >
        ← Back to documents
      </button>
      <div style={{ margin: '6px 0 20px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Share file</h2>
        <p style={{ margin: '6px 0 0', color: '#767c99', fontSize: 14.5 }}>{target.file}</p>
      </div>

      <h3 style={{ margin: '0 2px 12px', fontSize: 15, fontWeight: 800, color: '#4a5072' }}>
        People with access
      </h3>
      {target.sharedWith.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
          {target.sharedWith.map((s) => (
            <div
              key={s.email}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                flexWrap: 'wrap',
                background: '#fff',
                border: '1px solid #e8eaf3',
                borderRadius: 16,
                padding: '12px 16px',
              }}
            >
              <div style={avStyle(s.email, 40, 13.5)}>{initials(s.name)}</div>
              <div style={{ flex: '1 1 170px', minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>{s.name}</div>
                <div style={{ fontSize: 12.5, color: '#8a90ab' }}>{s.email}</div>
              </div>
              <button
                className="btn-danger"
                onClick={() => onRemove(s)}
                style={{
                  padding: '8px 15px',
                  borderRadius: 11,
                  border: '1.5px solid #f3dadb',
                  background: '#fff',
                  color: '#e5484d',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#fff',
            border: '1px dashed #d9dceb',
            borderRadius: 16,
            padding: 22,
            textAlign: 'center',
            color: '#8a90ab',
            fontSize: 14,
            marginBottom: 26,
          }}
        >
          Not shared with anyone yet.
        </div>
      )}

      <h3 style={{ margin: '0 2px 12px', fontSize: 15, fontWeight: 800, color: '#4a5072' }}>
        Add people
      </h3>
      <div
        style={{
          background: '#fff',
          border: '1px solid #e8eaf3',
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <select
          className="input-field"
          value={shareSelect}
          onChange={onShareSelectChange}
          style={{
            flex: '1 1 200px',
            minWidth: 0,
            padding: '12px 14px',
            borderRadius: 12,
            border: '1.5px solid #e3e5f1',
            background: '#fafbff',
            fontSize: 14.5,
            color: '#232842',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Choose a user…</option>
          {shareCandidates.map((c) => (
            <option key={c.id ?? c.email} value={c.id ?? c.email}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="btn-primary"
          onClick={onAddShare}
          style={{
            padding: '12px 20px',
            borderRadius: 12,
            border: 'none',
            background: '#4f46e5',
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            flex: '0 0 auto',
          }}
        >
          Add share
        </button>
      </div>
      {shareCandidates.length === 0 && (
        <p style={{ margin: '12px 2px 0', color: '#a0a6c0', fontSize: 13 }}>
          Everyone in your team already has access.
        </p>
      )}
    </div>
  )
}
