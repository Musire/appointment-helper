import { getStoreHours, getStoreStatus } from "@/domains/store/store.queries";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "./DashboardHeader";
import StatusCard from "./StatusCard";
import { DaySchedule, StoreHoursSummary } from "./StoreHoursSummary";

type Props = {
  storeId: string;
}

export default async function AdminStoreDetails ({ storeId }: Props) {
    const { data: storeHours } = await getStoreHours(storeId)
    const { data: res } = await getStoreStatus(storeId)
    if (!storeHours || !res) return null;

    const schedule: DaySchedule[] = [
        { day: 'Monday', start: '09:00 AM', end: '05:00 PM' },
        { day: 'Tuesday', start: '09:00 AM', end: '05:00 PM' },
        { day: 'Wednesday', start: '09:00 AM', end: '05:00 PM' },
        { day: 'Thursday', start: '09:00 AM', end: '05:00 PM' },
        { day: 'Friday', start: '09:00 AM', end: '05:00 PM' },
        { day: 'Saturday', start: null, end: null },
        { day: 'Sunday', start: null, end: null },
    ];

    const storeBase = `/stores/${storeId}`;
    
    return (
        <section className="stacked  flex-1 p-6 overflow-y-auto scrollbar-adjust ">
            <DashboardHeader StoreInfo={res.storeInfo} storeId={storeId} />
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
            <StoreHoursSummary schedule={schedule} />
            <ul className="grid grid-cols-3 gap-x-4 shrink-0">
                <StatusCard
                    value={res.metrics.services }
                    label="Services"
                    href={`${storeBase}/services`}
                />
                <StatusCard 
                    value={res.metrics.staff }
                    label="Staff"
                    href={`${storeBase}/staff`}
                />
                <StatusCard 
                    value={res.metrics.invites }
                    label="Invites"
                    href={`${storeBase}/staff`}
                />
            </ul>
            {/* <StoreHours initialHours={storeHours} /> */}
        </section>
    );
}