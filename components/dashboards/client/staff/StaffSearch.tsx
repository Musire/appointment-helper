'use client';
import { StaffProfile } from "@/generated/prisma";
import { useDebouncedValue } from "@/hooks";
import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";

export type SearchListProps = {
    data: StaffProfile[]
}

export default function StaffSearch ({ data }: SearchListProps) {

    const [query, setQuery] = useState("")
    const debouncedQuery = useDebouncedValue(query, 300)

    const results = useMemo(() => {
        if (!debouncedQuery.trim()) return data

        const q = debouncedQuery.toLowerCase()

        if (data && !data.length) {
            return data
        }

        return data.filter(item =>
            item.bio?.toLowerCase().includes(q)
        )
    }, [data, debouncedQuery])

    return (
        <div className="">
            <SearchBar query={query} setQuery={setQuery} />
            <ul className="">
                {results.map(i => (
                    <li key={i.id} className="">i.bio</li>
                ))}
            </ul>
        </div>
    );
}