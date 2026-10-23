import { createSupabaseServerClientReadOnly } from "@/lib/supabase/server"
import { prisma } from "../../../lib/prisma"
import { AuthRepository } from "../auth.repositories"

// 1. Define roles (source of truth)
export const Roles = ['SUPERADMIN', 'ADMIN', 'STAFF', 'USER'] as const
export type Role = typeof Roles[number]

// 2. Type guard
function isRole(role: string): role is Role {
  return Roles.includes(role as Role)
}

// 3. Normalize role (safe fallback OR throw)
function normalizeRole(role: string | undefined | null): Role {
  if (!role) return 'USER' // fallback

  if (!isRole(role)) {
    throw new Error(`Invalid role: ${role}`)
  }

  return role
}

// 4. Main function
export async function getCurrentUserRole(): Promise<Role> {
  const supabase = createSupabaseServerClientReadOnly()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  if (!user) throw new Error('Not authenticated')

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      roles: {
        include: {
          role: true, // 👈 THIS pulls Role model
        },
      },
    },
  })

  if (!dbUser) {
    throw new Error('User not found in DB')
  }

  const rawRole = dbUser.roles?.[0]?.role?.name ?? null

  return normalizeRole(rawRole)
}


export async function getCurrentUser() {
  // 🌟 FIX: Await the updated async client initialization
  const supabase = await createSupabaseServerClientReadOnly()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error(error.message)
    return null
  }

  if (!user) return null

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        roles: {
          include: {
            role: true, 
          },
        },
      },
    })

    if (!dbUser) return null

    const rawRole = dbUser.roles[0]?.role?.name
    const role = normalizeRole(rawRole)

    const { roles, ...rest } = dbUser

    return {
      ...rest,
      role,
    }
  } catch (dbError) {
    console.error("Database error looking up user metadata:", dbError)
    return null
  }
}

export async function getCurrentUserFull() {
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

export async function getUserById(targetId: string) {
  const user =  await prisma.user.findUnique({
    where: {
      id: targetId
    }
  })

  if (!user) return null

  return user.fullName
}


export async function getPrismaUserId () {
  const user = await getCurrentUser()
  if (!user) return null

  const found = await AuthRepository.getUserPrismaId(user.id)
  if (!found) return null

  return found.id
}