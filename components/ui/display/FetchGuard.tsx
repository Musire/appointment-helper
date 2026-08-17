import { FetchState } from "@/hooks/useFetch"


type FetchGuardProps<T> = {
  state: FetchState<T>
  children: (data: T) => React.ReactNode
  loading?: React.ReactNode
  idle?: React.ReactNode
  error?: (message: string) => React.ReactNode
}

export default function FetchGuard<T>({
  state,
  children,
  loading = <div>Loading...</div>,
  idle = null,
  error
}: FetchGuardProps<T>) {

  switch (state.status) {
    case 'idle':
      return <>{idle}</>

    case 'loading':
      return <>{loading}</>

    case 'error':
      return (
        <>
          {error
            ? error(state.error)
            : <div>{state.error}</div>}
        </>
      )

    case 'success':
      return <>{children(state.data)}</>
  }
}