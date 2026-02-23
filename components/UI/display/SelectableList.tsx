'use client'

import SelectableCard from "./SelectableCard";

type SelectableListProps<T, K extends string | null> = {
    items: T[]
    selected: K | null;
    onSelect: (v: K) => void;
    getId: (item: T) => K
    renderItem: (item: T) => React.ReactNode
}

export default function SelectableList<T, K extends string | null> ({ 
    items,
    selected,
    onSelect,
    getId,
    renderItem
}: SelectableListProps<T, K>) {

    return (
        <div className="">
            <ul className="flex flex-col space-y-4">
                {items.map(item => {
                    const id = getId(item)
                    return (
                        <SelectableCard
                            key={id}
                            selected={selected === id}
                            onSelect={() => onSelect(id)}
                        >
                            {renderItem(item)}
                        </SelectableCard>
                    )
                })}
            </ul>
        </div>
    );
}