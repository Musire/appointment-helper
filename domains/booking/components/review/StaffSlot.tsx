import { User } from "@/generated/prisma";
import { User as Icon } from "lucide-react";

type StaffSlotProps = {
    staff: User
}

export default function StaffSlot ({ staff }: StaffSlotProps) {
    return (
        <li className="flex items-center space-x-6 w-72">
            <Icon size={30} strokeWidth={1} />
            <span className="">
                <p className="capitalize">{staff.fullName}</p>
                <p className="capitalize">barber</p>
            </span>
        </li>
    );
}