'use client';
import { sendInvite } from "@/app/actions/store.actions";
import { SearchList } from "@/components/UI";
import { useStore } from "@/stores";
import { useRouter } from "next/navigation";
import CandidateCard from "./CandidateCard";

export type Staff = { 
    id: string; 
    email: string; 
    fullName: string | null;
}

export default function StaffSearch ({ data }: { data: Staff[]}) {
    const router = useRouter()
    const { store } = useStore()

    const handleInvite = async (targetId: string) => {
        const { success, error } = await sendInvite({
            targetId,
            storeId: store.id,
            storeName: store.name
        })

        if (success) {
            router.refresh()
        }
    }

    return (
        <SearchList
            data={data}
            filterFn={(item, query) =>
                item.fullName?.toLowerCase().includes(query.toLowerCase()) ?? false
            }
            renderItem={(item) => (
                <CandidateCard
                    key={item.id}
                    data={item}
                    onInvite={() => handleInvite(item.id)}
                />
            )}
        />
    );
}