import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null)
  const [mustChangePassword, setMustChangePassword] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiRequest('/auth/me')
      .then((data) => { setStudent(data.student); setMustChangePassword(data.mustChangePassword) })
      .catch(() => { setStudent(null); setMustChangePassword(false) })
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(() => ({
    student,
    mustChangePassword,
    loading,
    async login(email, password) {
      const data = await apiRequest('/auth/login', { method: 'POST', body: { email, password } })
      setStudent(data.student)
      setMustChangePassword(data.mustChangePassword)
    },
    async changeTemporaryPassword(password) {
      await apiRequest('/auth/change-temporary-password', { method: 'POST', body: { password } })
      setMustChangePassword(false)
    },
    async logout() {
      await apiRequest('/auth/logout', { method: 'POST' })
      setStudent(null)
      setMustChangePassword(false)
    },
  }), [student, mustChangePassword, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
