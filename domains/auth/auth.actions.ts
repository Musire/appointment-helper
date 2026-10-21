'use server'; 

import { prisma } from "@/lib/prisma";
import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient, createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginSchema, SignupSchema } from "./auth.validations";
import { createRegAction, safeAction, validateFormData } from "./util/safeAction";

export async function logout() {

  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()

  // Clear session and send user somewhere safe
  redirect("/login")
}

export const login = createRegAction(
  async (_: any, formData: FormData) => {
    console.log('triggered')
    const validated = validateFormData(LoginSchema, formData)
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    })

    if (error) throw new Error(`DB couldn't validate login`);

    return { msg: 'successful login'}
  }
)

export async function inviteAdmin(email: string) {
  
  // 1️⃣ Invite the user (creates auth user + sends invite email)
  const { data: inviteData, error: inviteError } =
    await supabaseAdminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/welcome`,
      data: {
        role: 'admin',
      },
    });

  if (inviteError) throw new Error(inviteError.message);
  if (!inviteData.user) throw new Error('No user returned');

  return { user: inviteData.user };

}

export async function getCurrentUser() {
  const supabase = createSupabaseServerClientReadOnly()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    if (error.name === 'AuthSessionMissingError') {
      return null
    }
    throw new Error(error.message)
  }
  
  return user
}

export async function hasStaffProfile() {
    return safeAction( async () => {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('not signed in')
      }
      const exists = await prisma.staffProfile.findUnique({
        where: { userId: user.id },
        select: { id: true },
      })

      return Boolean(exists)
    })
}

export const signup = createRegAction(
  async (_: any, formData: FormData) => {
    const validated = validateFormData(SignupSchema, formData)

    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          role: validated.role,
          full_name: validated.fullName
        },
      },
    })

    if (error) throw new Error(`DB couldn't validate login`);

    return { msg: 'successful signup'}

  }
)