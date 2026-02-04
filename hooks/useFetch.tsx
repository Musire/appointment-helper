'use client'

import { useEffect, useState } from 'react';

type FetchState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string }

export function useFetch<T>(
  url: string | null,
  options?: RequestInit
) {
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  useEffect(() => {
    if (!url) {
      setState({
        status: 'idle',
        data: null,
        error: null,
      })
      return
    }

    const controller = new AbortController()

    setState({
      status: 'loading',
      data: null,
      error: null,
    })

    fetch(url, {
      ...options,
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }
        return res.json()
      })
      .then((data: T) => {
        setState({
          status: 'success',
          data,
          error: null,
        })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({
          status: 'error',
          data: null,
          error: err.message ?? 'Unknown error',
        })
      })

    return () => controller.abort()
  }, [url])

  return state
}
