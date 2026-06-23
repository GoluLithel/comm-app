import './ModalShell.css'

export default function RemoveShareModal({ name, onCancel, onConfirm }) {
  return (
    <>
      <div className="modal-danger-icon">!</div>
      <h3 className="modal-title">Remove access</h3>
      <p className="modal-body">
        Remove <b className="modal-body__strong">{name}</b> from this file? They'll no longer be able to view it.
      </p>
      <div className="modal-actions">
        <button className="modal-btn-cancel btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn-delete btn-delete" onClick={onConfirm}>
          Remove
        </button>
      </div>
    </>
  )
}
