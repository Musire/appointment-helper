'use client';

import { SearchList } from "@/components/UI";
import { StoreBrief, StoreCard } from "../cards/StoreCard";

type StoreSearchProps<T extends StoreBrief> = {
    stores: T[];
    selectedId: string | null;
    onSelect: (v: string | null) => void
}

export default function StoreSearch<T extends StoreBrief> ({ 
    stores, 
    selectedId,
    onSelect,
}: StoreSearchProps<T>) {

    const filterStoreByName = (store: StoreBrief, query: string) => {
        return store.name.toLowerCase().includes(query.toLowerCase())
    }
    
    return (
       <SearchList 
            data={stores}
            getId={store => store.id}
            filterFn={filterStoreByName}
            selectedId={selectedId}
            onSelect={onSelect}
            renderItem={({ item, selected, onSelect }) => (
                <StoreCard key={item.id} data={item} {...{selected}} {...{onSelect}} />
            )}
        />
    );
}