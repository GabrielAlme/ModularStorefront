import { useEffect, useState } from 'react'

// Fetches JSON from our backend (for example "/api/products") and tells the component what state it is in.
// Returns { loading, error, data }.
export default function useApi(path) {
  const [state, setState] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    let cancelled = false // stops a late response from updating a component that is already gone

    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        return res.json()
      })
      .then(data => {
        if (!cancelled) setState({ loading: false, error: null, data })
      })
      .catch(err => {
        if (!cancelled) setState({ loading: false, error: err.message, data: null })
      })

    return () => { cancelled = true }
  }, [path])

  return state
}
