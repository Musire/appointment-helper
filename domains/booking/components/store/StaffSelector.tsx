'use client';

import { SelectableList } from "@/components/UI";
import { useFetch } from "@/hooks";
import { LoaderCircle } from "lucide-react";
import { StaffSlot } from "../review";

interface StaffUser {
    id: string;
    fullName: string;
    email: string
}

type StaffSelectorProps = {
    storeId: string;
    selectedId: string | null;
    onSelect: (s: string) => void;
}

export default function StaffSelector({ 
    storeId, 
    selectedId, 
    onSelect
}: StaffSelectorProps) {
    const { status, data, error } = useFetch<StaffUser[]>('/api/storeStaff', 
        { 
            method: 'POST' ,
            body: { storeId }
        }
    )

    if (status === 'idle') return null

    if (status === 'loading') {
        return <LoaderCircle />
    }

    if (!!error ) {
        return <p className="text-error-dark">{error}</p>
    }

    return (
        <div className="">
            <SelectableList 
                items={data}
                selected={selectedId}
                onSelect={onSelect}
                getId={user => user.id}
                renderItem={(item) => (
                    <StaffSlot staff={item} />
                )}
            />
        </div>
    )
}