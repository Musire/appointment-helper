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