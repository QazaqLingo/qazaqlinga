import { useEffect,useState } from 'react'; import { getRating,type User } from '../api'
export default function RatingPage(){const[users,setUsers]=useState<User[]>([]);useEffect(()=>{getRating().then(setUsers)},[]);return <main className="page"><h1>Leaderboard</h1>{users.map((u,i)=><div className="node" key={u.id}><strong>#{i+1} {u.name}</strong><span>{u.xp||0} XP</span></div>)}</main>}
