type StoreSelectorProps<T, K extends string | null> = {
    stores: T[]
    selected: K;
    onSelect: (v: K) => void;
    getId: (item: T) => K
    renderItem: (args: {
        item: T
        selected: boolean
        onSelect: () => void
    }) => React.ReactNode
}

export default function StoreSelector<T, K extends string | null> ({ 
    stores,
    selected,
    onSelect,
    getId,
    renderItem
}: StoreSelectorProps<T, K>) {


    return (
        <div className="">
            <ul className="">
                {stores?.map(item => {
                    const id = getId(item)

                    return (
                        renderItem({
                            item,
                            selected: selected === id,
                            onSelect: () => onSelect(id),
                        })
                    )})}
            </ul>
        </div>
    );
}