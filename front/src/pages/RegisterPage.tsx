import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'
import { useAuth } from '../context/AuthContext'
export default function RegisterPage(){ const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const {setAuth}=useAuth(); const nav=useNavigate(); async function submit(e:FormEvent){e.preventDefault(); const d=await register({name,email,password}); setAuth(d.token,d.user); nav('/')} return <main className="page"><form className="form card" onSubmit={submit}><h1>Register</h1><input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"/><button>Create account</button><Link to="/login">Login</Link></form></main> }
