export default function RegisterSuccessScreen({ regName, onContinue, onBack }) {
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
        padding: '38px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#dff5ea',
          color: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
          fontWeight: 800,
          margin: '0 auto 18px',
        }}
      >
        ✓
      </div>
      <h1 style={{ margin: '0 0 8px', fontSize: 23, fontWeight: 800, letterSpacing: '-.02em' }}>
        You're all set
      </h1>
      <p style={{ margin: '0 0 26px', color: '#767c99', fontSize: 15, lineHeight: 1.55 }}>
        Welcome aboard, {regName || 'friend'}. Your account has been created.
      </p>
      <button
        className="btn-primary"
        onClick={onContinue}
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
          marginBottom: 12,
        }}
      >
        Continue to log in
      </button>
      <button
        onClick={onBack}
        style={{
          width: '100%',
          padding: 12,
          borderRadius: 14,
          border: 'none',
          background: 'none',
          color: '#8a90ab',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Back to home
      </button>
    </div>
  )
}
