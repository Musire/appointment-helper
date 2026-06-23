import { AppointmentDetails, Controller, Message, StatusSection } from "@/domains/appointments/components/checkin";
import { AppointmentStatus } from "@/domains/appointments/components/checkin/StatusSection";
import { getAppointmentDetails } from "@/domains/appointments/queries/getAppointmentDetails";
import { ParamsType } from "@/lib/queries/types";
import { checkPendingTimeWindow } from "@/lib/time";
import dayjs from "@/domains/appointments/helper/dayjs"
import { Dayjs } from "dayjs";

export default async function CheckinPage ({ params }: ParamsType<{appointmentId: string}>) {
    const {appointmentId} = await params

    const appointment = getAppointmentDetails(appointmentId)
    if (!appointment) return null

    const status = appointment.status === 'pending' 
        ? checkPendingTimeWindow(appointment.scheduledAt) 
        : appointment.status;

    const timestamps: Record<AppointmentStatus, Dayjs | undefined> = {
        cancelled: dayjs(appointment.updatedAt),
        noshow: dayjs(appointment.updatedAt),
        completed: dayjs(appointment.completedAt) ?? undefined,
        checkedin: dayjs(appointment.checkedAt) ?? undefined,
        offset: dayjs(appointment.scheduledAt).subtract(30, "minute"),
        inprogress: undefined,
        pending: undefined,
    };

    const timestamp = timestamps[appointment.status];
    
    return (
        <div className="stacked flex-1 py-6 space-y-4 ">
            <StatusSection 
                status={status}
            />
            <AppointmentDetails appointment={appointment} />
            <Message 
                status={status}
                dateTime={timestamp}
            />
            <Controller />
        </div>
    );
}