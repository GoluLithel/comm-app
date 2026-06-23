import './ModalShell.css'

export default function ModalShell({ onClose, children }) {
  const stop = (e) => e.stopPropagation()
  return (
    <div className="modal-backdrop anim-backdrop" onClick={onClose}>
      <div className="modal-panel anim-pop" onClick={stop}>
        {children}
      </div>
    </div>
  )
}
