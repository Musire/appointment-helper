import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasContent(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  if (value && typeof value === "object") {
    return Object.keys(value).length > 0
  }

  return false
}