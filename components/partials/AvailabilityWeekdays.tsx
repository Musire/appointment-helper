import { TimeslotInput } from "@/features/staff/components";


export default function AvailabilityWeekdays () {
    return (
        <>
            <TimeslotInput 
                trigger="monday"
            />
            <TimeslotInput 
                trigger="tuesday"
            />
            <TimeslotInput 
                trigger="wednesday"
            />
            <TimeslotInput 
                trigger="thursday"
            />
            <TimeslotInput 
                trigger="friday"
            />
            
        </>
    );
}