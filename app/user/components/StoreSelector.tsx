type StoreSelectorProps<T, K extends string | null> = {
    stores: T[]
    onChange: () => void;
    selected: K;
    onSelect: (v: K) => void;
    setView: (v: 'stores' | 'details') => void;
    getId: (item: T) => K
    renderItem: (args: {
        item: T
        selected: boolean
        onSelect: () => void
    }) => React.ReactNode
}

export default function StoreSelector<T, K extends string | null> ({ 
    stores,
    onChange,
    selected,
    onSelect,
    setView,
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
            <button 
                onClick={() => setView('details')}
                className="btn absolute bottom-20 right-6"
            >
                check details
            </button>
        </div>
    );
}