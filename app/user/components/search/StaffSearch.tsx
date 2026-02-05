'use client';

import { SearchList } from "@/components/UI";
import { useState } from "react";
import { StaffCard, StaffBrief, StaffDetails } from "./"

export default function StaffSearch ({ staff }: { staff: StaffBrief[]}) {

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
            {!!selectedId && (view === 'search') && (
                <button onClick={() => setView('details')} className="btn absolute right-6 bottom-6">view details</button>
            )}
            {(view === 'details' && (
                <StaffDetails 
                    onBack={handleBack}
                />
            ))}
        </>
    );
}