import { AppointmentStatus } from "@/domains/appointments/appointment.types";
import { Caption } from "../typography";

type VariantObject = {
    label: string;
    style: string;
}

const StatusConfig:Record<AppointmentStatus, VariantObject> = {
    pending: {
        label: 'Pending',
        style: 'bg-surface-1/50 text-else'
    },
    checkedin: {
        label: 'Checked-In',
        style: 'bg-blue-950/50 text-blue-300/75'
    },
    inprogress: {
        label: 'In Progress',
        style: 'bg-blue-950/50 text-blue-300/75'
    },
    completed: {
        label: 'Completed',
        style: 'bg-green-950/50 text-success/75'
    },
    cancelled: {
        label: 'Cancelled',
        style: 'bg-red-950/50 text-error/75'
    },
    noshow: {
        label: 'No Show',
        style: 'bg-red-950/50 text-error/75'
    }
}

type Props = {
  variant: AppointmentStatus;
}

export default function StatusPill ({
    variant
}: Props) {
    const { label, style} = StatusConfig[variant]
    return (
        <Caption className={`capitalize normal-space rounded-full w-28 centered ${style}`}>{label}</Caption>
    );
}