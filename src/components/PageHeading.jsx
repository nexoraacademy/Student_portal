import './PageHeading.css'

export default function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div><span>{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>
}
