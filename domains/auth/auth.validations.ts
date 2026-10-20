import z from "zod";


export const LoginSchema = z.object({
    email: z.email().min(1, 'email required'),
    password: z.string().min(1, 'email required')
})

export const SignupSchema = z.object({
    role: z.string().min(1,'role is required'),
    fullName: z.string().min(1, 'full name is required'),
    email: z.email().min(1, 'email required'),
    password: z.string().min(1, 'email required')
})

export type LoginType = z.infer<typeof LoginSchema>
export type SignupType = z.infer<typeof SignupSchema>