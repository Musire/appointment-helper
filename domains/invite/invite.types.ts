import { InviteStatus } from "@/generated/prisma";

import { $Enums } from "@/generated/prisma";


export type InviteType = {
    user: {
        email: string;
        fullName: string | null;
        avatarUrl: string | null;
    };
    id: string;
    status: $Enums.InviteStatus;
}

export type StaffDataType = { 
    id: string; 
    email: string; 
    fullName: string | null;
}

export type InviteDataType = {
    id: string;
    status: InviteStatus;
    user: {
        email: string;
        fullName: string | null;
        avatarUrl: string | null;
    };
}[] | null | undefined