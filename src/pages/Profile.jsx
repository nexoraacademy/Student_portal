import PageHeading from '../components/PageHeading.jsx'
import useResource from '../useResource.js'
import './Profile.css'

function displayDate(value) {
  if (!value) return 'Not provided'
  return new Date(value).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Profile() {
  const { data, loading, error } = useResource('/profile')
  const student = data?.student
  const initials = `${student?.firstName?.[0] || ''}${student?.lastName?.[0] || ''}`
  return <div><PageHeading eyebrow="Account settings" title="My profile" description="Your personal and academic information from your student record."/>{error && <p className="page-data-message error">{error}</p>}{loading ? <p className="page-data-message">Loading profile…</p> : student ? <section className="profile-card"><div className="profile-cover"><span>STUDENT PROFILE</span></div><div className="profile-main"><div className="profile-avatar">{initials}</div><div className="profile-identity"><h2>{student.firstName} {student.lastName}</h2><p>Student number · {student.studentNumber}</p></div></div><div className="profile-details"><div className="detail-group"><span>PERSONAL INFORMATION</span><div className="detail-grid"><div><small>Full name</small><strong>{student.firstName} {student.lastName}</strong></div><div><small>Email address</small><strong>{student.email}</strong></div><div><small>Phone number</small><strong>{student.phone || 'Not provided'}</strong></div><div><small>Date of birth</small><strong>{displayDate(student.dateOfBirth)}</strong></div></div></div><div className="detail-group"><span>ACADEMIC INFORMATION</span><div className="detail-grid"><div><small>Student number</small><strong>{student.studentNumber}</strong></div><div><small>Programme</small><strong>{student.programme || 'No active programme'}</strong></div><div><small>Student status</small><strong>{student.status}</strong></div><div><small>Enrolment status</small><strong>{student.enrolmentStatus || 'Not enrolled'}</strong></div></div></div></div></section> : <p className="page-data-message">No student profile is available.</p>}</div>
}
