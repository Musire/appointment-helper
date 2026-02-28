import { AppointmentStatus } from "@/generated/prisma";
import clsx from "clsx";
import { AppointmentWithRelations } from "../../model/types";

interface props {
  data: AppointmentWithRelations;
}

const statusStyles: Record<AppointmentStatus, string> = {
  COMPLETED: 'text-success-dark',
  NOSHOW: 'text-error-dark',
  CANCELLED: 'text-error-dark/60',
  CONFIRMED: 'text-whitesmoke/87',
  PENDING: 'text-whitesmoke/60', // include ALL enum values
};


export default function HistoryCard ({ data }: props) {
    const { items, client, status } = data
    return (
        <li className="">
            <article className="bg-darkest p-4 border-adjust">
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