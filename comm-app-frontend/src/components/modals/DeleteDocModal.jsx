import './ModalShell.css'

export default function DeleteDocModal({ label, onCancel, onConfirm }) {
  return (
    <>
      <div className="modal-danger-icon">!</div>
      <h3 className="modal-title">Delete document</h3>
      <p className="modal-body">
        Delete <b className="modal-body__strong">{label}</b>? This will permanently remove the file and its sharing.
      </p>
      <div className="modal-actions">
        <button className="modal-btn-cancel btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn-delete btn-delete" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </>
  )
}
