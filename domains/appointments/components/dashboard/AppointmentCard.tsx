import { BodySm } from "@/components/UI";
import { StatusPill } from "@/components/UI/pills";
import dayjs, { formatAppTimeSplit } from "@/lib/dayjs";
import { getServices } from "@/lib/utils/stringMutate";
import Link from "next/link";
import { AppointmentDetails, AppointmentStatus } from "../../queries/getAppointmentDetails";

type Props = {
    appointment: AppointmentDetails
}

const styleConfig:Record<AppointmentStatus, string> = {
    pending: 'bg-surface-3 text-main',
    checkedin: 'bg-blue-950/35 text-blue-300',
    inprogress: 'bg-blue-950/35 text-blue-300',
    completed: 'bg-green-950/35 text-success',
    cancelled: 'bg-red-950/35 text-error',
    noshow: 'bg-red-950/35 text-error'
}

export default function AppointmentCard ({
    appointment
}: Props) {
    const { timeString } = formatAppTimeSplit(dayjs(appointment.scheduledAt))
    const services = getServices(appointment.services)

    const style = styleConfig[appointment.status]
    return (
        <li className="">
            <Link href={`/appointment/${appointment.id}`} className='flex gap-x-4 items-center p-4 opacity-90 hover:opacity-100 hover:cursor-pointer'>
                <BodySm className="w-16">{timeString}</BodySm>
                <span className="flex flex-col flex-1 ">
                    <BodySm className="text-main">{appointment.client.name}</BodySm>
                    <BodySm className="text-else">{services}</BodySm>
                </span>
                <div className="w-32 centered shrink-0 ml-auto">
                    <StatusPill variant={appointment.status} />
                </div>
            </Link>
        </li>
    );
}