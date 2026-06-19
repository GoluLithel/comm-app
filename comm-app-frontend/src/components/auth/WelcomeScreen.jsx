export default function WelcomeScreen({ loggedOut, onLogin, onRegister }) {
  return (
    <div
      className="anim-pop"
      style={{
        width: '100%',
        maxWidth: 430,
        background: '#fff',
        border: '1px solid #e9ebf4',
        borderRadius: 24,
        boxShadow: '0 30px 70px -34px rgba(40,46,90,.4)',
        padding: '36px 32px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ margin: '0 0 8px', fontSize: 25, fontWeight: 800, letterSpacing: '-.02em' }}>
        Welcome to CommApp
      </h1>
      <p style={{ margin: '0 0 26px', color: '#767c99', fontSize: 15, lineHeight: 1.55 }}>
        Your team's hub for chat, people and shared documents — all in one place.
      </p>
      {loggedOut && (
        <div
          style={{
            margin: '0 0 20px',
            padding: '11px 14px',
            borderRadius: 13,
            background: '#eef0fe',
            color: '#4f46e5',
            fontWeight: 700,
            fontSize: 13.5,
          }}
        >
          You've been logged out.
        </div>
      )}
      <div
        style={{
          textAlign: 'left',
          fontSize: 12,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '.07em',
          color: '#9aa0ba',
          margin: '0 0 9px',
        }}
      >
        Existing users
      </div>
      <button
        className="btn-primary"
        onClick={onLogin}
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
          marginBottom: 20,
        }}
      >
        Log in
      </button>
      <div
        style={{
          textAlign: 'left',
          fontSize: 12,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '.07em',
          color: '#9aa0ba',
          margin: '0 0 9px',
        }}
      >
        New users
      </div>
      <button
        className="btn-create-account"
        onClick={onRegister}
        style={{
          width: '100%',
          padding: 14,
          borderRadius: 14,
          border: '1.5px solid #d9dcec',
          background: '#fff',
          color: '#4f46e5',
          fontWeight: 800,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        Create an account
      </button>
    </div>
  )
}
