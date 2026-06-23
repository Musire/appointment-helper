import { Body, Caption, H3 } from "@/components/UI";
import { formatAppointmentDateTime } from "@/lib/time";
import { CalendarDays, Clock, Scissors, Store } from "lucide-react";
import { formatAppTimeSplit, toAppTime } from "../../helper/dayjs";
import type { AppointmentDetails } from "../../queries/getAppointmentDetails";


type Props = {
    appointment: AppointmentDetails
}

export default function AppointmentDetails ({
    appointment
}: Props) {

    const services = <T extends { name: string }>(arr: T[]): string => arr.map(item => item.name).join(" - ");

    const {dateStr, timeStr} = formatAppointmentDateTime(appointment.scheduledAt)
    const newDate = (toAppTime(appointment.scheduledAt))
    const { dateString, timeString } = formatAppTimeSplit(newDate)

    return (
        <div className="surface-1 p-6 rounded-md divide-y-2 divide-disabled">
            <div className="grid grid-cols-2 grid-rows-3 pb-4">
                <div className="size-24 rounded-full bg-surface-2 row-span-3"/>
                <H3 className="font-semibold">{appointment.client.name}</H3>
                <Body className="flex items-center space-x-2">
                    <Clock strokeWidth={1} />
                    <Caption className="text-base">
                        {timeString}
                    </Caption>
                </Body>
                <Body className="flex items-center space-x-2">
                    <Scissors strokeWidth={1} />
                    <Caption className="text-base">
                        {services(appointment.services)}
                    </Caption>
                </Body>
            </div>
            <div className="grid grid-cols-2 pt-4">
                <Body className="flex items-center space-x-2">
                    <CalendarDays strokeWidth={1} />
                    <Caption className="text-lg">{dateString}</Caption>
                </Body>
                <Body className="flex items-center space-x-2">
                    <Store strokeWidth={1} />
                    <Caption className="text-lg">{appointment.store.name}</Caption>
                </Body>                    
            </div>
        </div>
    );
}