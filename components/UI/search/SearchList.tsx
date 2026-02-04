'use client'
import { useDebouncedValue } from "@/hooks"
import { useMemo, useState } from "react"
import SearchBar from "./SearchBar"

type SearchListProps<T, K extends string | number> = {
  data: T[]
  filterFn: (item: T, query: string) => boolean
  getId: (item: T) => K

  selectedId: K | null
  onSelect: (id: K) => void

  renderItem: (args: {
    item: T
    selected: boolean
    onSelect: () => void
  }) => React.ReactNode

  debounceMs?: number
}

export default function SearchList<T, K extends string | number>({
  data,
  filterFn,
  getId,
  selectedId,
  onSelect,
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
            selected: selectedId === id,
            onSelect: () => onSelect(id),
          })
        })}
      </ul>
    </div>
  )
}
