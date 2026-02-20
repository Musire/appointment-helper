import { ConfigTable } from "@/app/admin/store/[slug]/config/components";
import { StoreConfig } from "@/generated/prisma";
import { useFetch } from "@/hooks";

type StoreDetailsProps = {
    staffId: string;
}

export default function StoreDetailsStep ({ staffId }: StoreDetailsProps) {

    const { status, error, data } = useFetch<StoreConfig>(
        staffId ? '/api/storeDetails' : null,
        {
            method: 'POST',
            body: { 'storeId': staffId }
        }
    )

    if (!data) return null;

    return (
        <div className="max-h-[55dvh]  overflow-scroll scrollbar-none ">
            <ConfigTable config={data} />
        </div>
    );
}