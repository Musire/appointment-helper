import { storeInfo, StoreMetrics } from "@/domains/profile/profile.types";
import { storeHours } from "@/domains/store/store.types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "./DashboardHeader";
import StatusCard from "./StatusCard";
import { StoreHoursSummary } from "./StoreHoursSummary";


type Props = {
  storeId: string;
  storeBase: string;
  storeHours: storeHours[];
  storeInfo: storeInfo;
  storeMetrics: StoreMetrics;
}

export default async function AdminStoreDetails ({ 
    storeId,
    storeBase,
    storeHours,
    storeInfo,
    storeMetrics,
}: Props) {
    
    return (
        <section className="stacked  flex-1 p-6 overflow-y-auto scrollbar-adjust ">
            <DashboardHeader 
                storeInfo={storeInfo} 
                accountStatus={{ 
                    active: storeInfo.active,
                    requirements: storeInfo.requirements
                }} 
            />
            <div className="flex flex-col space-y-2">
                <h3 className="">Store Management</h3>
                <Link href={`/stores/${storeId}/edit`} className="rounded-md border-border border normal-space hover:bg-surface-1 active:bg-surface-1 w-full spaced">
                    <p className="stacked space-y-1">
                        <span className="text-sm font-medium">Store details</span>
                        <span className="text-xs text-else">Name, address</span>
                    </p>
                    <ChevronRight strokeWidth={1} className="text-else group-hover:text-main" />
                </Link>
                <Link href={`/stores/${storeId}/hours`} className="rounded-md border-border border normal-space hover:bg-surface-1 active:bg-surface-1 w-full spaced">
                    <p className="stacked space-y-1">
                        <span className="text-sm font-medium">Store Hours</span>
                        <span className="text-xs text-else">Configure weekly operation hours</span>
                    </p>
                    <ChevronRight strokeWidth={1} className="text-else group-hover:text-main" />
                </Link>
            </div>
            <StoreHoursSummary storeHours={storeHours} />
            <ul className="grid grid-cols-3 gap-x-4 shrink-0">
                <StatusCard
                    value={storeMetrics.services }
                    label="Services"
                    href={`${storeBase}/services`}
                />
                <StatusCard 
                    value={storeMetrics.staff }
                    label="Staff"
                    href={`${storeBase}/staff`}
                />
                <StatusCard 
                    value={storeMetrics.invites }
                    label="Invites"
                    href={`${storeBase}/staff`}
                />
            </ul>
        </section>
    );
}