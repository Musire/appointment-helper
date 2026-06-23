import { BodySm, Caption } from "@/components/UI";
import dayjs, { formatAppTimeSplit } from "@/lib/dayjs";
import { getServices } from "@/lib/stringMutate";
import Link from "next/link";
import { AppointmentDetails } from "../../queries/getAppointmentDetails";

type Props = {
    appointment: AppointmentDetails
}

export default function AppointmentCard ({
    appointment
}: Props) {
    const { timeString } = formatAppTimeSplit(dayjs(appointment.scheduledAt))
    const services = getServices(appointment.services)
    return (
        <li className="">
            <Link href={`/appointment/${appointment.id}`} className='flex gap-x-6 items-center bg-surface-2 p-4 opacity-85 hover:opacity-100 hover:cursor-pointer'>
                <BodySm className="">{timeString}</BodySm>
                <span className="flex flex-col ">
                    <BodySm className="text-main">{appointment.client.name}</BodySm>
                    <BodySm className="text-else">{services}</BodySm>
                </span>
                <Caption className="bg-primary/50 normal-space rounded-full ml-auto">{appointment.status}</Caption>
            </Link>
        </li>
    );
}