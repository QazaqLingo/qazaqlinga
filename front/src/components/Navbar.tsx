import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Navbar(){ const {user,logout}=useAuth(); return <nav className="nav"><strong>QazaqLinga</strong><Link to="/">Map</Link><Link to="/profile">Profile</Link><Link to="/rating">Rating</Link><span className="spacer" />{user?.name}<button onClick={logout}>Logout</button></nav> }
