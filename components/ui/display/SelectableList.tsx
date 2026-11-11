
'use client'

import { ScrollableContainer } from "../containers"
import SelectableCard from "./SelectableCard"

type BaseProps<T, K extends string | null> = {
  items: T[]
  getId: (item: T) => K
  renderItem: (item: T) => React.ReactNode
  scrollable?: boolean
}

type SelectableListProps<T, K extends string | null> =
  BaseProps<T, K> & (
    | {
        multi?: false
        selected: K | undefined
        onSelect: (v: K | undefined) => void
      }
    | {
        multi: true
        selected: K[]
        onSelect: (v: K) => void
      }
  )

export default function SelectableList<T, K extends string | null>({
  items,
  selected,
  onSelect,
  getId,
  renderItem,
  scrollable,
  multi = false
}: SelectableListProps<T, K>) {

  const handleSelect = (id: K) => {
    if (multi) {
      (onSelect as (v: K) => void)(id)
    } else {
      (onSelect as (v: K | undefined) => void)(
        selected === id ? undefined : id
      )
    }
  }

  const list = items.map(item => {
    const id = getId(item)

    const isSelected = multi
      ? (selected as K[]).includes(id)
      : selected === id

    return (
      <SelectableCard
        key={id}
        selected={isSelected}
        onSelect={() => handleSelect(id)}
      >
        {renderItem(item)}
      </SelectableCard>
    )
  })

  return (
    <div>
      {scrollable ? (
        <ScrollableContainer>
          {list}
        </ScrollableContainer>
      ) : (
        <ul className="flex flex-col space-y-4">
          {list}
        </ul>
      )}
    </div>
  )
}
