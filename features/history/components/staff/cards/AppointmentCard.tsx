
import { Body, BodySm } from "@/components/ui";
import { StatusPill } from "@/components/ui/pills";
import { Appointment } from "@/generated/prisma";
import { toMeridiem } from "@/lib/utils/timeConversion";
import Link from "next/link";

export type ExtendedUserAppointment = Appointment & {
    client: {
        name: string;
    };
    services: {
        name: string;
    }[];
};

type Props = {
    appointment: ExtendedUserAppointment;
};

export default function AppointmentCard({
    appointment,
}: Props) {
    const serviceCount = appointment.services.length;

    const formattedDate = appointment.date.toLocaleDateString(
        "en-US",
        {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }
    );

    return (
        <li>
            <Link
                href={`/appointment/${appointment.id}`}
                className="
                    grid grid-cols-[1fr_auto]
                    grid-rows-2
                    items-center
                    gap-x-4 gap-y-1
                    min-h-20 w-full
                    px-4 py-3
                    transition-colors
                    hover:bg-surface-1
                "
            >
                {/* Top left: Client */}
                <Body className="text-main truncate font-medium tx-lg">
                    {appointment.client.name}
                </Body>

                {/* Top right: Status */}
                <div className="flex justify-end">
                    <StatusPill variant={appointment.status} />
                </div>

                {/* Bottom left: Time and date */}
                <BodySm className="text-else whitespace-nowrap text-xs">
                    {toMeridiem(appointment.startTime)}
                    {" · "}
                    {formattedDate}
                </BodySm>

                {/* Bottom right: Service count */}
                <BodySm className="text-else text-right">
                    {serviceCount} {serviceCount === 1 ? "service" : "services"}
                </BodySm>
            </Link>
        </li>
    );
}
