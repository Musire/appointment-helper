import { TimeslotInput } from "@/app/staff/components";


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