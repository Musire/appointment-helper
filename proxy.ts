import { NextResponse, type NextRequest } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { supabaseAdminClient } from "@/lib/supabase/admin"

const ROLE_REDIRECT: Record<string, string> = {
  user: "/user/dashboard",
  staff: "/staff/dashboard",
  admin: "/admin/dashboard",
  superadmin: "superadmin/dashboard"
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createSupabaseServerClient()

  // Get the logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()


  if (user && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Not logged in → send to /login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Only redirect on /dashboard
  if (request.nextUrl.pathname === "/dashboard") {

    const { data, error } = await supabaseAdminClient
      .from("UserRole")
      .select(`
        role:Role (
          name
        )
      `)
      .eq("userId", user.id);

    type RoleDataType = {
      role : { 
        name: string;
      }
    } 

    const profile = data as RoleDataType[] | null
    const role = profile ? profile[0].role?.name.toLowerCase() : null

    const redirectPath = role ? ROLE_REDIRECT[role] : null

    if (redirectPath) {
        return NextResponse.redirect(
            new URL(redirectPath, request.url)
        )
    }
    
    return NextResponse.redirect(new URL("/", request.url))
  }

  // No redirect — let the request continue
  return response
}

export const config = {
  matcher: ["/dashboard"],
}
