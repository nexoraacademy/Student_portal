import { Link, useParams } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import useResource from '../useResource.js'
import fullLogo from '../asset/main_logo.png'
import nLogo from '../asset/logo_N.png'
import './CertificateDocument.css'

function dateLabel(value) {
  return value ? new Date(value).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No expiry date'
}

export default function CertificateDocument() {
  const { certificateId } = useParams()
  const { data, loading, error } = useResource('/certificates')
  const profile = useResource('/profile')
  const certificate = data?.certificates?.find((item) => String(item.id) === certificateId)
  if (loading || profile.loading) return <p className="page-data-message">Loading certificate…</p>
  if (error || profile.error) return <p className="page-data-message error">{error || profile.error}</p>
  if (!certificate) return <p className="page-data-message">Certificate not found.</p>
  const recipient = `${profile.data?.student?.firstName || ''} ${profile.data?.student?.lastName || ''}`.trim()
  return <div className="certificate-document-page"><Link className="certificate-back-link" to="/certificates">← Back to certificates</Link><PageHeading eyebrow="Certificate details" title="Your certificate" description="Use your browser’s print dialog to save this certificate as a PDF." action={<button type="button" className="print-certificate-button" onClick={() => window.print()}>Download as PDF <span>↓</span></button>} /><article className="printable-certificate"><div className="print-certificate-border"><img className="print-certificate-logo" src={fullLogo} alt="Nexora Academy" /><div className="print-certificate-kicker">CERTIFICATE OF COMPLETION</div><h1>{certificate.title || `${certificate.programme} Certificate`}</h1><p className="certificate-award-line">This certificate is proudly presented to</p><div className="certificate-recipient">{recipient}</div><p className="certificate-description">for successfully completing the programme</p><h2>{certificate.programme}</h2><div className="certificate-document-seal"><img src={nLogo} alt="N" /></div><div className="certificate-document-footer"><div><span>DATE ISSUED</span><strong>{dateLabel(certificate.issueDate)}</strong></div><div><span>VALID UNTIL</span><strong>{dateLabel(certificate.expiresAt)}</strong></div><div><span>CERTIFICATE NO.</span><strong>{certificate.certificateNumber}</strong></div></div><div className="certificate-document-issuer">Issued by Nexora Academy</div></div></article><p className="pdf-print-hint">In the print dialog, choose <strong>Save as PDF</strong> as the destination.</p></div>
}
