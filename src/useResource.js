import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from './api.js'

export default function useResource(path) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try { setData(await apiRequest(path)) } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [path])
  useEffect(() => { reload() }, [reload])
  return { data, loading, error, reload }
}
