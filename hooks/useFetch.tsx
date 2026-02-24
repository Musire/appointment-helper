'use client'

import { useEffect, useState } from 'react';

export type FetchState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string }

/**
 * Custom fetch options
 * We DO NOT extend RequestInit to avoid leaking BodyInit
 */
type FetchOptions = {
  method?: RequestInit['method']
  headers?: HeadersInit
  body?: unknown
  credentials?: RequestInit['credentials']
  cache?: RequestInit['cache']
  mode?: RequestInit['mode']
}

export default function useFetch<T>(
  url: string | null,
  options?: FetchOptions
) {
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  // 🔑 Ensures refetch when body changes (e.g. selectedId)
  const bodyKey = JSON.stringify(options?.body ?? null)

  useEffect(() => {
    if (!url) {
      setState({ status: 'idle', data: null, error: null })
      return
    }

    const controller = new AbortController()

    setState({ status: 'loading', data: null, error: null })

    const isJsonBody =
      options?.body !== undefined &&
      typeof options.body === 'object' &&
      !(options.body instanceof FormData)

    fetch(url, {
      method: options?.method ?? (options?.body ? 'POST' : 'GET'),
      body: isJsonBody
        ? JSON.stringify(options?.body)
        : (options?.body as BodyInit | undefined),
      headers: {
        ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
        ...options?.headers,
      },
      credentials: options?.credentials,
      cache: options?.cache,
      mode: options?.mode,
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Request failed: ${res.status}`)
        }
        return res.json()
      })
      .then((data: T) => {
        setState({ status: 'success', data, error: null })
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
  }, [url, bodyKey])

  return state
}
