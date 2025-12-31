'use server'; 

import { redirect } from "next/navigation"
import { createSupabaseServerClient, createSupabaseServerClientReadOnly } from "@/lib/supabase/server"
import { supabaseAdminClient } from "@/lib/supabase/admin"

export async function logout() {

  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()

  // Clear session and send user somewhere safe
  redirect("/login")
}


export async function login(email: string, password: string) {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect("/dashboard")
}




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
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return user
}