import { useLocation } from 'react-router-dom'
import './Topbar.css'

const titles = { '/': 'Overview', '/programme': 'My programme', '/announcements': 'Announcements', '/certificates': 'Certificates', '/assignments': 'Assignments', '/results': 'Results', '/profile': 'My profile' }

export default function Topbar() {
  const { pathname } = useLocation()
  return (
    <header className="topbar">
      <div className="topbar-title"><span>STUDENT PORTAL</span><strong>{titles[pathname] || (pathname.startsWith('/certificates/') ? 'Certificate' : 'Overview')}</strong></div>
    </header>
  )
}
