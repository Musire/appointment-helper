import z from "zod";

export const AdminWelcomeSchema = z.object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    confirm: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'], 
})

export type AdminWelcomeType = z.infer<typeof AdminWelcomeSchema>;