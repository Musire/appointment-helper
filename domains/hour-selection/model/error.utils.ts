import { ValidationError } from "./types"

export function hasValidationError(error?: ValidationError | null) {
  if (!error) return false

  const hasBlockErrors =
    Object.keys(error.blockErrors ?? {}).length > 0

  const hasDayOverlap =
    Object.values(error.dayOverlapErrors ?? {}).some(Boolean)

  return hasBlockErrors || hasDayOverlap
}