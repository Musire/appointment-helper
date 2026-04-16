import { AppointmentStatus } from "@/generated/prisma";
import clsx from "clsx";
import { AppointmentWithRelations } from "../../model/types";

interface props {
  data: AppointmentWithRelations;
}

const statusStyles: Record<AppointmentStatus, string> = {
  COMPLETED: 'text-success',
  NOSHOW: 'text-error',
  CANCELLED: 'text-disabled',
  CONFIRMED: 'text-main',
  PENDING: 'text-else', // include ALL enum values
};


export default function HistoryCard ({ data }: props) {
    const { client, status } = data
    return (
        <li className="">
            <article className="bg-surface-1 p-4 border-border">
                <span className="spaced">
                    <p className="">{`${client.name}`}</p>
                    <p 
                        className={clsx('capitalize text-xs',
                            statusStyles[status]
                        )}
                    >{status.toLowerCase()}</p>
                </span>
            </article>
        </li>
    );
}