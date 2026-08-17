import { Body, BodySm } from "@/components/ui";
import { StatusPill } from "@/components/ui/pills";
import Link from "next/link";
import { formatAppTimeSplit, toAppTime } from "../../helper/dayjs";
import { AppointmentDetails } from "../../queries/getAppointmentDetails";

type Props = {
    appointment: AppointmentDetails
}

export default function PoolCard ({
    appointment
}: Props) {
    const date = toAppTime(appointment.scheduledAt)
    const { timeString } = formatAppTimeSplit(date)
    const services = <T extends { name: string }>(arr: T[]): string => arr.map(item => item.name).join(" - ");

    return (
        <li className="">
            <Link href={`/appointment/${appointment.id}`} className="w-full h-20 grid grid-rows-1 grid-cols-[25%_1fr_25%] gap-x-2 items-center hover:bg-surface-1 hover:cursor-pointer p-4">
                <Body className="text-fluid-lg">{ timeString }</Body>
                <div className="flex flex-col">
                    <Body className="text-main">{appointment.client.name}</Body>
                    <BodySm className="text-else">{services(appointment.services)}</BodySm>
                </div>
                <div className="flex justify-end">
                    <StatusPill variant={appointment.status} />
                </div>
            </Link>
        </li>
    );
}