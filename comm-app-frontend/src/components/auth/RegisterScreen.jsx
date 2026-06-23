import './RegisterScreen.css'

export default function RegisterScreen({ reg, onChange, error, onSubmit, onBack, onLogin }) {
  return (
    <div className="register-card anim-pop">
      <button className="register-card__back btn-back" onClick={onBack}>
        ← Back
      </button>
      <h1 className="register-card__title">Create your account</h1>
      <p className="register-card__subtitle">Join your team on CommApp.</p>
      <form onSubmit={onSubmit}>
        <div className="register-card__field">
          <label className="register-card__label">Full name</label>
          <input
            className="register-card__input input-field"
            value={reg.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Anne Hunter"
          />
        </div>
        <div className="register-card__field">
          <label className="register-card__label">Email</label>
          <input
            className="register-card__input input-field"
            type="email"
            value={reg.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="register-card__row">
          <div className="register-card__col">
            <label className="register-card__label">Password</label>
            <input
              className="register-card__input input-field"
              type="password"
              value={reg.pass}
              onChange={(e) => onChange('pass', e.target.value)}
              placeholder="••••••"
            />
          </div>
          <div className="register-card__col">
            <label className="register-card__label">Confirm</label>
            <input
              className="register-card__input input-field"
              type="password"
              value={reg.confirm}
              onChange={(e) => onChange('confirm', e.target.value)}
              placeholder="••••••"
            />
          </div>
        </div>
        {error && <div className="register-card__error">{error}</div>}
        <button className="register-card__submit btn-primary" type="submit">
          Create account
        </button>
      </form>
      <p className="register-card__footer">
        Already have an account?{' '}
        <span className="register-card__footer-link" onClick={onLogin}>
          Log in
        </span>
      </p>
    </div>
  )
}
