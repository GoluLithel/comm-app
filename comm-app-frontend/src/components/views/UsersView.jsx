import { avStyle, initials } from '../../utils/helpers'

export default function UsersView({ users, onEdit, onDelete }) {
  return (
    <div className="anim-fade">
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '4px 2px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800 }}>Users</h2>
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 800,
            color: '#6b7196',
            background: '#eceef7',
            padding: '4px 11px',
            borderRadius: 999,
          }}
        >
          {users.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {users.map((u) => (
          <div
            key={u.email}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexWrap: 'wrap',
              background: '#fff',
              border: '1px solid #e8eaf3',
              borderRadius: 18,
              padding: '14px 18px',
            }}
          >
            <div style={avStyle(u.email, 46, 15)}>{initials(u.name)}</div>
            <div style={{ flex: '1 1 180px', minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 15.5 }}>{u.name}</div>
              <div style={{ fontSize: 13, color: '#8a90ab', marginTop: 2 }}>{u.email}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                className="btn-edit"
                onClick={() => onEdit(u)}
                style={{
                  padding: '9px 16px',
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
                className="btn-danger"
                onClick={() => onDelete(u)}
                style={{
                  padding: '9px 16px',
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
        ))}
      </div>
    </div>
  )
}
