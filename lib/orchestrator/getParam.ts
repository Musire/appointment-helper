export type RouteParams = Record<string, string | string[] | undefined>

export function getParam<K extends string>(
  params: RouteParams,
  key: K
): string | undefined {
  const value = params[key]
  return typeof value === "string" ? value : undefined
}
