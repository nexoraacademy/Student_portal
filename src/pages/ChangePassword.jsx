import { useState } from 'react'
import { useAuth } from '../AuthContext.jsx'
import './Login.css'

export default function ChangePassword() {
  const { changeTemporaryPassword, logout } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (password !== confirm) return setError('The passwords do not match')
    if (password.length < 12) return setError('Use at least 12 characters')
    setSubmitting(true)
    try { await changeTemporaryPassword(password) } catch (err) { setError(err.message) } finally { setSubmitting(false) }
  }

  return <main className="auth-page"><section className="auth-card"><span className="auth-eyebrow">FIRST SIGN IN</span><h1>Choose a new password</h1><p className="auth-intro">Your temporary password can only be used to sign in once. Create a new password to continue.</p><form onSubmit={submit}><label>New password<input type="password" autoComplete="new-password" minLength="12" required value={password} onChange={(event) => setPassword(event.target.value)} /></label><label>Confirm new password<input type="password" autoComplete="new-password" minLength="12" required value={confirm} onChange={(event) => setConfirm(event.target.value)} /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="auth-submit" type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save new password'}</button></form><button className="auth-signout" type="button" onClick={logout}>Sign out</button></section></main>
}
