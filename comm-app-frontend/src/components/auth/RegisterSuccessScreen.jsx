import './RegisterSuccessScreen.css'

export default function RegisterSuccessScreen({ regName, onContinue, onBack }) {
  return (
    <div className="register-success anim-pop">
      <div className="register-success__check">✓</div>
      <h1 className="register-success__title">You're all set</h1>
      <p className="register-success__subtitle">
        Welcome aboard, {regName || 'friend'}. Your account has been created.
      </p>
      <button className="register-success__btn-continue btn-primary" onClick={onContinue}>
        Continue to log in
      </button>
      <button className="register-success__btn-back" onClick={onBack}>
        Back to home
      </button>
    </div>
  )
}
