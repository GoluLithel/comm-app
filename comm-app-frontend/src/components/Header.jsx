import { useLocation, useNavigate } from 'react-router-dom'
import { avStyle, initials } from '../utils/helpers'
import './Header.css'

export default function Header({ currentUser, onLogout }) {
  const cu = currentUser || { name: '', email: '' }
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')
  const navClass = (path) => `nav-tab${isActive(path) ? ' nav-tab--active' : ''}`

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand" onClick={() => navigate('/')}>
          <div className="app-header__logo">C</div>
          <div className="app-header__title">CommApp</div>
        </div>
        <nav className="app-header__nav">
          <button className={navClass('/chat')} onClick={() => navigate('/chat')}>
            Group Chat
          </button>
          <button className={navClass('/users')} onClick={() => navigate('/users')}>
            Manage Users
          </button>
          <button className={navClass('/documents')} onClick={() => navigate('/documents')}>
            Manage Documents
          </button>
        </nav>
        <div className="app-header__user">
          <div className="avatar" style={avStyle(cu.email, 34, 13)}>{initials(cu.name)}</div>
          <div className="app-header__user-meta">
            <span className="app-header__user-name">{cu.name}</span>
            <span className="app-header__user-email">{cu.email}</span>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
