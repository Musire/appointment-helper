import { TimeBlock } from "@/domains/offering/offering.types";
import { BusinessHoursForm } from "@/features/hour-selection/components";


export default async function AdminStore () {

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
        <BusinessHoursForm initialBlocks={test} />
    );
}