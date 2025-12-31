import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/app/actions/auth.actions"

export type RoleName =
  | "USER"
  | "STAFF"
  | "ADMIN"
  | "SUPERADMIN"

export async function requireRole(allowed: RoleName[]) {
  const user = await getCurrentUser()
  if (!user) redirect("/unauthorized")

  const roles = await prisma.userRole.findMany({
    where: { userId: user.id },
    select: {
      role: { select: { name: true } },
    },
  })

  const hasAccess = roles.some(r =>
    allowed.includes(r.role.name as RoleName)
  )

  if (!hasAccess) {
    redirect("/unauthorized")
  }

  return user
}
