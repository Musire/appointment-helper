import { BodySm } from "@/components/ui";
import { StatusPill } from "@/components/ui/pills";
import { formatAppTimeSplit } from "@/lib/dayjs";
import { getServices } from "@/lib/utils/stringMutate";
import dayjs from "dayjs";
import Link from "next/link";
import { AppointmentDetails } from "../../appointment.types";

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
            <Link href={`/appointment/${appointment.id}`} className='flex gap-x-4 items-center p-4 opacity-80 hover:opacity-100 hover:cursor-pointer'>
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