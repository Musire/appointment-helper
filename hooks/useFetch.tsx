'use client'

import { useEffect, useState } from 'react';

export type FetchState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string }

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
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  // Extract stable primitive values and stringified keys to prevent infinite loops
  const method = options?.method
  const credentials = options?.credentials
  const cache = options?.cache
  const mode = options?.mode
  const headersKey = JSON.stringify(options?.headers ?? null)
  const bodyKey = JSON.stringify(options?.body ?? null)

  // Store options in stable references or variables inside effect
  const bodyValue = options?.body
  const headersValue = options?.headers

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    let isMounted = true

    // 🔑 Defer the loading update to prevent synchronous cascading renders during effect execution
    queueMicrotask(() => {
      if (isMounted) {
        setState({ status: 'loading', data: null, error: null })
      }
    })

    const isJsonBody =
      bodyValue !== undefined &&
      typeof bodyValue === 'object' &&
      !(bodyValue instanceof FormData)

    fetch(url, {
      method: method ?? (bodyValue ? 'POST' : 'GET'),
      body: isJsonBody ? JSON.stringify(bodyValue) : (bodyValue as BodyInit | undefined),
      headers: {
        ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
        ...headersValue,
      },
      credentials: credentials,
      cache: cache,
      mode: mode,
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
        if (isMounted) {
          setState({ status: 'success', data, error: null })
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError' || !isMounted) return

        setState({
          status: 'error',
          data: null,
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [url, bodyKey, headersKey, method, credentials, cache, mode, bodyValue, headersValue])

  return state
}
