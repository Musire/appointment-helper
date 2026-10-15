import { InviteStatus } from "@/generated/prisma";

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