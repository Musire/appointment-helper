'use client';

import { useFetch } from "@/hooks";
import { StoreDetails } from ".";
import { StoreBrief, StoreCard } from "../search";
import StoreSelector from "./StoreSelector";
import { StoreConfig } from "@/generated/prisma";

type StoreSelectionProps = {
    staffId: string;
    selectedId: string | null;
    onSelect: (v: string | null) => void
    view: 'stores' | 'details'
}

export default function StoreSelection ({ 
    staffId,
    selectedId,
    onSelect,
    view
}: StoreSelectionProps) {

    const result = useFetch<StoreBrief[]>(
        '/api/staffStore',
        {
            method: 'POST',
            body: { staffId },
        }
    )

    const storeDetails = useFetch<StoreConfig>(
        selectedId ? '/api/storeDetails' : null,
        {
            method: 'POST',
            body: { 'storeId': selectedId ?? null }
        }
    )


    if (!result?.data) return null;
    

    return (
        <>
            {view === 'stores' && (
                <StoreSelector 
                    stores={result?.data}
                    selected={selectedId}
                    onSelect={onSelect}
                    getId={(store: StoreBrief) => store.id}
                    renderItem={({item, selected, onSelect}) => (
                        <StoreCard
                            key={item.id} 
                            data={item}
                            {...{selected}}
                            {...{onSelect}}
                        />  
                    )}
                />
            )}
            {selectedId && <StoreDetails  userId={selectedId} />}
        </>
    );
}