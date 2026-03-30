import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getMe, type User } from '../api'

type AuthContextValue = {
  user: User | null
  token: string | null
  loading: boolean
  setAuth: (token: string, user: User) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(Boolean(token))

  useEffect(() => {
    if (!token) { setLoading(false); return }
    getMe().then(setUser).catch(() => { localStorage.removeItem('token'); setToken(null) }).finally(() => setLoading(false))
  }, [token])

  const value = useMemo(() => ({
    user,
    token,
    loading,
    setAuth: (nextToken: string, nextUser: User) => { localStorage.setItem('token', nextToken); setToken(nextToken); setUser(nextUser) },
    logout: () => { localStorage.removeItem('token'); setToken(null); setUser(null) },
  }), [user, token, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
