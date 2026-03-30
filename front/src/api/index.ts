import axios from 'axios'
import { API_URL } from '../config/apiBase'

export type User = { id: string; name: string; email: string; xp?: number; is_admin?: boolean; onboarding_completed?: boolean }
export type AuthResponse = { token: string; user: User }

const api = axios.create({ baseURL: API_URL })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const login = async (email: string, password: string) => (await api.post<AuthResponse>('/auth/login', { email, password })).data
export const register = async (payload: { name: string; email: string; password: string }) => (await api.post<AuthResponse>('/auth/register', payload)).data
export const getMe = async () => (await api.get<User>('/auth/me')).data
export default api
