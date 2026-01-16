import z from "zod";

export const ProfileCreationSchema = z.object({
    bio: z.string().min(1, 'please include the bio for your profile')
})

export type ProfileCreationType = z.infer<typeof ProfileCreationSchema>;