import { useState } from 'react'
import PageHeading from '../components/PageHeading.jsx'
import useResource from '../useResource.js'
import { apiRequest } from '../api.js'
import './Announcements.css'

export default function Announcements() {
  const [filter, setFilter] = useState('All')
  const { data, loading, error, reload } = useResource('/announcements')
  const announcements = data?.announcements || []
  const filtered = announcements.filter((item) => filter === 'All' || !item.isRead)
  const markRead = async (id) => { try { await apiRequest(`/announcements/${id}/read`, { method: 'POST' }); await reload() } catch {} }
  return <div className="announcements-page"><PageHeading eyebrow="Keep up to date" title="Announcements" description="Important updates from your lecturers and the Academy."/><div className="announcement-toolbar"><div className="announcement-filters" role="tablist" aria-label="Filter announcements">{['All', 'Unread'].map((item) => <button type="button" role="tab" aria-selected={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><span>{announcements.filter((item) => !item.isRead).length} unread</span></div>{error && <p className="page-data-message error">{error}</p>}{loading ? <p className="page-data-message">Loading announcements…</p> : <div className="announcement-list">{filtered.map((item) => { const isRead = Boolean(item.isRead); return <article className={`announcement-card${isRead ? ' read' : ''}`} key={item.id}><div className="announcement-category-icon general">✦</div><div className="announcement-card-content"><div className="announcement-meta"><span className="announcement-category general">Academy update</span><time dateTime={item.publishedAt}>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</time>{!isRead && <span className="unread-indicator">New</span>}</div><h2>{item.title}</h2><p>{item.body}</p><div className="announcement-card-footer"><span>Posted by <strong>Nexora Academy</strong></span>{!isRead && <button type="button" onClick={() => markRead(item.id)}>Mark as read</button>}</div></div></article> })}{!filtered.length && <p className="page-data-message">No announcements to show.</p>}</div>}</div>
}
