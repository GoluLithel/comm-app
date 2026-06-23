import { avStyle, initials } from '../../utils/helpers'
import './UsersView.css'

export default function UsersView({ users, onEdit, onDelete }) {
  return (
    <div className="anim-fade">
      <div className="users-header">
        <h2 className="users-header__title">Users</h2>
        <span className="users-header__count">{users.length}</span>
      </div>
      <div className="users-list">
        {users.map((u) => (
          <div key={u.id || u.email} className="user-row">
            <div className="avatar" style={avStyle(u.email, 46, 15)}>{initials(u.name)}</div>
            <div className="user-row__main">
              <div className="user-row__name">{u.name}</div>
              <div className="user-row__email">{u.email}</div>
            </div>
            <div className="user-row__actions">
              <button className="user-row__btn-edit btn-edit" onClick={() => onEdit(u)}>
                Edit
              </button>
              <button className="user-row__btn-delete btn-danger" onClick={() => onDelete(u)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
