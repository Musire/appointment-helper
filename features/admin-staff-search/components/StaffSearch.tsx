'use client';

import { SearchList } from "@/components/ui";
import { useStore } from "@/context";
import { StaffDataType } from "@/domains/invite/invite.types";
import { CandidateCard } from "@/features/admin-invite-staff/components";


type Props = {
    data: StaffDataType[]
}

export default function StaffSearch ({ data }: Props) {
    const { storeId } = useStore()

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
                        storeId={storeId}
                    />
                )}
            />
        </div>
    );
}