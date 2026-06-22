import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

import * as authApi from './api/auth'
import * as usersApi from './api/users'
import * as chatApi from './api/chat'
import * as documentsApi from './api/documents'
import { toMessage, toMyUpload, toSharedUpload } from './api/adapters'

import WelcomeScreen from './components/auth/WelcomeScreen'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'
import RegisterSuccessScreen from './components/auth/RegisterSuccessScreen'

import Header from './components/Header'
import HomeView from './components/views/HomeView'
import ChatView from './components/views/ChatView'
import UsersView from './components/views/UsersView'
import DocumentsListView from './components/views/DocumentsListView'
import DocumentsShareView from './components/views/DocumentsShareView'

import ModalShell from './components/modals/ModalShell'
import DeleteUserModal from './components/modals/DeleteUserModal'
import DeleteDocModal from './components/modals/DeleteDocModal'
import RemoveShareModal from './components/modals/RemoveShareModal'
import EditUserModal from './components/modals/EditUserModal'
import EditDocModal from './components/modals/EditDocModal'
import UploadModal from './components/modals/UploadModal'

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [view, setView] = useState('home')
  const [guestScreen, setGuestScreen] = useState('welcome')
  const [loggedOut, setLoggedOut] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [myUploads, setMyUploads] = useState([])
  const [sharedUploads, setSharedUploads] = useState([])
  const [roomId, setRoomId] = useState(null)

  const [docView, setDocView] = useState('list')
  const [shareTargetId, setShareTargetId] = useState(null)

  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState({})

  const [loginEmail, setLoginEmail] = useState('anne.hunter@mail.com')
  const [loginPassword, setLoginPassword] = useState('password')
  const [loginError, setLoginError] = useState('')
  const [reg, setReg] = useState({ name: '', email: '', pass: '', confirm: '' })
  const [regError, setRegError] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [shareSelect, setShareSelect] = useState('')

  const chatRef = useRef(null)

  // ---------- data loaders ----------
  const loadUsers = useCallback(async () => {
    try {
      setUsers(await usersApi.listUsers())
    } catch (e) {
      console.error('loadUsers failed', e)
    }
  }, [])

  const loadMessages = useCallback(async (rId) => {
    if (!rId) return
    try {
      const list = await chatApi.listMessages(rId)
      setMessages(list.map(toMessage))
    } catch (e) {
      console.error('loadMessages failed', e)
    }
  }, [])

  const loadDocuments = useCallback(async (userId) => {
    if (!userId) return
    try {
      const [mine, shared] = await Promise.all([
        documentsApi.listMyDocuments(userId),
        documentsApi.listSharedDocuments(userId),
      ])
      setMyUploads(mine.map(toMyUpload))
      setSharedUploads(shared.map(toSharedUpload))
    } catch (e) {
      console.error('loadDocuments failed', e)
    }
  }, [])

  const loadAll = useCallback(
    async (user) => {
      if (!user) return
      // fetch users + rooms in parallel
      const [, rooms] = await Promise.all([loadUsers(), chatApi.listRooms()])
      const general = rooms.find((r) => r.name === 'General') || rooms[0]
      const rId = general?.id || null
      setRoomId(rId)
      await Promise.all([loadMessages(rId), loadDocuments(user.id)])
    },
    [loadUsers, loadMessages, loadDocuments],
  )

  // refresh data whenever currentUser changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentUser) loadAll(currentUser)
  }, [currentUser, loadAll])

  // auto-scroll chat
  useEffect(() => {
    const el = chatRef.current
    if (el && view === 'chat') el.scrollTop = el.scrollHeight
  }, [messages, view])

  const closeModal = () => setModal(null)
  const updateDraft = (key, value) => setDraft((d) => ({ ...d, [key]: value }))
  const updateReg = (key, value) => setReg((r) => ({ ...r, [key]: value }))

  // ---------- auth ----------
  const doLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setLoginError('')
    const email = (loginEmail || '').trim()
    if (!email) return
    try {
      const user = await authApi.login(email, loginPassword)
      setCurrentUser(user)
      setAuthed(true)
      setView('home')
      setLoggedOut(false)
      setModal(null)
      setDocView('list')
    } catch (err) {
      setLoginError(err.message || 'Login failed')
    }
  }

  const doRegister = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!reg.name.trim() || !reg.email.trim()) {
      setRegError('Please fill in your name and email.')
      return
    }
    if (reg.pass !== reg.confirm) {
      setRegError('Passwords do not match.')
      return
    }
    try {
      await authApi.register(reg.name.trim(), reg.email.trim(), reg.pass)
      setGuestScreen('registerSuccess')
      setRegError('')
    } catch (err) {
      setRegError(err.message || 'Registration failed')
    }
  }

  const regContinue = () => {
    setLoginEmail(reg.email || loginEmail)
    setLoginPassword(reg.pass || '')
    setReg({ name: '', email: '', pass: '', confirm: '' })
    setGuestScreen('login')
  }

  const doLogout = () => {
    setAuthed(false)
    setLoggedOut(true)
    setGuestScreen('welcome')
    setCurrentUser(null)
    setView('home')
    setModal(null)
    setUsers([])
    setMessages([])
    setMyUploads([])
    setSharedUploads([])
    setRoomId(null)
  }

  // ---------- chat ----------
  const sendMessage = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    const t = (chatInput || '').trim()
    if (!t || !currentUser || !roomId) return
    try {
      await chatApi.sendMessage(roomId, currentUser.id, t)
      setChatInput('')
      await loadMessages(roomId)
    } catch (err) {
      console.error('sendMessage failed', err)
    }
  }

  const refreshChat = () => loadMessages(roomId)

  // ---------- users ----------
  const openEditUser = (u) => {
    setDraft({ id: u.id, name: u.name, email: u.email })
    setModal({ type: 'editUser' })
  }
  const openDeleteUser = (u) => setModal({ type: 'deleteUser', id: u.id, name: u.name })

  const saveUser = async () => {
    const d = draft
    try {
      const updated = await usersApi.updateUser(d.id, { name: d.name, email: d.email })
      if (currentUser && currentUser.id === d.id) setCurrentUser(updated)
      await loadUsers()
      setModal(null)
    } catch (err) {
      console.error('saveUser failed', err)
    }
  }

  const confirmDeleteUser = async () => {
    const id = modal.id
    try {
      await usersApi.deleteUser(id)
      await loadUsers()
      // a deleted user's docs/shares cascade — refresh those too
      if (currentUser) await loadDocuments(currentUser.id)
      setModal(null)
    } catch (err) {
      console.error('deleteUser failed', err)
    }
  }

  // ---------- documents ----------
  const openUpload = () => {
    setDraft({ label: '', file: '' })
    setModal({ type: 'upload' })
  }
  const openEditDoc = (d) => {
    setDraft({ label: d.label })
    setModal({ type: 'editDoc', id: d.id })
  }
  const openShare = (d) => {
    setShareTargetId(d.id)
    setShareSelect('')
    setDocView('share')
  }
  const openDeleteDoc = (d) => setModal({ type: 'deleteDoc', id: d.id, label: d.label })

  const saveDoc = async () => {
    const id = modal.id
    try {
      await documentsApi.updateDocument(id, { label: draft.label })
      if (currentUser) await loadDocuments(currentUser.id)
      setModal(null)
    } catch (err) {
      console.error('saveDoc failed', err)
    }
  }

  const confirmDeleteDoc = async () => {
    const id = modal.id
    try {
      await documentsApi.deleteDocument(id)
      if (currentUser) await loadDocuments(currentUser.id)
      setModal(null)
    } catch (err) {
      console.error('deleteDoc failed', err)
    }
  }

  const doUpload = async () => {
    if (!currentUser) return
    const label = (draft.label || '').trim() || 'Untitled document'
    const fileName = draft.file || 'document.docx'
    try {
      await documentsApi.createDocument({
        ownerId: currentUser.id,
        label,
        fileName,
        // no real storage backend yet — placeholder key keyed by filename
        storageKey: `uploads/${Date.now()}-${fileName}`,
      })
      await loadDocuments(currentUser.id)
      setModal(null)
    } catch (err) {
      console.error('upload failed', err)
    }
  }

  // ---------- share panel ----------
  const addShare = async () => {
    const targetUserId = shareSelect
    if (!targetUserId || !shareTargetId) return
    try {
      await documentsApi.addShare(shareTargetId, targetUserId)
      setShareSelect('')
      if (currentUser) await loadDocuments(currentUser.id)
    } catch (err) {
      console.error('addShare failed', err)
    }
  }

  const openRemoveShare = (s) =>
    setModal({ type: 'removeShare', id: s.id, name: s.name })

  const confirmRemoveShare = async () => {
    const targetUserId = modal.id
    if (!targetUserId || !shareTargetId) return
    try {
      await documentsApi.removeShare(shareTargetId, targetUserId)
      if (currentUser) await loadDocuments(currentUser.id)
      setModal(null)
    } catch (err) {
      console.error('removeShare failed', err)
    }
  }

  // ---------- derived ----------
  const cu = currentUser || { name: '', email: '', id: null }
  const target = myUploads.find((d) => d.id === shareTargetId) || null
  // share dropdown uses backend user ids
  const shareCandidates = target
    ? users
        .filter(
          (u) =>
            u.id !== cu.id &&
            !target.sharedWith.some((s) => s.email === u.email),
        )
        .map((u) => ({ id: u.id, name: u.name, email: u.email }))
    : []

  // share panel receives sharedWith items adapted with `id` so Remove works
  const targetForView = target
    ? {
        ...target,
        sharedWith: target.sharedWith.map((s) => {
          const matched = users.find((u) => u.email === s.email)
          return { ...s, id: matched?.id }
        }),
      }
    : null

  // ---------- guest ----------
  if (!authed) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '28px 20px',
          background: 'radial-gradient(1100px 520px at 50% -8%, #e8ebfe 0%, #eef1f8 58%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 13,
              background: '#4f46e5',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 20,
              boxShadow: '0 10px 22px -8px rgba(79,70,229,.7)',
            }}
          >
            C
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em' }}>CommApp</div>
        </div>

        {guestScreen === 'welcome' && (
          <WelcomeScreen
            loggedOut={loggedOut}
            onLogin={() => {
              setLoginError('')
              setGuestScreen('login')
            }}
            onRegister={() => {
              setGuestScreen('register')
              setRegError('')
            }}
          />
        )}

        {guestScreen === 'login' && (
          <LoginScreen
            loginEmail={loginEmail}
            loginPassword={loginPassword}
            onLoginEmail={(e) => setLoginEmail(e.target.value)}
            onLoginPassword={(e) => setLoginPassword(e.target.value)}
            onSubmit={doLogin}
            onBack={() => setGuestScreen('welcome')}
            onRegister={() => {
              setGuestScreen('register')
              setRegError('')
            }}
            error={loginError}
          />
        )}

        {guestScreen === 'register' && (
          <RegisterScreen
            reg={reg}
            onChange={updateReg}
            error={regError}
            onSubmit={doRegister}
            onBack={() => setGuestScreen('welcome')}
            onLogin={() => setGuestScreen('login')}
          />
        )}

        {guestScreen === 'registerSuccess' && (
          <RegisterSuccessScreen
            regName={reg.name}
            onContinue={regContinue}
            onBack={() => setGuestScreen('welcome')}
          />
        )}
      </div>
    )
  }

  // ---------- authed ----------
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        currentUser={currentUser}
        view={view}
        onNavHome={() => setView('home')}
        onNavChat={() => setView('chat')}
        onNavUsers={() => setView('users')}
        onNavDocs={() => {
          setView('documents')
          setDocView('list')
        }}
        onLogout={doLogout}
      />

      <main style={{ flex: 1, width: '100%', maxWidth: 1120, margin: '0 auto', padding: '24px 18px 64px' }}>
        {view === 'home' && (
          <HomeView
            currentUser={currentUser}
            messagesCount={messages.length}
            usersCount={users.length}
            uploadsCount={myUploads.length}
            sharedCount={sharedUploads.length}
            onChat={() => setView('chat')}
            onUsers={() => setView('users')}
            onDocs={() => {
              setView('documents')
              setDocView('list')
            }}
          />
        )}

        {view === 'chat' && (
          <ChatView
            messages={messages}
            currentUser={currentUser}
            chatInput={chatInput}
            onChatInput={(e) => setChatInput(e.target.value)}
            onSend={sendMessage}
            onRefresh={refreshChat}
            chatRef={chatRef}
          />
        )}

        {view === 'users' && (
          <UsersView users={users} onEdit={openEditUser} onDelete={openDeleteUser} />
        )}

        {view === 'documents' && docView === 'list' && (
          <DocumentsListView
            myUploads={myUploads}
            sharedUploads={sharedUploads}
            onOpenUpload={openUpload}
            onEdit={openEditDoc}
            onShare={openShare}
            onDelete={openDeleteDoc}
          />
        )}

        {view === 'documents' && docView === 'share' && targetForView && (
          <DocumentsShareView
            target={targetForView}
            shareCandidates={shareCandidates}
            shareSelect={shareSelect}
            onShareSelectChange={(e) => setShareSelect(e.target.value)}
            onAddShare={addShare}
            onRemove={openRemoveShare}
            onBack={() => {
              setDocView('list')
              setShareTargetId(null)
            }}
          />
        )}
      </main>

      {modal && (
        <ModalShell onClose={closeModal}>
          {modal.type === 'deleteUser' && (
            <DeleteUserModal name={modal.name} onCancel={closeModal} onConfirm={confirmDeleteUser} />
          )}
          {modal.type === 'deleteDoc' && (
            <DeleteDocModal label={modal.label} onCancel={closeModal} onConfirm={confirmDeleteDoc} />
          )}
          {modal.type === 'removeShare' && (
            <RemoveShareModal name={modal.name} onCancel={closeModal} onConfirm={confirmRemoveShare} />
          )}
          {modal.type === 'editUser' && (
            <EditUserModal draft={draft} onChange={updateDraft} onCancel={closeModal} onSave={saveUser} />
          )}
          {modal.type === 'editDoc' && (
            <EditDocModal draft={draft} onChange={updateDraft} onCancel={closeModal} onSave={saveDoc} />
          )}
          {modal.type === 'upload' && (
            <UploadModal
              draft={draft}
              onChange={updateDraft}
              onFile={(name) => updateDraft('file', name)}
              onCancel={closeModal}
              onUpload={doUpload}
            />
          )}
        </ModalShell>
      )}
    </div>
  )
}
