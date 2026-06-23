import './ModalShell.css'
import './UploadModal.css'

export default function UploadModal({ draft, onChange, onFile, onCancel, onUpload }) {
  return (
    <>
      <h3 className="modal-title modal-title--no-icon">Upload document</h3>
      <div className="modal-field--gap-sm">
        <label className="modal-label">File description</label>
        <input
          className="modal-input input-field"
          value={draft.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
          placeholder="e.g. Sales Report"
        />
      </div>
      <div className="modal-field--last">
        <label className="modal-label">File</label>
        <div className="upload-modal__file-row">
          <label className="upload-modal__chooser btn-ghost-indigo">
            Choose file
            <input
              type="file"
              className="upload-modal__chooser-input"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0]
                onFile(f ? f.name : '')
              }}
            />
          </label>
          {draft.file ? (
            <span className="upload-modal__filename">{draft.file}</span>
          ) : (
            <span className="upload-modal__filename--empty">No file selected</span>
          )}
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-btn-cancel btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-btn-save btn-primary" onClick={onUpload}>
          Upload now
        </button>
      </div>
    </>
  )
}
