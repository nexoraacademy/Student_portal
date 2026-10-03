import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import useResource from '../useResource.js'
import { apiRequest } from '../api.js'
import nLogo from '../asset/logo_N.png'
import './Certificates.css'

function dateLabel(value) {
  return value ? new Date(value).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No expiry date'
}

export default function Certificates() {
  const [requesting, setRequesting] = useState(null)
  const { data, loading, error, reload } = useResource('/certificates')
  const certificates = data?.certificates || []
  const renew = async (id) => {
    setRequesting(id)
    try { await apiRequest(`/certificates/${id}/renew`, { method: 'POST' }); await reload() } catch {} finally { setRequesting(null) }
  }
  return <div className="certificates-page"><PageHeading eyebrow="Your achievements" title="Certificates" description="View, download, and renew your earned certificates."/><div className="certificate-notice"><span>✦</span><p>Certificate details and expiry dates are taken from your student record. You can request renewal when a certificate has expired.</p></div>{error && <p className="page-data-message error">{error}</p>}{loading ? <p className="page-data-message">Loading certificates…</p> : <><section className="certificate-list">{certificates.map((certificate) => { const isExpired = certificate.expiresAt && new Date(`${String(certificate.expiresAt).slice(0, 10)}T23:59:59`) < new Date(); const renewalRequested = certificate.renewalStatus === 'Requested' || certificate.renewalStatus === 'Under Review'; return <article className="certificate-card" key={certificate.id}><div className="certificate-card-art"><div className="certificate-seal"><img src={nLogo} alt="Nexora Academy N mark" /></div><span className="certificate-ribbon">NEXORA ACADEMY</span></div><div className="certificate-card-content"><div className="certificate-card-heading"><div><span className="certificate-type">PROGRAMME CERTIFICATE</span><h2>{certificate.title || `${certificate.programme} Certificate`}</h2></div><span className={`certificate-status ${isExpired ? 'expired' : 'valid'}`}>{isExpired ? 'Expired' : certificate.status}</span></div><p className="certificate-programme">{certificate.programme}</p><div className="certificate-dates"><div><small>ISSUED</small><strong>{dateLabel(certificate.issueDate)}</strong></div><div><small>{isExpired ? 'EXPIRED' : 'EXPIRES'}</small><strong>{dateLabel(certificate.expiresAt)}</strong></div></div><div className="certificate-card-actions"><Link className="certificate-download-link" to={`/certificates/${certificate.id}`}>View &amp; download <span>↓</span></Link>{isExpired && !renewalRequested && <button type="button" className="renew-certificate-button" disabled={requesting === certificate.id} onClick={() => renew(certificate.id)}>{requesting === certificate.id ? 'Submitting…' : 'Request renewal →'}</button>}{renewalRequested && <span className="certificate-status valid">Renewal {certificate.renewalStatus}</span>}</div></div></article> })}{!certificates.length && <p className="page-data-message">No certificates are currently issued to your student record.</p>}</section><section className="certificate-coming-soon"><span>🏅</span><div><strong>Working toward your next certificate?</strong><p>Complete your enrolled programme and pass each section assessment to earn a certificate.</p><Link to="/programme">Continue your programme →</Link></div></section></>}</div>
}
