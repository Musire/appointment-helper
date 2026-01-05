import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/app/actions/auth.actions"

export type RoleName =
  | "USER"
  | "STAFF"
  | "ADMIN"
  | "SUPERADMIN"

export const hasAccess = (roles: { role : { name: string } }[], allowed: string[]) => {
  return roles.some(r =>
    allowed.includes(r.role.name as RoleName)
  )
}

export async function requireRole(allowed: RoleName[]) {
  const user = await getCurrentUser()

  const roles = await prisma.userRole.findMany({
    where: { userId: user?.id },
    select: {
      role: { select: { name: true } },
    },
  })

  const access = hasAccess(roles, allowed)

  return {
    access,
    user
  }

}
