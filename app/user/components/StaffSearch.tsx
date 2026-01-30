'use client';

import { SearchList } from "@/components/UI";
import StaffCard, { StaffBrief } from "./StaffCard";

export default function StaffSearch ({ staff }: { staff: StaffBrief[]}) {

    const filterStaff = (employee: StaffBrief, query: string) => {
        const q = query.toLowerCase()

        return (
            (employee.fullName ?? "").toLowerCase().includes(q) ||
            employee.email.toLowerCase().includes(q)
        )
    }
    
    return (
        <SearchList 
            data={staff}
            filterFn={filterStaff}
            renderItem={(s) => (
                <StaffCard key={s.id} data={s} />
            )}
        />
    );
}