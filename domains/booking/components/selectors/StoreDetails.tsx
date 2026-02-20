import { ConfigTable } from "@/app/admin/store/[slug]/config/components";
import { StoreConfig } from "@/generated/prisma";
import { useFetch } from "@/hooks";

type StoreDetailsProps = {
    userId: string;
}

export default function StoreDetails ({ userId }: StoreDetailsProps) {

    const { status, error, data } = useFetch<StoreConfig>(
        userId ? '/api/storeDetails' : null,
        {
            method: 'POST',
            body: { 'storeId': userId }
        }
    )

    if (!data) return null;

    return (
        <div className="max-h-[55dvh]  overflow-scroll scrollbar-none ">
            <ConfigTable config={data} />
        </div>
    );
}