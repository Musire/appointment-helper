import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const ROLE_REDIRECT: Record<string, string> = {
  user: "/user/dashboard",
  staff: "/staff/dashboard",
  owner: "/owner/dashboard",
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          response.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          response.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  // Get the logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log('user :', user)

  if (user && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Not logged in → send to /login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Only redirect on /dashboard
  if (request.nextUrl.pathname === "/dashboard") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const redirectPath = ROLE_REDIRECT[profile?.role]

    if (redirectPath) {
        return NextResponse.redirect(
            new URL(redirectPath, request.url)
        )
    }

    // Optional: default fallback
    return NextResponse.redirect(new URL("/", request.url))
  }

  // No redirect — let the request continue
  return response
}

export const config = {
  matcher: ["/dashboard"],
}
