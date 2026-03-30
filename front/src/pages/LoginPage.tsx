import { FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api'
import { useAuth } from '../context/AuthContext'
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuth } = useAuth(); const navigate = useNavigate()
  async function submit(e: FormEvent) { e.preventDefault(); setError(''); try { const data = await login(email, password); setAuth(data.token, data.user); navigate('/') } catch { setError('Login failed') } }
  return <main className="page"><form className="form card" onSubmit={submit}><h1>Login</h1>{error && <p>{error}</p>}<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" /><button>Sign in</button><Link to="/register">Create account</Link></form></main>
}
