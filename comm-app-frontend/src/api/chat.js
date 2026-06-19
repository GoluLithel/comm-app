import { api } from './client'

export const listRooms = () => api.get('/rooms')
export const listMessages = (roomId) => api.get(`/rooms/${roomId}/messages`)
export const sendMessage = (roomId, senderId, content) =>
  api.post(`/rooms/${roomId}/messages`, { senderId, content })
