'use client';

import { SearchList } from "@/components/UI";
import { StaffBrief, StaffCard, StaffDetails } from "./";

type StaffSearchProps<T extends StaffBrief> = {
    staff: T[];
    onChange: (v: string) => void;
    selectedId: string | null;
    onSelect: (v: string | null) => void
    view: 'search' | 'details'
}

export default function StaffSearch<T extends StaffBrief> ({ 
    staff, 
    onChange, 
    selectedId,
    onSelect,
    view
}: StaffSearchProps<T>) {

    const filterStaff = (employee: T, query: string) => {
        const q = query.toLowerCase()

        return (
            (employee.fullName ?? "").toLowerCase().includes(q) ||
            employee.email.toLowerCase().includes(q)
        )
    }

    const handleUpdate = () => {
        if (!selectedId) return;
        onChange(selectedId)
    }

    return (
        <>
            {(view === 'search') && (
                <SearchList 
                    data={staff}
                    getId={staff => staff.id}
                    filterFn={filterStaff}
                    selectedId={selectedId}
                    onSelect={onSelect}
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

            {(view === 'details') && <StaffDetails userId={selectedId} />}       
        </>
    );
}