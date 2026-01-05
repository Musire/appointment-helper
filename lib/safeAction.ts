type ActionResult<T> = {
  success: boolean
  data: T | null
  error: string | null
}

export async function safeAction<T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn()

    return {
      success: true,
      data,
      error: null,
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    }
  }
}
