export default function ModalShell({ onClose, children }) {
  const stop = (e) => e.stopPropagation()
  return (
    <div
      onClick={onClose}
      className="anim-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(22,24,44,.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={stop}
        className="anim-pop"
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#fff',
          borderRadius: 22,
          boxShadow: '0 32px 80px -28px rgba(20,22,50,.55)',
          padding: 26,
        }}
      >
        {children}
      </div>
    </div>
  )
}
