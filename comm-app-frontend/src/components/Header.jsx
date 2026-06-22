import { useLocation, useNavigate } from 'react-router-dom'
import { avStyle, initials, tabStyle } from '../utils/helpers'

export default function Header({ currentUser, onLogout }) {
  const cu = currentUser || { name: '', email: '' }
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#f4f6fb', borderBottom: '1px solid #e6e8f3' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', flex: '0 0 auto' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              background: '#4f46e5',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 17,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>CommApp</div>
        </div>
        <nav
          style={{
            display: 'flex',
            gap: 5,
            background: '#eceef7',
            padding: 5,
            borderRadius: 999,
            overflowX: 'auto',
            flex: '1 1 auto',
            minWidth: 0,
            order: 3,
            width: '100%',
          }}
        >
          <button className="nav-tab" onClick={() => navigate('/chat')} style={tabStyle(isActive('/chat'))}>
            Group Chat
          </button>
          <button className="nav-tab" onClick={() => navigate('/users')} style={tabStyle(isActive('/users'))}>
            Manage Users
          </button>
          <button className="nav-tab" onClick={() => navigate('/documents')} style={tabStyle(isActive('/documents'))}>
            Manage Documents
          </button>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto', flex: '0 0 auto' }}>
          <div style={avStyle(cu.email, 34, 13)}>{initials(cu.name)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontWeight: 800, fontSize: 13.5 }}>{cu.name}</span>
            <span style={{ fontSize: 11.5, color: '#8a90ab' }}>{cu.email}</span>
          </div>
          <button
            className="btn-logout"
            onClick={onLogout}
            style={{
              marginLeft: 4,
              padding: '9px 15px',
              borderRadius: 11,
              border: '1.5px solid #e9eaf3',
              background: '#fff',
              color: '#5b6180',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
