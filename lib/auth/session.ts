import { createSupabaseServerClientReadOnly } from "../supabase/server"


export async function getCurrentUser() {
  const supabase = createSupabaseServerClientReadOnly()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return user
}