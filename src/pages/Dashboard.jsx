import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import StatCard from '../components/StatCard.jsx'
import useResource from '../useResource.js'
import './Dashboard.css'

function dateLabel(value) {
  return value ? new Date(value).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short' }) : 'No due date'
}

export default function Dashboard() {
  const dashboard = useResource('/dashboard')
  const programmeResource = useResource('/programme')
  const announcementsResource = useResource('/announcements')
  const assignmentsResource = useResource('/assignments')
  const stats = dashboard.data?.stats || {}
  const sections = programmeResource.data?.sections || []
  const assignments = assignmentsResource.data?.assignments || []
  const announcements = announcementsResource.data?.announcements || []
  const completed = sections.filter((section) => section.assessmentPassed).length
  const current = sections.find((section) => section.unlocked && !section.assessmentPassed)
  const focus = current || sections.at(-1)
  const progress = sections.length ? Math.round((completed / sections.length) * 100) : 0
  const firstName = dashboard.data?.student?.firstName || 'Student'

  return <div className="dashboard-page"><PageHeading eyebrow={new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} title={`Welcome, ${firstName}`} description="Your student portal, with the latest information from your programme." />
    {dashboard.error && <p className="page-data-message error">{dashboard.error}</p>}
    <section className="welcome-banner"><div><span className="banner-kicker">YOUR LEARNING JOURNEY</span><h2>{dashboard.data?.programme?.title || 'Your programme'}</h2><p>{focus ? `Continue with ${focus.title}.` : 'Your programme sections will appear here when they are added.'}</p></div><div className="banner-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-book">✦</div><div className="art-star">✦</div></div><div className="banner-progress"><span>PROGRAMME PROGRESS</span><strong>{completed} <small>of {sections.length} sections</small></strong><div className="progress-track"><i style={{ width: `${progress}%` }} /></div><small>{progress}% complete</small></div></section>
    <section className="stats-grid" aria-label="Your learning at a glance"><StatCard label="Programme sections" value={stats.programmeSections ?? '—'} detail="In your active enrolment" icon="▤" tone="purple"/><StatCard label="Assignments due" value={stats.assignmentsDue ?? '—'} detail="From your programme" icon="✓" tone="orange"/><StatCard label="Average grade" value={stats.averageGrade == null ? '—' : `${stats.averageGrade}%`} detail="Based on released results" icon="↗" tone="green"/><StatCard label="Sections passed" value={`${completed}/${sections.length}`} detail="Each requires 80% or higher" icon="◷" tone="blue"/></section>
    <section className="dashboard-lower"><div className="panel assignments-panel"><div className="panel-heading"><div><h2>Upcoming assignments</h2><p>Tasks and due dates from the database</p></div><Link to="/assignments">View all <span>→</span></Link></div><div className="assignment-list">{assignments.slice(0, 3).map((item) => <article className="assignment-row" key={item.id}><span className="assignment-marker amber">▧</span><div className="assignment-info"><strong>{item.title}</strong><small>{item.section}</small></div><span className="assignment-date">{dateLabel(item.dueDate)}</span><span className="assignment-state blue">{item.status}</span></article>)}{!assignments.length && <p className="page-data-message">No upcoming assignments.</p>}</div></div><div className="panel courses-panel"><div className="panel-heading"><div><h2>Continue your programme</h2><p>{current ? 'Pick up at your current section' : 'Your sections will appear here'}</p></div><Link to="/programme" aria-label="View programme">→</Link></div>{focus ? <><div className="course-continue"><div className="course-thumb">{String(focus.order).padStart(2, '0')}</div><div className="course-meta"><strong>{focus.title}</strong><small>{focus.progressStatus}</small></div><span className="course-percent">{progress}%</span></div><div className="course-progress"><i style={{ width: `${progress}%` }} /></div><div className="course-footer"><span>{completed} of {sections.length} passed</span><Link to={current ? `/sections/${current.id}` : '/programme'}>{current ? 'Continue' : 'Review'} <span>→</span></Link></div></> : <p className="page-data-message">No programme sections have been added yet.</p>}</div></section>
    <section className="panel dashboard-announcements"><div className="panel-heading"><div><h2>Latest announcements</h2><p>Updates published for students</p></div><Link to="/announcements">View all <span>→</span></Link></div><div className="dashboard-announcement-list">{announcements.slice(0, 2).map((item) => <Link className="dashboard-announcement" to="/announcements" key={item.id}><span className="dashboard-announcement-icon">✦</span><span className="dashboard-announcement-copy"><strong>{item.title}</strong><small>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-ZA') : 'Academy update'}</small></span></Link>)}{!announcements.length && <p className="page-data-message">No announcements have been published.</p>}</div></section>
  </div>
}
