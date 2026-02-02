export type QuerySerializable =
  | string
  | number
  | boolean
  | undefined
  | null

export type RouterLike = {
  replace: (url: string, opts?: { scroll?: boolean }) => void
}

export function syncQuery<C extends Record<string, QuerySerializable>>(
  ctx: C,
  router: RouterLike
) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(ctx)) {
    if (value != null && value !== "") {
      params.set(key, String(value))
    }
  }

  router.replace(`?${params.toString()}`, { scroll: false })
}
