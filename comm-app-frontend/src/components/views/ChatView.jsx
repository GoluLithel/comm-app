import { avStyle, initials } from '../../utils/helpers'
import './ChatView.css'

export default function ChatView({
  messages,
  currentUser,
  chatInput,
  onChatInput,
  onSend,
  onRefresh,
  chatRef,
}) {
  const cu = currentUser || { name: '', email: '' }
  return (
    <div className="chat anim-fade">
      <div className="chat__header">
        <div>
          <div className="chat__header-title">Group Chat</div>
          <div className="chat__header-subtitle">Everyone in your team</div>
        </div>
        <div className="chat__live">
          <span className="chat__live-dot"></span>
          Live
        </div>
      </div>
      <div className="chat__messages" ref={chatRef}>
        {messages.map((m, i) => {
          const own = m.email === cu.email
          if (own) {
            return (
              <div key={i} className="chat__msg-row chat__msg-row--own">
                <div className="avatar" style={avStyle(m.email, 34, 12.5)}>{initials(m.name)}</div>
                <div>
                  <div className="chat__msg-meta chat__msg-meta--own">
                    <span className="chat__msg-time">{m.time}</span>
                    <span className="chat__msg-name">You</span>
                  </div>
                  <div className="chat__bubble chat__bubble--own">{m.text}</div>
                </div>
              </div>
            )
          }
          return (
            <div key={i} className="chat__msg-row chat__msg-row--other">
              <div className="avatar" style={avStyle(m.email, 34, 12.5)}>{initials(m.name)}</div>
              <div>
                <div className="chat__msg-meta chat__msg-meta--other">
                  <span className="chat__msg-name">{m.name}</span>
                  <span className="chat__msg-time">{m.time}</span>
                </div>
                <div className="chat__bubble chat__bubble--other">{m.text}</div>
              </div>
            </div>
          )
        })}
      </div>
      <form className="chat__form" onSubmit={onSend}>
        <input
          className="chat__input input-field"
          value={chatInput}
          onChange={onChatInput}
          placeholder="Write a message…"
        />
        <button className="chat__btn-send btn-primary" type="submit">
          Send
        </button>
        <button className="chat__btn-refresh btn-outline" type="button" onClick={onRefresh}>
          Refresh
        </button>
      </form>
    </div>
  )
}
