import { api } from './client'

export const listUsers = () => api.get('/users')
export const updateUser = (id, dto) => api.patch(`/users/${id}`, dto)
export const deleteUser = (id) => api.delete(`/users/${id}`)
