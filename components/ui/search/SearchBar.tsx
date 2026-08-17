'use client';
import { Search, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type SearchBarProps = {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchBar ({ query, setQuery }: SearchBarProps) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md border px-9 py-2 text-sm focus:outline-none focus:ring-2"
            />

            {query && (
            <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
            >
                <X className="h-4 w-4 text-muted-foreground" />
            </button>
            )}
        </div>
    );
}