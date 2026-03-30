import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth()
  if (loading) return <main className="page">Loading...</main>
  return token ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  const { token, user, logout } = useAuth()
  return (
    <>
      <nav className="nav"><strong>QazaqLinga</strong><Link to="/">Dashboard</Link><span className="spacer" />{user?.name}{token ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}</nav>
      <Routes>
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}
export default App
