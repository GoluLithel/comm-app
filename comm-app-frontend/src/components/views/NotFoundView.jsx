import { useNavigate } from 'react-router-dom'

export default function NotFoundView({ authed }) {
  const navigate = useNavigate()
  const homePath = authed ? '/' : '/welcome'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 20px',
        background: 'radial-gradient(1100px 520px at 50% -8%, #e8ebfe 0%, #eef1f8 58%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 24 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            background: '#4f46e5',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 20,
            boxShadow: '0 10px 22px -8px rgba(79,70,229,.7)',
          }}
        >
          C
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em' }}>CommApp</div>
      </div>

      <div
        className="anim-pop"
        style={{
          width: '100%',
          maxWidth: 430,
          background: '#fff',
          border: '1px solid #e9ebf4',
          borderRadius: 24,
          boxShadow: '0 30px 70px -34px rgba(40,46,90,.4)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-.04em',
            lineHeight: 1,
            background: 'linear-gradient(135deg,#4f46e5 0%,#6d63ec 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 14,
          }}
        >
          404
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: 23, fontWeight: 800, letterSpacing: '-.02em' }}>
          Page not found
        </h1>
        <p style={{ margin: '0 0 26px', color: '#767c99', fontSize: 15, lineHeight: 1.55 }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <button
          className="btn-primary"
          onClick={() => navigate(homePath)}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 14,
            border: 'none',
            background: '#4f46e5',
            color: '#fff',
            fontWeight: 800,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          {authed ? 'Back to home' : 'Back to welcome'}
        </button>
      </div>
    </div>
  )
}
