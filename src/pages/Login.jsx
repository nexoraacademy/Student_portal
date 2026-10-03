import { useState } from 'react'
import { useAuth } from '../AuthContext.jsx'
import fullLogo from '../asset/main_logo.png'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try { await login(email, password) } catch (err) { setError(err.message) } finally { setSubmitting(false) }
  }

  return <main className="auth-page"><section className="auth-card"><a className="auth-brand" href="/" aria-label="Nexora Academy"><img src={fullLogo} alt="Nexora Academy" /></a><span className="auth-eyebrow">STUDENT LEARNING PORTAL</span><h1>Welcome back</h1><p className="auth-intro">Sign in with the email address and password sent to you by Nexora Academy.</p><form onSubmit={submit}><label>Email address<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="auth-submit" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button></form><p className="auth-help">Newly accepted? Use the temporary password emailed to you. You’ll set a new password after signing in.</p></section></main>
}
