import { AppointmentHistoryItem } from "@/domains/appointments/queries/getHistoryItems";
import { AppointmentStatus } from "@/generated/prisma";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  data: AppointmentHistoryItem;
}

const statusStyles: Record<AppointmentStatus, string> = {
  COMPLETED: "text-success bg-success/20",
  NOSHOW: "text-error bg-error/10",
  CANCELLED: "text-disabled bg-disabled/10",
  CONFIRMED: "text-main bg-main/10",
  PENDING: "text-else bg-else/10",
};

const borderStyles: Record<AppointmentStatus, string> = {
  COMPLETED: "border-l-success",
  NOSHOW: "border-l-error",
  CANCELLED: "border-l-disabled",
  CONFIRMED: "border-l-main",
  PENDING: "border-l-else",
};

export default function HistoryCard({ data }: Props) {
  const { clientName, status, id } = data;

  return (
    <li>
      <Link
        href={`/appointment/${id}`}
        className={clsx(
          "w-full bg-surface-1 p-4 spaced border border-border",
          "border-l-4",
          borderStyles[status]
        )}
      >
        <p className="font-medium">{clientName}</p>

        <span
          className={clsx(
            "px-2 py-1 rounded-full text-xs capitalize",
            statusStyles[status]
          )}
        >
          {status.toLowerCase()}
        </span>
      </Link>
    </li>
  );
}