import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Programme from './pages/Programme.jsx'
import SectionDetail from './pages/SectionDetail.jsx'
import Assignments from './pages/Assignments.jsx'
import Results from './pages/Results.jsx'
import Profile from './pages/Profile.jsx'
import Announcements from './pages/Announcements.jsx'
import Certificates from './pages/Certificates.jsx'
import CertificateDocument from './pages/CertificateDocument.jsx'
import Login from './pages/Login.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Navbar from './components/Navbar.jsx'
import Topbar from './components/Topbar.jsx'
import './App.css'

export default function App() {
  const { student, loading, mustChangePassword } = useAuth()
  if (loading) return <div className="auth-loading">Loading your portal…</div>
  if (!student) return <Routes><Route path="/login" element={<Login />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes>
  if (mustChangePassword) return <ChangePassword />
  return (
    <div className="portal-shell">
      <Navbar />
      <Topbar />
      <main className="page-content">
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/sections/:sectionId" element={<SectionDetail />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/certificates/:certificateId" element={<CertificateDocument />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
