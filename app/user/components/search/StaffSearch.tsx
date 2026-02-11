'use client';

import { SearchList } from "@/components/UI";
import { useState } from "react";
import { StaffBrief, StaffCard, StaffDetails } from "./";

type StaffSearchProps = {
    staff: StaffBrief[];
    onChange: (v: string) => void; 
}

export default function StaffSearch ({ staff, onChange }: StaffSearchProps) {

    const filterStaff = (employee: StaffBrief, query: string) => {
        const q = query.toLowerCase()

        return (
            (employee.fullName ?? "").toLowerCase().includes(q) ||
            employee.email.toLowerCase().includes(q)
        )
    }

    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [view, setView] = useState<'search' | 'details'>('search');
    
    const handleSelect = (id: string) => {
        setSelectedId(prev => (prev === id ? null : id))
    }

    const handleBack = () => {
        setSelectedId(null)
        setView('search')
    }

    const handleUpdate = () => {
        if (!selectedId) return;
        onChange(selectedId)
    }

    const handleContinue = () =>{
        if (view === 'search') {
            setView('details')
            return
        }

        handleUpdate()
    }
    
    return (
        <>
            {(view === 'search') && (
                <SearchList 
                    data={staff}
                    getId={staff => staff.id}
                    filterFn={filterStaff}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                    renderItem={({ item, selected, onSelect }) => (
                        <StaffCard 
                            key={item.id} 
                            data={item} 
                            {...{selected}} 
                            {...{onSelect}} 
                        />
                    )}
                />
            )}
            <button 
                onClick={handleContinue}
                disabled={!selectedId}
                className="btn absolute left-1/2 -translate-x-1/2 w-3/4 bottom-6"
            >
                Continue
            </button>
            {(view === 'details' && (
                <StaffDetails 
                    onBack={handleBack}
                    onChange={handleUpdate}
                />
            ))}
        </>
    );
}