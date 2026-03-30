import { useAuth } from '../context/AuthContext'
export default function DashboardPage() { const { user } = useAuth(); return <main className="page"><div className="card"><h1>Hello, {user?.name}</h1><p className="muted">Authentication and protected routes are connected.</p></div></main> }
