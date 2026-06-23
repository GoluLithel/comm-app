import './ModalShell.css'

export default function EditDocModal({ draft, onChange, onCancel, onSave }) {
  return (
    <>
      <h3 className="modal-title modal-title--no-icon">Rename document</h3>
      <div className="modal-field--last">
        <label className="modal-label">File description</label>
        <input
          className="modal-input input-field"
          value={draft.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
        />
      </div>
      <div className="modal-actions">
        <button className="modal-btn-cancel btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn-save btn-primary" onClick={onSave}>
          Save
        </button>
      </div>
    </>
  )
}
