import { getAppointmentDetails } from "@/domains/appointments/appointment.queries";
import { AppointmentDetails, Controller, Message, StatusSection } from "@/domains/appointments/components/checkin";
import dayjs from "@/domains/appointments/utils/dayjs";
import { AppointmentStatus } from "@/generated/prisma";
import { ParamsType } from "@/lib/types";
import { checkPendingTimeWindow } from "@/lib/utils/time";
import { Dayjs } from "dayjs";

export default async function CheckinPage ({ params }: ParamsType<{appointmentId: string}>) {
    const {appointmentId} = await params

    const { data: appointment} = await getAppointmentDetails({id: appointmentId})
    if (!appointment) return null

    const status = appointment.status === 'PENDING' 
        ? checkPendingTimeWindow(appointment.scheduledAt) 
        : appointment.status;

    const timestamps: Record<AppointmentStatus, Dayjs | undefined> = {
        CHECKIN: dayjs(appointment.checkedAt) ?? undefined,
        INPROGRESS: undefined,
        PENDING: undefined,
        COMPLETED: undefined, 
        NOSHOW: undefined, 
        CANCELLED: undefined
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