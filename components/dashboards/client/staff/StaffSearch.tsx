'use client';
import { sendInvite } from "@/app/actions/store.actions";
import { useDebouncedValue } from "@/hooks";
import { useStore } from "@/stores";
import { useMemo, useState } from "react";
import CandidateCard from "./CandidateCard";
import SearchBar from "./SearchBar";

export type SearchListProps = {
    data: { id: string; email: string; fullName: string | null; }[]
}

export default function StaffSearch ({ data }: SearchListProps) {

    const [query, setQuery] = useState("")
    const debouncedQuery = useDebouncedValue(query, 300)
    const { store } = useStore()

    const results = useMemo(() => {
        if (!debouncedQuery.trim()) return data

        const q = debouncedQuery.toLowerCase()

        if (data && !data.length) {
            return data
        }

        return data.filter(item =>
            item.fullName?.toLowerCase().includes(q)
        )
    }, [data, debouncedQuery])

    return (
        <div className="">
            <SearchBar query={query} setQuery={setQuery} />
            <ul className="py-6">
                {results.map(i => (
                    <CandidateCard 
                        key={i.id} 
                        data={i}  
                        onInvite={() => sendInvite({
                            targetId: i.id,
                            storeId: store.id
                        })}
                    />
                ))}
            </ul>
        </div>
    );
}