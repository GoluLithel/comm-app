import './WelcomeScreen.css'

export default function WelcomeScreen({ loggedOut, onLogin, onRegister }) {
  return (
    <div className="welcome-card anim-pop">
      <h1 className="welcome-card__title">Welcome to CommApp</h1>
      <p className="welcome-card__subtitle">
        Your team's hub for chat, people and shared documents — all in one place.
      </p>
      {loggedOut && (
        <div className="welcome-card__logout-banner">You've been logged out.</div>
      )}
      <div className="welcome-card__section-label">Existing users</div>
      <button className="welcome-card__btn-login btn-primary" onClick={onLogin}>
        Log in
      </button>
      <div className="welcome-card__section-label">New users</div>
      <button className="welcome-card__btn-register btn-create-account" onClick={onRegister}>
        Create an account
      </button>
    </div>
  )
}
