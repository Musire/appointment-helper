import { Consolidated, Day, TimeBlock } from './types'

export function consolidate(blocks: TimeBlock[]): Consolidated {
  const result: Consolidated = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  }

  for (const block of blocks) {
    for (const day of block.days) {
      result[day].push([block.start, block.end])
    }
  }

  return result
}

export function hasOverlap(ranges: [number, number][]) {

  const sorted = [...ranges].sort((a, b) => a[0] - b[0])

  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i][1] > sorted[i + 1][0]) {
      return true
    }
  }

  return false
}

export function validate(blocks: TimeBlock[]) {
  const blockErrors: Record<string, string[]> = {}
  const dayOverlapErrors: Partial<Record<Day, boolean>> = {}

  // Block-level validation
  for (const block of blocks) {
    const errors: string[] = []

    if (block.days.length === 0) {
      errors.push('Select at least one day')
    }

    if (block.start >= block.end) {
      errors.push('Start must be before end')
    }

    if (errors.length) {
      blockErrors[block.id] = errors
    }
  }

  // Only check overlap if no block-level errors
  if (Object.keys(blockErrors).length === 0) {
    const consolidated = consolidate(blocks)

    for (const day in consolidated) {
      const ranges = consolidated[day as Day]
      if (hasOverlap(ranges)) {
        dayOverlapErrors[day as Day] = true
      }
    }
  }

  return {
    blockErrors,
    dayOverlapErrors,
    isValid:
      Object.keys(blockErrors).length === 0 &&
      Object.keys(dayOverlapErrors).length === 0,
  }
}