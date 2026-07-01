import { TimeslotInput } from "@/features/staff/components";


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