import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ModulePage from './pages/ModulePage'
import UnitPage from './pages/UnitPage'
function PrivateRoute({children}:{children:React.ReactNode}){const{token,loading}=useAuth(); if(loading)return <main className="page">Loading...</main>; return token?<>{children}</>:<Navigate to="/login"/>}
export default function App(){const{token}=useAuth(); return <>{token&&<Navbar/>}<Routes><Route path="/" element={<PrivateRoute><ModulePage/></PrivateRoute>}/><Route path="/module/:moduleId" element={<PrivateRoute><ModulePage/></PrivateRoute>}/><Route path="/unit/:unitId" element={<PrivateRoute><UnitPage/></PrivateRoute>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/></Routes></>}
