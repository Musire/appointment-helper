import { TimeslotInput } from "@/features/hour-selection/components";


export default function AvailabilityWeekend () {
    return (
        <>
            <TimeslotInput 
                trigger="saturday"
            />
            <TimeslotInput 
                trigger="sunday"
            />
        </>
    );
}