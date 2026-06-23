import './HomeView.css'

export default function HomeView({
  currentUser,
  messagesCount,
  usersCount,
  uploadsCount,
  sharedCount,
  onChat,
  onUsers,
  onDocs,
}) {
  const cu = currentUser || { name: '', email: '' }
  return (
    <div className="anim-fade">
      <div className="home-hero">
        <div className="home-hero__badge">● Login successful</div>
        <h1 className="home-hero__title">Welcome back, {cu.name}</h1>
        <p className="home-hero__email">{cu.email}</p>
      </div>
      <div className="home-cards">
        <button className="home-card card-hover" onClick={onChat}>
          <div className="home-card__icon home-card__icon--chat">◷</div>
          <div>
            <div className="home-card__title">Group Chat</div>
            <div className="home-card__subtitle">
              Catch up with the team · {messagesCount} messages
            </div>
          </div>
        </button>
        <button className="home-card card-hover-green" onClick={onUsers}>
          <div className="home-card__icon home-card__icon--users">◑</div>
          <div>
            <div className="home-card__title">Manage Users</div>
            <div className="home-card__subtitle">{usersCount} people in your team</div>
          </div>
        </button>
        <button className="home-card card-hover-amber" onClick={onDocs}>
          <div className="home-card__icon home-card__icon--docs">▤</div>
          <div>
            <div className="home-card__title">Manage Documents</div>
            <div className="home-card__subtitle">
              {uploadsCount} uploads · {sharedCount} shared with you
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
