import { ZodType } from 'zod'

export async function parseSchema<T>(
  schema: ZodType<T>,
  data: unknown
): Promise<T> {
  const parsed = await schema.safeParseAsync(data)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  return parsed.data
}

export function parseSchemaSync<T>(
  schema: ZodType<T>,
  data: unknown
) {
  const parsed = schema.safeParse(data)
  
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  return parsed.data
}

export function quickParse<T>(
  schema: ZodType<T>,
  data: unknown
) {
  const parsed = schema.safeParse(data)
  return parsed
}