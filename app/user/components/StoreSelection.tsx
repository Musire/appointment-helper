'use client';

import { useFetch } from "@/hooks";
import { useState } from "react";
import StoreSelector from "./StoreSelector";
import { StoreBrief, StoreCard } from "./search";

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


    const handleChange = () => {
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
                        onChange={handleChange}
                        selected={selectedId}
                        onSelect={handleUpdate}
                        setView={setView}
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
            {view === 'details' && (
                <div className="">
                    <pre className="">
                        {JSON.stringify(storeDetails?.data, null, 2)}
                    </pre>
                    
                </div>
            )}
            {view === 'details' && (
                <button 
                    onClick={handleChange}
                    className="btn absolute bottom-20 right-6"
                >
                    continue
                </button>
            )}
        </>
    );
}