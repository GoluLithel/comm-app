import { avStyle, initials } from '../../utils/helpers'
import './DocumentsShareView.css'

export default function DocumentsShareView({
  target,
  shareCandidates,
  shareSelect,
  onShareSelectChange,
  onAddShare,
  onRemove,
  onBack,
}) {
  return (
    <div className="anim-fade">
      <button className="share-back btn-back" onClick={onBack}>
        ← Back to documents
      </button>
      <div className="share-head">
        <h2 className="share-head__title">Share file</h2>
        <p className="share-head__file">{target.file}</p>
      </div>

      <h3 className="share-section-title">People with access</h3>
      {target.sharedWith.length > 0 ? (
        <div className="share-list">
          {target.sharedWith.map((s) => (
            <div key={s.email} className="share-row">
              <div className="avatar" style={avStyle(s.email, 40, 13.5)}>{initials(s.name)}</div>
              <div className="share-row__main">
                <div className="share-row__name">{s.name}</div>
                <div className="share-row__email">{s.email}</div>
              </div>
              <button className="share-row__btn-remove btn-danger" onClick={() => onRemove(s)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="share-empty">Not shared with anyone yet.</div>
      )}

      <h3 className="share-section-title">Add people</h3>
      <div className="share-add-card">
        <select
          className="share-add-card__select input-field"
          value={shareSelect}
          onChange={onShareSelectChange}
        >
          <option value="">Choose a user…</option>
          {shareCandidates.map((c) => (
            <option key={c.id ?? c.email} value={c.id ?? c.email}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="share-add-card__btn btn-primary" onClick={onAddShare}>
          Add share
        </button>
      </div>
      {shareCandidates.length === 0 && (
        <p className="share-no-candidates">Everyone in your team already has access.</p>
      )}
    </div>
  )
}
