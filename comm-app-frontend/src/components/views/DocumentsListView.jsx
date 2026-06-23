import { avStyle, fileBadge, initials, nameFromEmail } from '../../utils/helpers'
import './DocumentsListView.css'

export default function DocumentsListView({
  myUploads,
  sharedUploads,
  onOpenUpload,
  onEdit,
  onShare,
  onDelete,
}) {
  return (
    <div className="anim-fade">
      <div className="docs-header">
        <h2 className="docs-header__title">My uploads</h2>
        <button className="docs-header__add-btn btn-primary" onClick={onOpenUpload}>
          + Add upload
        </button>
      </div>
      <div className="docs-list">
        {myUploads.map((d) => {
          const fi = fileBadge(d.file)
          const shareLabel = d.sharedWith.length ? `Shared · ${d.sharedWith.length}` : 'Private'
          return (
            <div key={d.id} className="doc-row">
              <div className="file-badge" style={fi.style}>{fi.ext}</div>
              <div className="doc-row__main">
                <div className="doc-row__label">{d.label}</div>
                <div className="doc-row__file">{d.file}</div>
              </div>
              <span className="doc-row__share-label">{shareLabel}</span>
              <div className="doc-row__actions">
                <button className="doc-row__btn-edit btn-edit" onClick={() => onEdit(d)}>
                  Edit
                </button>
                <button className="doc-row__btn-edit btn-edit" onClick={() => onShare(d)}>
                  Share
                </button>
                <button className="doc-row__btn-delete btn-danger" onClick={() => onDelete(d)}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="docs-section-title">Shared with me</h2>
      <div className="docs-list">
        {sharedUploads.map((d, i) => {
          const fi = fileBadge(d.file)
          return (
            <div key={i} className="doc-row">
              <div className="file-badge" style={fi.style}>{fi.ext}</div>
              <div className="doc-row__main">
                <div className="doc-row__label">{d.label}</div>
                <div className="doc-row__file">{d.file}</div>
              </div>
              <div className="doc-row__shared-by">
                <div className="avatar" style={avStyle(d.by, 30, 10.5)}>{initials(nameFromEmail(d.by))}</div>
                <div className="doc-row__shared-by-meta">
                  <div className="doc-row__shared-by-label">Shared by</div>
                  <div className="doc-row__shared-by-name">{d.by}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
