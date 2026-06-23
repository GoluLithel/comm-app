import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE || '/api'

const instance = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Normalize errors so callers can keep reading `err.status`, `err.body`, and `err.message`.
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status
    const body = error.response?.data ?? null
    const message =
      (body && (Array.isArray(body.message) ? body.message.join(', ') : body.message)) ||
      error.message ||
      'Request failed'
    const err = new Error(message)
    err.status = status
    err.body = body
    return Promise.reject(err)
  },
)

async function request(method, path, body) {
  const res = await instance.request({ method, url: path, data: body })
  if (res.status === 204) return null
  return res.data
}

export const api = {
  get: (path) => request('get', path),
  post: (path, body) => request('post', path, body),
  patch: (path, body) => request('patch', path, body),
  delete: (path) => request('delete', path),
}
