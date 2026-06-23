import './LoginScreen.css'

export default function LoginScreen({
  loginEmail,
  loginPassword,
  onLoginEmail,
  onLoginPassword,
  onSubmit,
  onBack,
  onRegister,
  error,
}) {
  return (
    <div className="login-card anim-pop">
      <button className="login-card__back btn-back" onClick={onBack}>
        ← Back
      </button>
      <h1 className="login-card__title">Welcome back</h1>
      <p className="login-card__subtitle">Log in to your CommApp account.</p>
      <form onSubmit={onSubmit}>
        <div className="login-card__field">
          <label className="login-card__label">Email</label>
          <input
            className="login-card__input input-field"
            type="email"
            value={loginEmail}
            onChange={onLoginEmail}
            placeholder="you@company.com"
          />
        </div>
        <div className="login-card__field login-card__field--last">
          <label className="login-card__label">Password</label>
          <input
            className="login-card__input input-field"
            type="password"
            value={loginPassword}
            onChange={onLoginPassword}
            placeholder="••••••"
          />
        </div>
        {error && <div className="login-card__error">{error}</div>}
        <button className="login-card__submit btn-primary" type="submit">
          Log in
        </button>
      </form>
      <p className="login-card__footer">
        New here?{' '}
        <span className="login-card__footer-link" onClick={onRegister}>
          Create an account
        </span>
      </p>
    </div>
  )
}
