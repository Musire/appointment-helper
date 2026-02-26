'use client';

import { useState } from "react"

export default function useSelectable<T = string>(initial?: T) {
  const [selected, setSelected] = useState<T | undefined>(initial)

  const handleSelect = (value: T | undefined) => {
    setSelected((prev) => (prev === value ? undefined : value))
  }

  return { selected, handleSelect }
}