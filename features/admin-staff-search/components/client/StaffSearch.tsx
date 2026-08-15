'use client';

import { SearchList } from "@/components/UI";
import { useStore } from "@/context";
import { sendInvite } from "@/domains/store/actions/store.actions";
import { CandidateCard } from "@/features/admin-invite-staff/components";
import { useRouter } from "next/navigation";

export type Staff = { 
    id: string; 
    email: string; 
    fullName: string | null;
}

type Props = {
    data: Staff[]
}

export default function StaffSearch ({ data }: Props) {
    const router = useRouter()
    const { storeId } = useStore()

    const handleInvite = async (targetId: string) => {
        const { success } = await sendInvite({
            targetId,
            storeId
        })

        if (success) {
            router.refresh()
        }
    }

    return (
        <div className=" flex-1 flex overflow-y-hidden">
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
        </div>
    );
}