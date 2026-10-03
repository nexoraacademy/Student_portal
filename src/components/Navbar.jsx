import { NavLink } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'
import fullLogo from '../asset/main_logo.png'
import './Navbar.css'

const links = [
  { to: '/', label: 'Overview', end: true },
  { to: '/announcements', label: 'Announcements' },
  { to: '/programme', label: 'My programme' },
  { to: '/assignments', label: 'Assignments' },
  { to: '/results', label: 'Results' },
  { to: '/certificates', label: 'Certificates' },
]

export default function Navbar() {
  const { student, logout } = useAuth()
  const initials = `${student?.firstName?.[0] || ''}${student?.lastName?.[0] || ''}`
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="/" aria-label="Nexora Academy home">
          <img className="brand-full-logo" src={fullLogo} alt="Nexora Academy" />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `main-nav-link${isActive ? ' active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/profile" className={({ isActive }) => `header-profile${isActive ? ' active' : ''}`} aria-label="Open profile">
          <span className="header-avatar">{initials}</span>
          <span className="header-profile-name">{student?.firstName} {student?.lastName}</span>
          <span className="profile-chevron">⌄</span>
        </NavLink>
        <button className="header-logout" type="button" onClick={() => logout().catch(() => {})}>Sign out</button>
      </div>
    </header>
  )
}
