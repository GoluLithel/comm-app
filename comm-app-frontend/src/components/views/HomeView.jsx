const cardBase = {
  textAlign: 'left',
  cursor: 'pointer',
  background: '#fff',
  border: '1px solid #e8eaf3',
  borderRadius: 20,
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}

const iconBox = (bg, color) => ({
  width: 46,
  height: 46,
  borderRadius: 14,
  background: bg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color,
  fontWeight: 800,
  fontSize: 20,
})

export default function HomeView({
  currentUser,
  messagesCount,
  usersCount,
  uploadsCount,
  sharedCount,
  onChat,
  onUsers,
  onDocs,
}) {
  const cu = currentUser || { name: '', email: '' }
  return (
    <div className="anim-fade">
      <div
        style={{
          background: 'linear-gradient(135deg,#4f46e5 0%,#6d63ec 100%)',
          borderRadius: 26,
          padding: '34px 32px',
          color: '#fff',
          boxShadow: '0 26px 54px -28px rgba(79,70,229,.75)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: 'rgba(255,255,255,.2)',
            padding: '5px 13px',
            borderRadius: 999,
            fontSize: 12.5,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          ● Login successful
        </div>
        <h1 style={{ margin: '0 0 6px', fontSize: 29, fontWeight: 800, letterSpacing: '-.025em' }}>
          Welcome back, {cu.name}
        </h1>
        <p style={{ margin: 0, opacity: 0.92, fontSize: 15 }}>{cu.email}</p>
      </div>
      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(232px,1fr))',
          gap: 16,
        }}
      >
        <button className="card-hover" onClick={onChat} style={cardBase}>
          <div style={iconBox('#e7e9fe', '#4f46e5')}>◷</div>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 800 }}>Group Chat</div>
            <div style={{ fontSize: 13.5, color: '#8a90ab', marginTop: 3 }}>
              Catch up with the team · {messagesCount} messages
            </div>
          </div>
        </button>
        <button
          className="card-hover-green"
          onClick={onUsers}
          style={{ ...cardBase, transition: 'border-color .15s ease, transform .15s ease' }}
        >
          <div style={iconBox('#d8f3ec', '#0f9d75')}>◑</div>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 800 }}>Manage Users</div>
            <div style={{ fontSize: 13.5, color: '#8a90ab', marginTop: 3 }}>
              {usersCount} people in your team
            </div>
          </div>
        </button>
        <button
          className="card-hover-amber"
          onClick={onDocs}
          style={{ ...cardBase, transition: 'border-color .15s ease, transform .15s ease' }}
        >
          <div style={iconBox('#fdeede', '#d97706')}>▤</div>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 800 }}>Manage Documents</div>
            <div style={{ fontSize: 13.5, color: '#8a90ab', marginTop: 3 }}>
              {uploadsCount} uploads · {sharedCount} shared with you
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
