import { Body } from "@/components/UI";
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
            <Link href={`/appointment/${appointment.id}`} className="w-full h-20 grid grid-rows-1 grid-cols-[25%_45%_30%] items-center hover:bg-surface-1 hover:cursor-pointer p-4">
                <p className="">{ timeString }</p>
                <div className="flex flex-col">
                    <Body className="">{appointment.client.name}</Body>
                    <Body className="">{services(appointment.services)}</Body>
                </div>
                <Body className="centered rounded-full h-full normal-space bg-surface-3">{appointment.status}</Body>
            </Link>
        </li>
    );
}