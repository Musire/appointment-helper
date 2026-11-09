
import { AppointmentStatus } from "@/generated/prisma";
import { Caption } from "../typography";

type VariantObject = {
    label: string;
    style: string;
};

const StatusConfig: Record<AppointmentStatus, VariantObject> = {
    PENDING: {
        label: "Pending",
        style: "text-else",
    },
    CHECKIN: {
        label: "Checked-In",
        style: "text-blue-300/75",
    },
    INPROGRESS: {
        label: "In Progress",
        style: "text-blue-300/75",
    },
    COMPLETED: {
        label: "Completed",
        style: "text-success/75",
    },
    CANCELLED: {
        label: "Cancelled",
        style: "text-error/75",
    },
    NOSHOW: {
        label: "No Show",
        style: "text-error/75",
    },
};

type Props = {
    variant: AppointmentStatus;
};

export default function AppointmentStatusLabel({
    variant,
}: Props) {
    const { label, style } = StatusConfig[variant];

    return (
        <Caption className={` ${style}`}>
            {label}
        </Caption>
    );
}
