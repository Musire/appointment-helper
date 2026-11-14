import { AppointmentDetails } from "@/domains/appointments/appointment.types";
import StaffCancelled from "./StaffCancelled";
import StaffCheckin from "./StaffCheckin";
import StaffComplete from "./StaffComplete";
import StaffInprogress from "./StaffInprogress";
import StaffNoShow from "./StaffNoShow";
import StaffPending from "./StaffPending";

type Props = {
  appointment: AppointmentDetails
}

export default function StaffDetails ({ appointment }: Props ) {
    switch (appointment.status) {
        case "PENDING":
            return <StaffPending appointment={appointment} />
        case "CHECKIN":
            return <StaffCheckin appointment={appointment} />
        case "INPROGRESS": 
            return <StaffInprogress appointment={appointment} />
        case "COMPLETED":
            return <StaffComplete appointment={appointment} />
        case "NOSHOW":
            return <StaffNoShow appointment={appointment} />
        case "CANCELLED":
            return <StaffCancelled appointment={appointment} />
        default:
            return null
    }
}