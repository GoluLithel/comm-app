import { api } from './client'

export const listMyDocuments = (ownerId) =>
  api.get(`/documents?ownerId=${encodeURIComponent(ownerId)}`)

export const listSharedDocuments = (userId) =>
  api.get(`/documents/shared-with/${encodeURIComponent(userId)}`)

export const createDocument = (dto) => api.post('/documents', dto)
export const updateDocument = (id, dto) => api.patch(`/documents/${id}`, dto)
export const deleteDocument = (id) => api.delete(`/documents/${id}`)

export const addShare = (documentId, userId) =>
  api.post(`/documents/${documentId}/shares`, { userId })

export const removeShare = (documentId, userId) =>
  api.delete(`/documents/${documentId}/shares/${userId}`)
