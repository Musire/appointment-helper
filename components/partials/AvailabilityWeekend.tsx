import { TimeslotInput } from "@/features/hour-selection";


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