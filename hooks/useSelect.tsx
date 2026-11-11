
'use client';

import { useState } from "react";

export default function useSelectable<T = string>(initial?: T): {
    selected: T | undefined
    handleSelect: (value: T | undefined) => void
}

export default function useSelectable<T = string>(
    initial: T[],
    multi: true
): {
    selected: T[]
    handleSelect: (value: T) => void
}

export default function useSelectable<T = string>(
    initial?: T | T[],
    multi = false
) {
    const [selected, setSelected] = useState<T | T[] | undefined>(
        initial
    )

    const handleSelect = (value: T | undefined) => {
        setSelected(prev => {
            if (multi) {
                const current = (prev as T[] | undefined) ?? []

                return current.includes(value as T)
                    ? current.filter(item => item !== value)
                    : [...current, value as T]
            }

            return prev === value ? undefined : value
        })
    }

    return { selected, handleSelect }
}
