import { TimeBlock } from "@/domains/offering/offering.types";
import StaffAvailabilityForm from "@/features/hour-selection/components/StaffAvailabilityForm";

type Props = {
    storeStaffId: string;
    data?: TimeBlock[]
}

export default function StaffStoreAvailibility ({ storeStaffId, data }: Props) {
    return (
        <div className="flex flex-1 overflow-hidden">
            <StaffAvailabilityForm storeStaffId={storeStaffId} initialBlocks={data} />
        </div>
    );
}