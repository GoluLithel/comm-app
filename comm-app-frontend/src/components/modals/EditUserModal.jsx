import './ModalShell.css'

export default function EditUserModal({ draft, onChange, onCancel, onSave }) {
  return (
    <>
      <h3 className="modal-title modal-title--no-icon">Edit user</h3>
      <div className="modal-field">
        <label className="modal-label">Full name</label>
        <input
          className="modal-input input-field"
          value={draft.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>
      <div className="modal-field--last">
        <label className="modal-label">Email</label>
        <input
          className="modal-input input-field"
          type="email"
          value={draft.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      <div className="modal-actions">
        <button className="modal-btn-cancel btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn-save btn-primary" onClick={onSave}>
          Save changes
        </button>
      </div>
    </>
  )
}
