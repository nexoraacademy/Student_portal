import PageHeading from '../components/PageHeading.jsx'
import useResource from '../useResource.js'
import './Assignments.css'

function formatDate(value) {
  if (!value) return 'No due date'
  return new Date(value).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function Assignments() {
  const { data, loading, error } = useResource('/assignments')
  const items = data?.assignments || []
  const submitted = items.filter((item) => item.status === 'Graded' || item.status === 'Submitted').length
  const upcoming = items.filter((item) => item.status !== 'Graded' && item.status !== 'Submitted').length
  const inProgress = items.filter((item) => item.status === 'In progress').length
  return <div><PageHeading eyebrow="Stay on track" title="Assignments" description="Review tasks and assessment deadlines from your enrolled programme."/>{error && <p className="page-data-message error">{error}</p>}{loading ? <p className="page-data-message">Loading assignments…</p> : <><section className="assignment-summary"><div><strong>{upcoming}</strong><span>Upcoming</span></div><div><strong>{inProgress}</strong><span>In progress</span></div><div><strong>{submitted}</strong><span>Graded or submitted</span></div></section><section className="assignment-table-wrap"><div className="assignment-table-title"><h2>Programme tasks</h2><span>{items.length} total</span></div><div className="assignment-table"><div className="assignment-table-head"><span>ASSIGNMENT</span><span>SECTION</span><span>DUE DATE</span><span>STATUS</span></div>{items.length ? items.map((item) => <div className="assignment-table-row" key={item.id}><strong>{item.title}</strong><span>{item.section}</span><span>{formatDate(item.dueDate)}</span><span className={`table-status ${item.status === 'Graded' ? 'green' : 'blue'}`}>{item.status}</span></div>) : <p className="page-data-message">No assignments are currently listed for your enrolment.</p>}</div></section></>}</div>
}
