import { BodySm, H3 } from "@/components/ui";
import { StoreStatus } from "@/generated/prisma";
import { CircleCheck, Pencil, Store } from "lucide-react";
import Link from "next/link";

interface StoreInfoType {
    setupIssues: string[];
    name: string;
    address: string | null;
    status: StoreStatus
} 

type Props = {
  StoreInfo: StoreInfoType;
  storeId: string
}

export default async function DashboardHeader ({ StoreInfo, storeId } : Props) {
    
    const colorIndicator = StoreInfo.status === 'ACTIVE' 
        ? 'bg-success/10'
        : 'bg-error'

    return (
        <div className="stacked relative ">
            <div className="flex items-center space-x-6">
                <span className="p-4  rounded-md centered bg-alternate/10 size-10  text-alternate">
                    <Store className="shrink-0" strokeWidth={1} />
                </span>
                <span className="">
                    <H3 className="text-xl capitalize" >{StoreInfo.name}</H3>
                    <BodySm className="text-else col-start-2">{StoreInfo.address}</BodySm>
                </span>
                <Link href={`/stores/${storeId}/edit`} className="rounded-md border-border border centered normal-space hover:bg-surface-2 active:bg-surface-1 ml-auto">
                    <Pencil size={20} strokeWidth={1} />
                </Link>
                <div className="">
                    <div className={`rounded-full flex items-center space-x-2 text-success normal-space ${colorIndicator}`}>
                        <CircleCheck className="size-5" />
                        <span className="text-success capitalize text-sm">{StoreInfo.status}</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}