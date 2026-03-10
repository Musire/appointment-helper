'use client'
import { useDebouncedValue } from "@/hooks"
import { useMemo, useState } from "react"
import SearchBar from "./SearchBar"

type SearchListProps<T, K extends string > = {
  data: T[]
  filterFn: (item: T, query: string) => boolean
  getId: (item: T) => K
  renderItem: (args: {
    item: T
    id: K
  }) => React.ReactNode

  debounceMs?: number
}

export default function SearchList<T, K extends string>({
  data,
  filterFn,
  getId,
  renderItem,
  debounceMs = 300,
}: SearchListProps<T, K>) {
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
        {results.map(item => {
          const id = getId(item)

          return renderItem({
            item,
            id
          })
        })}
      </ul>
    </div>
  )
}
