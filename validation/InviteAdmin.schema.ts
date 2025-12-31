import z from "zod";


export const InviteAdminSchema = z.object({
    email: z.email('not valid email address')
})

export type InviteAdminType = {
    email: string;
}