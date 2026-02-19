import { ConfigTable } from "@/app/admin/store/[slug]/config/components";
import { StoreConfig } from "@/generated/prisma";

type StoreDetailsProps = {
    view: 'stores' | 'details';
    data: StoreConfig;
}

export default function StoreDetails ({ view, data }: StoreDetailsProps) {
    if (view !== 'details') return null;

    return (
        <div className="max-h-[55dvh]  overflow-scroll scrollbar-none ">
            <ConfigTable config={data} />
        </div>
    );
}