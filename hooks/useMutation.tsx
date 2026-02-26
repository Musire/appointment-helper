'use client'

import { useCallback, useEffect, useRef, useState } from 'react';

export type MutationState<T> = 
    | { status: 'idle'; data: null; error: null } 
    | { status: 'loading'; data: null; error: null } 
    | { status: 'success'; data: T; error: null } 
    | { status: 'error'; data: null; error: string } 

type FetchOptions = { 
    method?: RequestInit['method'] 
    headers?: HeadersInit 
    body?: unknown 
    credentials?: 
    RequestInit['credentials'] 
    cache?: RequestInit['cache'] 
    mode?: RequestInit['mode'] 
}

export default function useMutation<T>() {
  const [state, setState] = useState<MutationState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  const controllerRef = useRef<AbortController | null>(null)

  const execute = useCallback(
    async (url: string, options?: FetchOptions) => {
      // Cancel any previous request
      controllerRef.current?.abort()

      const controller = new AbortController()
      controllerRef.current = controller

      setState({ status: 'loading', data: null, error: null })

      try {
        const isJsonBody =
          options?.body &&
          typeof options.body === 'object' &&
          !(options.body instanceof FormData)

        const res = await fetch(url, {
          method: options?.method ?? (options?.body ? 'POST' : 'GET'),
          body: isJsonBody
            ? JSON.stringify(options.body)
            : (options?.body as BodyInit | undefined),
          headers: {
            ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
            ...options?.headers,
          },
          signal: controller.signal,
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Request failed: ${res.status}`)
        }

        const data: T = await res.json()
        setState({ status: 'success', data, error: null })
        return data
      } catch (err: any) {
        if (err.name === 'AbortError') return

        const message = err?.message ?? 'Unknown error'
        setState({ status: 'error', data: null, error: message })
        throw err
      }
    },
    []
  )

  const abort = useCallback(() => {
    controllerRef.current?.abort()
  }, [])

  const reset = useCallback(() => {
    controllerRef.current?.abort()
    setState({ status: 'idle', data: null, error: null })
  }, [])

  // Auto-abort on unmount
  useEffect(() => {
    return () => {
      controllerRef.current?.abort()
    }
  }, [])

  return {
    ...state,
    execute,
    abort,
    reset,
  }
}