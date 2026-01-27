'use client';

import { editStoreConfig } from "@/app/actions/store.actions";
import { useRouter } from "next/navigation";

export default function EditButton ({ storeId }: { storeId: string | null }) {
    if (!storeId) return null;

    
    const router = useRouter()
    
    const updateConfig = async () => {
        const { success, error } = await editStoreConfig(storeId)

        if (!success) {
            console.error(error)
            return ;
        }

        router.refresh()
    }
    
    return (
        <button 
            onClick={updateConfig} 
            type="button" 
            className="btn self-end"
        >
            Edit Hours
        </button>
    );
}