import { AppointmentStatus } from "@/domains/appointments/queries/getAppointmentDetails";
import { Caption } from "../typography";

type VariantObject = {
    label: string;
    style: string;
}

const StatusConfig:Record<AppointmentStatus, VariantObject> = {
    pending: {
        label: 'Pending',
        style: 'bg-surface-1 text-else'
    },
    checkedin: {
        label: 'Checked-In',
        style: 'bg-blue-950 text-blue-300'
    },
    inprogress: {
        label: 'In Progress',
        style: 'bg-blue-950 text-blue-300'
    },
    completed: {
        label: 'Completed',
        style: 'bg-green-950 text-success'
    },
    cancelled: {
        label: 'Cancelled',
        style: 'bg-red-950 text-error'
    },
    noshow: {
        label: 'No Show',
        style: 'bg-red-950 text-error'
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