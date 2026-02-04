'use client';

import { SearchList } from "@/components/UI";
import { useState } from "react";
import StoreCard, { StoreBrief } from "./StoreCard";

export default function StoreSearch ({ stores }: { stores: StoreBrief[]}) {

    const filterStoreByName = (store: StoreBrief, query: string) => {
        return store.name.toLowerCase().includes(query.toLowerCase())
    }

    const [selectedId, setSelectedId] = useState<string | null>(null)

    const handleSelect = (id: string) => {
        setSelectedId(prev => (prev === id ? null : id))
    }
    
    return (
        <>
        <SearchList 
            data={stores}
            getId={store => store.id}
            filterFn={filterStoreByName}
            selectedId={selectedId}
            onSelect={handleSelect}
            renderItem={({ item, selected, onSelect }) => (
                <StoreCard key={item.id} data={item} {...{selected}} {...{onSelect}} />
            )}
        />
            {!!selectedId && (
                <button className="btn absolute right-6 bottom-6">view details</button>
            )}
        </>
    );
}