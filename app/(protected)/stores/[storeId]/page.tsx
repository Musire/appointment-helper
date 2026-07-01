import { BusinessHoursForm } from "@/features/hour-selection";
import { TimeBlock } from "@/features/hour-selection/model/types";
import { ParamsType } from "@/lib/queries/types";

type Props = ParamsType<{ storeId: string }>;

export default async function AvailabilityPage ({
    params
}: Props) {
    const { storeId } = await params
    console.log(storeId)

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