import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUnitLessons, type Lesson } from '../api'
export default function UnitPage(){ const {unitId}=useParams(); const [lessons,setLessons]=useState<Lesson[]>([]); useEffect(()=>{if(unitId)getUnitLessons(unitId).then(setLessons)},[unitId]); return <main className="page"><h1>Unit lessons</h1><div className="grid">{lessons.map(l=><div className="card" key={l.id}><h3>{l.title}</h3><p>{l.type} · {l.xp_reward} XP</p><button disabled>Lesson page will be added later</button></div>)}</div></main> }
