import { StatusPill } from "@/components/ui/pills";
import { AppointmentStatus } from "@/generated/prisma";

type Props = {
  status: AppointmentStatus;
  clientName: string | null;
}

export default function AppointmentHeader ({ status, clientName }: Props) {
    return (
        <div className="centered-col space-y-4 ">
            <div className="size-40 rounded-full bg-surface-1 row-span-3 self-center" />
            <StatusPill variant={status} />
            <h3 className=" self-center">{clientName}</h3>
        </div>
    );
}