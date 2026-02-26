import { User as Icon } from "lucide-react";

export interface StaffUser {
    id: string;
    fullName?: string | null;
    email: string;
    createdAt?: Date
}

type StaffSlotProps = {
    staff: StaffUser,
}

export default function StaffCard ({ staff }: StaffSlotProps) {
    
    return (
        <li  className={`flex items-center space-x-6 w-72`}>
            <Icon size={30} strokeWidth={1} />
            <span className="">
                <p className="capitalize">{staff.fullName}</p>
                <p className="capitalize">barber</p>
            </span>
        </li>
    );
}