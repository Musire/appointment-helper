'use client'
import { useDebouncedValue } from "@/hooks"
import { useMemo, useState } from "react"
import SearchBar from "./SearchBar"

type SearchListProps<T> = {
  data: T[]
  filterFn: (item: T, query: string) => boolean
  renderItem: (item: T) => React.ReactNode
  debounceMs?: number
}

export default function SearchList<T>({
  data,
  filterFn,
  renderItem,
  debounceMs = 300,
}: SearchListProps<T>) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouncedValue(query, debounceMs)

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return data
    return data.filter(item => filterFn(item, debouncedQuery))
  }, [data, debouncedQuery, filterFn])

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <ul className="py-6">
        {results.map(renderItem)}
      </ul>
    </div>
  )
}
