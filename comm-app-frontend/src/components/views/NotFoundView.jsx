import { useNavigate } from 'react-router-dom'
import './NotFoundView.css'

export default function NotFoundView({ authed }) {
  const navigate = useNavigate()
  const homePath = authed ? '/' : '/welcome'

  return (
    <div className="not-found">
      <div className="not-found__brand">
        <div className="not-found__logo">C</div>
        <div className="not-found__brand-text">CommApp</div>
      </div>

      <div className="not-found__card anim-pop">
        <div className="not-found__big">404</div>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__subtitle">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <button className="not-found__btn btn-primary" onClick={() => navigate(homePath)}>
          {authed ? 'Back to home' : 'Back to welcome'}
        </button>
      </div>
    </div>
  )
}
