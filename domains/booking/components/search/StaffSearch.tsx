'use client';

import { SearchList } from "@/components/UI";
import { StaffBrief, StaffCard } from ".";

type StaffSearchProps<T extends StaffBrief> = {
    staff: T[];
    selectedId: string | null;
    onSelect: (v: string | null) => void
}

export default function StaffSearch<T extends StaffBrief> ({ 
    staff, 
    selectedId,
    onSelect,
}: StaffSearchProps<T>) {

    const filterStaff = (employee: T, query: string) => {
        const q = query.toLowerCase()

        return (
            (employee.fullName ?? "").toLowerCase().includes(q) ||
            employee.email.toLowerCase().includes(q)
        )
    }

    return (
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
    );
}