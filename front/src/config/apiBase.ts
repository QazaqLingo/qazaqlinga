export const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export const API_URL = `${API_ORIGIN}/api`
export function resolveMediaUrl(url?: string | null) { if (!url) return ''; return url.startsWith('http') ? url : `${API_ORIGIN}${url}` }
