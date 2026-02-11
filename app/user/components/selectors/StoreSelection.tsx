'use client';

import { useFetch } from "@/hooks";
import { useState } from "react";
import StoreSelector from "./StoreSelector";
import { StoreBrief, StoreCard } from "../search";
import { StoreDetails } from ".";

type StoreSelectionProps = {
    staffId: string;
    onChange: (v: string) => void;
}

export default function StoreSelection ({ onChange, staffId }: StoreSelectionProps) {
    const [selectedId, setSelectedId] = useState< string | null >(null);
    const [view, setView] = useState<'stores' | 'details'>('stores');

    const result = useFetch<StoreBrief[]>(
        '/api/staffStore',
        {
            method: 'POST',
            body: { staffId },
        }
    )

    const storeDetails = useFetch<StoreBrief | null>(
        selectedId ? '/api/storeDetails' : null,
        {
            method: 'POST',
            body: { 'storeId': selectedId ?? null }
        }
    )


    const handleContinue = () => {
        if (view === 'stores') {
            setView('details')
            return
        }
        if (!selectedId) return;
        onChange(selectedId)
    }
    
    const handleUpdate = (target: string | null) => {
        setSelectedId(prev => prev === target ? null : target)
    }

    if (!result?.data) return null;

    return (
        <>
            {view === 'stores' && (
                <div className="">
                    all stores that barber works at
                    <StoreSelector 
                        stores={result?.data}
                        selected={selectedId}
                        onSelect={handleUpdate}
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
                </div>
            )}
            <StoreDetails view={view} data={storeDetails?.data} />
            <button
                disabled={!selectedId}
                onClick={handleContinue}
                className="btn absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4">
                    Continue
            </button>
        </>
    );
}