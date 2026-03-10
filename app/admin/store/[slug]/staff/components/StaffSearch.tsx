'use client';
import { sendInvite } from "@/app/actions/store.actions";
import { SearchList } from "@/components/UI";
import { useRouter } from "next/navigation";
import CandidateCard from "./CandidateCard";

export type Staff = { 
    id: string; 
    email: string; 
    fullName: string | null;
}

type Props = {
    data: Staff[];
    store: {
        id: string;
        name: string;
    }
}

export default function StaffSearch ({ data, store }: Props) {
    const router = useRouter()

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
            getId={item => item.id}
            renderItem={({ item, id}) => (
                <CandidateCard
                    key={id}
                    data={item}
                    onInvite={() => handleInvite(id)}
                />
            )}
        />
    );
}