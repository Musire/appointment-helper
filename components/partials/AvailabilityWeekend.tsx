import { TimeslotInput } from "../dashboards";


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