import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const supabase = createSupabaseServerClient()

  const code = searchParams.get("code")
  if (code) {
    // Exchange the tokens in the URL for a session cookie
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL("/dashboard", request.url))
}
