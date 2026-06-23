import './ModalShell.css'

export default function DeleteUserModal({ name, onCancel, onConfirm }) {
  return (
    <>
      <div className="modal-danger-icon">!</div>
      <h3 className="modal-title">Delete user</h3>
      <p className="modal-body">
        Are you sure you want to remove <b className="modal-body__strong">{name}</b>? This action can't be undone.
      </p>
      <div className="modal-actions">
        <button className="modal-btn-cancel btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn-delete btn-delete" onClick={onConfirm}>
          Delete user
        </button>
      </div>
    </>
  )
}
