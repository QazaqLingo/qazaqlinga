import axios from 'axios'
import { API_URL } from '../config/apiBase'
export type User={id:string;name:string;email:string;xp?:number;is_admin?:boolean;onboarding_completed?:boolean}
export type AuthResponse={token:string;user:User}
export type Level={id:string;code:string;name:string;modules:Module[]}
export type Module={id:string;title:string;description?:string;required_xp?:number}
export type Unit={id:string;title:string;subtitle?:string;status?:'locked'|'current'|'completed';lesson_count?:number}
export type Lesson={id:string;title:string;type:string;xp_reward:number;completed?:boolean;locked?:boolean}
const api=axios.create({baseURL:API_URL}); api.interceptors.request.use(c=>{const t=localStorage.getItem('token'); if(t)c.headers.Authorization=`Bearer ${t}`; return c})
export const login=async(email:string,password:string)=>(await api.post<AuthResponse>('/auth/login',{email,password})).data
export const register=async(payload:{name:string;email:string;password:string})=>(await api.post<AuthResponse>('/auth/register',payload)).data
export const getMe=async()=>(await api.get<User>('/auth/me')).data
export const getLevels=async()=>(await api.get<Level[]>('/modules/levels')).data
export const getModule=async(id:string)=>(await api.get<{module:Module;units:Unit[]}>(`/modules/${id}`)).data
export const getUnitLessons=async(id:string)=>(await api.get<Lesson[]>(`/lessons/unit/${id}`)).data
export default api
