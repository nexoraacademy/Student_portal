import PageHeading from '../components/PageHeading.jsx'
import useResource from '../useResource.js'
import './Results.css'

function gradeFor(mark) {
  if (mark >= 75) return { label: 'Distinction', tone: 'green' }
  if (mark >= 50) return { label: 'Pass', tone: 'blue' }
  return { label: 'Needs improvement', tone: 'orange' }
}

export default function Results() {
  const { data, loading, error } = useResource('/results')
  const results = data?.results || []
  const average = data?.termAverage
  return <div><PageHeading eyebrow="Your progress" title="Results" description="Review marks released for assessments in your programme."/>{error && <p className="page-data-message error">{error}</p>}{loading ? <p className="page-data-message">Loading results…</p> : <><section className="results-overview"><div className="average-mark"><span>PROGRAMME AVERAGE</span><strong>{average == null ? '—' : <>{average}<small>%</small></>}</strong><em>{results.length} graded assessments</em></div><div className="results-note"><div className="note-icon">✦</div><div><strong>Your results</strong><p>Assessment results appear here after your lecturer has graded and released them.</p></div></div></section><section className="results-table-wrap"><div className="results-table-title"><h2>Assessment results</h2><span>{results.length} released</span></div><div className="results-table"><div className="results-table-head"><span>SECTION</span><span>ASSESSMENT</span><span>DATE RELEASED</span><span>MARK</span><span>GRADE</span></div>{results.length ? results.map((item) => { const mark = Number(item.percentage ?? (item.maxScore ? item.score / item.maxScore * 100 : 0)); const grade = gradeFor(mark); return <div className="results-table-row" key={item.id}><div><strong>{item.section}</strong></div><span>{item.assessment}</span><span>{item.releasedAt ? new Date(item.releasedAt).toLocaleDateString('en-ZA') : '—'}</span><strong className="result-mark">{mark.toFixed(0)}%</strong><span className={`result-grade ${grade.tone}`}>{grade.label}</span></div> }) : <p className="page-data-message">No results have been released yet.</p>}</div></section></>}</div>
}
