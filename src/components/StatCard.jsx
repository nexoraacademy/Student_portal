import './StatCard.css'

export default function StatCard({ label, value, detail, icon, tone = 'purple' }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><strong className="stat-value">{value}</strong><div className="stat-detail">{detail}</div></article>
}
