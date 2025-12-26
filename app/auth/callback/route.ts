import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams, hash } = new URL(request.url)

  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          return (await cookieStore).get(name)?.value
        },
        async set(name, value, options) {
          (await cookieStore).set({ name, value, ...options })
        },
        async remove(name, options) {
          (await cookieStore).set({ name, value: "", ...options })
        },
      },
    }
  )

  // Exchange the tokens in the URL for a session cookie
  await supabase.auth.exchangeCodeForSession(searchParams)

  return NextResponse.redirect(new URL("/dashboard", request.url))
}
