import { avStyle, initials } from '../../utils/helpers'

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
    <div
      className="anim-fade"
      style={{
        background: '#fff',
        border: '1px solid #e8eaf3',
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 'min(74vh,660px)',
        boxShadow: '0 20px 44px -32px rgba(40,46,90,.45)',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #eceef6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Group Chat</div>
          <div style={{ fontSize: 12.5, color: '#8a90ab', marginTop: 1 }}>Everyone in your team</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#16a34a',
            fontWeight: 700,
            fontSize: 12.5,
          }}
        >
          <span
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}
          ></span>
          Live
        </div>
      </div>
      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '22px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          background: '#f7f8fc',
        }}
      >
        {messages.map((m, i) => {
          const own = m.email === cu.email
          if (own) {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: 10,
                  alignItems: 'flex-end',
                  maxWidth: '80%',
                  alignSelf: 'flex-end',
                }}
              >
                <div style={avStyle(m.email, 34, 12.5)}>{initials(m.name)}</div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'baseline',
                      justifyContent: 'flex-end',
                      margin: '0 0 4px',
                      paddingRight: 2,
                    }}
                  >
                    <span style={{ fontSize: 11, color: '#a0a6c0' }}>{m.time}</span>
                    <span style={{ fontWeight: 800, fontSize: 13 }}>You</span>
                  </div>
                  <div
                    style={{
                      background: '#4f46e5',
                      padding: '11px 14px',
                      borderRadius: '16px 5px 16px 16px',
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: '#fff',
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-end',
                maxWidth: '80%',
                alignSelf: 'flex-start',
              }}
            >
              <div style={avStyle(m.email, 34, 12.5)}>{initials(m.name)}</div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'baseline',
                    margin: '0 0 4px',
                    paddingLeft: 2,
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 13 }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: '#a0a6c0' }}>{m.time}</span>
                </div>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #ebedf6',
                    padding: '11px 14px',
                    borderRadius: '5px 16px 16px 16px',
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: '#2c3150',
                  }}
                >
                  {m.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <form
        onSubmit={onSend}
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          padding: '14px 16px',
          borderTop: '1px solid #eceef6',
          background: '#fff',
          flexWrap: 'wrap',
        }}
      >
        <input
          className="input-field"
          value={chatInput}
          onChange={onChatInput}
          placeholder="Write a message…"
          style={{
            flex: '1 1 180px',
            minWidth: 0,
            padding: '12px 15px',
            borderRadius: 13,
            border: '1.5px solid #e6e8f3',
            background: '#f8f9fd',
            fontSize: 14.5,
            color: '#232842',
            outline: 'none',
          }}
        />
        <button
          className="btn-primary"
          type="submit"
          style={{
            padding: '11px 20px',
            borderRadius: 13,
            border: 'none',
            background: '#4f46e5',
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            flex: '0 0 auto',
          }}
        >
          Send
        </button>
        <button
          className="btn-outline"
          type="button"
          onClick={onRefresh}
          style={{
            padding: '11px 16px',
            borderRadius: 13,
            border: '1.5px solid #e6e8f3',
            background: '#fff',
            color: '#5b6180',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            flex: '0 0 auto',
          }}
        >
          Refresh
        </button>
      </form>
    </div>
  )
}
