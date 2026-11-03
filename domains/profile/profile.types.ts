

export type Profile = {
    id: string;
    email: string;
    createdAt: Date;
    fullName: string | null;
    avatarUrl: string | null;
    phone: string | null;
    authId: string | null;
} | null | undefined