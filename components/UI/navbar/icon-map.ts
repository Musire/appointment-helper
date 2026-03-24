import { Home, Clock, Scissors, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const iconMap = {
    home: Home,
    clock: Clock,
    scissors: Scissors,
    users: Users,
} as const

export type IconKey = keyof typeof iconMap

export function getIcon(key?: IconKey): LucideIcon | null {
    return key ? iconMap[key] : null
}