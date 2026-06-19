import { avStyle, fileBadge, initials, nameFromEmail } from '../../utils/helpers'

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  flexWrap: 'wrap',
  background: '#fff',
  border: '1px solid #e8eaf3',
  borderRadius: 18,
  padding: '14px 18px',
}

export default function DocumentsListView({
  myUploads,
  sharedUploads,
  onOpenUpload,
  onEdit,
  onShare,
  onDelete,
}) {
  return (
    <div className="anim-fade">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          margin: '4px 2px 14px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, whiteSpace: 'nowrap' }}>My uploads</h2>
        <button
          className="btn-primary"
          onClick={onOpenUpload}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: 'none',
            background: '#4f46e5',
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flex: '0 0 auto',
          }}
        >
          + Add upload
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {myUploads.map((d) => {
          const fi = fileBadge(d.file)
          const shareLabel = d.sharedWith.length ? `Shared · ${d.sharedWith.length}` : 'Private'
          return (
            <div key={d.id} style={rowStyle}>
              <div style={fi.style}>{fi.ext}</div>
              <div style={{ flex: '1 1 190px', minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15.5 }}>{d.label}</div>
                <div style={{ fontSize: 13, color: '#8a90ab', marginTop: 2 }}>{d.file}</div>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#6b7196',
                  background: '#f1f2fa',
                  padding: '5px 11px',
                  borderRadius: 999,
                }}
              >
                {shareLabel}
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(d)}
                  style={{
                    padding: '9px 15px',
                    borderRadius: 11,
                    border: '1.5px solid #e3e5f1',
                    background: '#fff',
                    color: '#4f46e5',
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-edit"
                  onClick={() => onShare(d)}
                  style={{
                    padding: '9px 15px',
                    borderRadius: 11,
                    border: '1.5px solid #e3e5f1',
                    background: '#fff',
                    color: '#4f46e5',
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: 'pointer',
                  }}
                >
                  Share
                </button>
                <button
                  className="btn-danger"
                  onClick={() => onDelete(d)}
                  style={{
                    padding: '9px 15px',
                    borderRadius: 11,
                    border: '1.5px solid #f3dadb',
                    background: '#fff',
                    color: '#e5484d',
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <h2 style={{ margin: '30px 2px 14px', fontSize: 21, fontWeight: 800 }}>Shared with me</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sharedUploads.map((d, i) => {
          const fi = fileBadge(d.file)
          const byAv = avStyle(d.by, 30, 10.5)
          return (
            <div key={i} style={rowStyle}>
              <div style={fi.style}>{fi.ext}</div>
              <div style={{ flex: '1 1 190px', minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15.5 }}>{d.label}</div>
                <div style={{ fontSize: 13, color: '#8a90ab', marginTop: 2 }}>{d.file}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={byAv}>{initials(nameFromEmail(d.by))}</div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: 11, color: '#a0a6c0', fontWeight: 700 }}>Shared by</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4a5072' }}>{d.by}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
