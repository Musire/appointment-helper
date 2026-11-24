import { BodySm, H3 } from "@/components/ui";
import { type AccountStatus as AccountStatusType, storeInfo } from "@/domains/profile/profile.types";
import AccountStatus from "@/features/dashboard/components/AccountStatus";
import { Store } from "lucide-react";


type Props = {
  storeInfo: storeInfo;
  accountStatus: AccountStatusType;
}

export default async function DashboardHeader ({ storeInfo, accountStatus } : Props) {
    
    return (
        <div className="stacked relative ">
            <div className="flex items-center space-x-6">
                <span className="p-4  rounded-md centered bg-alternate/10 size-10  text-alternate">
                    <Store className="shrink-0" strokeWidth={1} />
                </span>
                <span className="">
                    <H3 className="text-xl capitalize" >{storeInfo.name}</H3>
                    <BodySm className="text-else col-start-2">{storeInfo.address}</BodySm>
                </span>
                <div className="ml-auto">
                    <AccountStatus 
                        active={accountStatus.active}
                        requirements={accountStatus.requirements}
                    />
                </div>
            </div>
            
        </div>
    );
}