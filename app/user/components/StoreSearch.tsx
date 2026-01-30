'use client';

import { SearchList } from "@/components/UI";
import StoreCard, { StoreBrief } from "./StoreCard";

export default function StoreSearch ({ stores }: { stores: StoreBrief[]}) {

    const filterStoreByName = (store: StoreBrief, query: string) => {
        return store.name.toLowerCase().includes(query.toLowerCase())
    }
    
    return (
        <SearchList 
            data={stores}
            filterFn={filterStoreByName}
            renderItem={(s) => (
                <StoreCard key={s.id} data={s} />
            )}
        />
    );
}