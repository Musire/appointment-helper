import { requireRole, RoleName } from "./auth/requireRole"

type ActionResult<T> = {
  success: boolean
  data: T | null
  error: string | null
}

export async function safeAction<T>(
  fn: () => Promise<T>,
  roles?: RoleName[]
): Promise<ActionResult<T>> {
  try {

    if (roles?.length) {
      const { access, user } = await requireRole(roles)

      if (!user) {
        throw new Error('User not logged in')
      }

      if (!access) {
        throw new Error('Unauthorized to perform action')
      }
    }

    const data = await fn()

    return {
      success: true,
      data,
      error: null,
    }
  } catch (err: any) {

    let msg;

    if (err.code === 'P2002' ) { 
      msg = 'Cannot create duplicates'
    } else {
      msg = err instanceof Error ? err.message : "Unknown error"
    }

    return {
      success: false,
      data: null,
      error: msg
    }
  }
}
