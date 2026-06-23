import { BusinessHoursForm } from "@/domains/hour-selection";
import { TimeBlock } from "@/domains/hour-selection/model/types";


export default function AvailabilityPage () {

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