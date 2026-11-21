import StoreStaffCard from "@/domains/availability/components/StoreStaffCard";
import Link from "next/link";

type Stores = {
    store: {
    id: string;
    name: string;
    };
}[]

type Props = {
  stores: Stores;
}

export default function StaffStores ({ stores }: Props) {
    return (
        <div className="stacked flex-1 p-6">
            <div className="w-full flex space-x-4">
                <p className="w-32 bg-main text-background rounded-full centered normal-space cursor-pointer">Stores</p>
                <Link href="/stores/invites" className="w-32 border border-border hover:bg-surface-1 rounded-full centered normal-space cursor-pointer ">Invites</Link>
            </div>
            <div className="stacked space-y-4  w-full">
                <p className="w-full spaced">
                    <span className="font-medium">Your stores</span>
                    <span className="text-sm border border-success bg-success/20  text-success min-w-24 centered normal-space rounded-full">
                        {`${stores.length} active`}
                    </span>
                </p>
                <div className="flex-1 overflow-y-auto scrollbar-adjust pr-2 space-y-4 ">
                    {stores?.map(s => <StoreStaffCard key={s.store.id} storeStaff={s.store} />)}
                </div>
            </div>
        </div>
    );
}