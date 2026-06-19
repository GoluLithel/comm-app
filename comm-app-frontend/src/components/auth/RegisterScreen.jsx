const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1.5px solid #e3e5f1',
  background: '#fafbff',
  fontSize: 14.5,
  color: '#232842',
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  color: '#3a4063',
  margin: '0 0 7px',
}

export default function RegisterScreen({ reg, onChange, error, onSubmit, onBack, onLogin }) {
  return (
    <div
      className="anim-pop"
      style={{
        width: '100%',
        maxWidth: 440,
        background: '#fff',
        border: '1px solid #e9ebf4',
        borderRadius: 24,
        boxShadow: '0 30px 70px -34px rgba(40,46,90,.4)',
        padding: '32px 32px',
      }}
    >
      <button
        className="btn-back"
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#9097b3',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          padding: '2px 0',
          margin: '0 0 12px',
        }}
      >
        ← Back
      </button>
      <h1 style={{ margin: '0 0 6px', fontSize: 23, fontWeight: 800, letterSpacing: '-.02em' }}>
        Create your account
      </h1>
      <p style={{ margin: '0 0 22px', color: '#767c99', fontSize: 14.5 }}>
        Join your team on CommApp.
      </p>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={labelStyle}>Full name</label>
          <input
            className="input-field"
            value={reg.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Anne Hunter"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={labelStyle}>Email</label>
          <input
            className="input-field"
            type="email"
            value={reg.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@company.com"
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
          <div style={{ flex: '1 1 150px' }}>
            <label style={labelStyle}>Password</label>
            <input
              className="input-field"
              type="password"
              value={reg.pass}
              onChange={(e) => onChange('pass', e.target.value)}
              placeholder="••••••"
              style={inputStyle}
            />
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <label style={labelStyle}>Confirm</label>
            <input
              className="input-field"
              type="password"
              value={reg.confirm}
              onChange={(e) => onChange('confirm', e.target.value)}
              placeholder="••••••"
              style={inputStyle}
            />
          </div>
        </div>
        {error && (
          <div style={{ margin: '6px 0 0', color: '#e5484d', fontSize: 13, fontWeight: 700 }}>
            {error}
          </div>
        )}
        <button
          className="btn-primary"
          type="submit"
          style={{
            width: '100%',
            marginTop: 18,
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
          Create account
        </button>
      </form>
      <p style={{ margin: '20px 0 0', textAlign: 'center', color: '#767c99', fontSize: 14 }}>
        Already have an account?{' '}
        <span onClick={onLogin} style={{ color: '#4f46e5', fontWeight: 800, cursor: 'pointer' }}>
          Log in
        </span>
      </p>
    </div>
  )
}
