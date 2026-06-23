import { BodySm, Caption } from "@/components/UI";
import { QrButton } from "@/domains/qr-code/components";
import Link from "next/link";

export default async function StaffDashboard () {
  
  const requirements = {
    hours: true
  }

  return (
    <div className=" relative stacked py-6 flex-1">
      <ul className="grid grid-cols-3 h-40 shrink-0 gap-x-4 w-full">
        <li className="bg-surface-1 w-full rounded-md h-full shrink-0"></li>
        <li className="bg-surface-1 w-full rounded-md"></li>
        <li className="bg-surface-1 w-full rounded-md"></li>
      </ul>
      <QrButton />
      <div className="flex-col flex space-y-2">
        <span className="spaced">
          <BodySm className="">Today's Schedule</BodySm>
          <Link href="dashboard/pool" className="">View all</Link>
        </span>
        <ul className="flex flex-col">
          <li className="flex gap-x-6 items-center bg-surface-2 p-4 opacity-85 hover:opacity-100 hover:cursor-pointer">
            <BodySm className="">10:30 AM</BodySm>
            <span className="flex flex-col ">
              <BodySm className="text-main">Juan Luis Cruz</BodySm>
              <BodySm className="text-else">Fade Haircut</BodySm>
            </span>
            <Caption className="bg-primary/50 normal-space rounded-full ml-auto">Checked-in</Caption>
          </li>
          <li className="flex gap-x-6 items-center bg-surface-2 p-4 opacity-85 hover:opacity-100 hover:cursor-pointer">
            <BodySm className="">10:30 AM</BodySm>
            <span className="flex flex-col ">
              <BodySm className="text-main">Juan Luis Cruz</BodySm>
              <BodySm className="text-else">Fade Haircut</BodySm>
            </span>
            <Caption className="bg-primary/50 normal-space rounded-full ml-auto">Checked-in</Caption>
          </li>
          <li className="flex gap-x-6 items-center bg-surface-2 p-4 opacity-85 hover:opacity-100 hover:cursor-pointer">
            <BodySm className="">10:30 AM</BodySm>
            <span className="flex flex-col ">
              <BodySm className="text-main">Juan Luis Cruz</BodySm>
              <BodySm className="text-else">Fade Haircut</BodySm>
            </span>
            <Caption className="bg-primary/50 normal-space rounded-full ml-auto">Checked-in</Caption>
          </li>
          <li className="flex gap-x-6 items-center bg-surface-2 p-4 opacity-85 hover:opacity-100 hover:cursor-pointer">
            <BodySm className="">10:30 AM</BodySm>
            <span className="flex flex-col ">
              <BodySm className="text-main">Juan Luis Cruz</BodySm>
              <BodySm className="text-else">Fade Haircut</BodySm>
            </span>
            <Caption className="bg-primary/50 normal-space rounded-full ml-auto">Checked-in</Caption>
          </li>
        </ul>
      </div>
    </div>
  );
}