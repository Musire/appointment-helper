'use client';

import { useFetch } from "@/hooks";
import { StoreBrief, StoreCard } from "../search";
import StoreSelector from "./StoreSelector";

type StoreSelectionProps = {
    staffId: string;
    selectedId: string | null;
    onSelect: (v: string | null) => void
}

export default function StoreSelection ({ 
    staffId,
    selectedId,
    onSelect,
}: StoreSelectionProps) {

    const result = useFetch<StoreBrief[]>(
        '/api/staffStore',
        {
            method: 'POST',
            body: { staffId },
        }
    )

    if (!result?.data) return null;

    return (
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
    );
}