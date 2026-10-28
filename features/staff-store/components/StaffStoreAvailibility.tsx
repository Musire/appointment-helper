import { TimeBlock } from "@/domains/offering/offering.types";
import { BusinessHoursForm } from "@/features/hour-selection/components";

export default function StaffStoreAvailibility () {
    const test: TimeBlock[] = [
        {
            id: "weekday",
            start: 540,
            end: 1020,
            days: ["mon", "tue", "wed", "thu", "fri"],
        },
        {
            id: "saturday",
            start: 600,
            end: 840,
            days: ["sat"],
        },
        {
            id: "sunday",
            start: 660,
            end: 900,
            days: ["sun"],
        },
    ];

    return (
        <div className="flex flex-1  overflow-hidden">

            <BusinessHoursForm initialBlocks={test} />
        </div>
    );
}