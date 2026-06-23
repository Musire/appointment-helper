import type { LucideIcon } from 'lucide-react'
import {
    Building2,
    CalendarDays,
    Clock,
    Home,
    Scissors,
    Settings,
    Plus,
    Users
} from 'lucide-react'

export const iconMap = {
    home: Home,
    scissors: Scissors,
    users: Users,
    pool: CalendarDays,
    store: Building2,
    profile: Settings,
    booking: Plus,
    history: Clock
} as const

export type IconKey = keyof typeof iconMap

export function getIcon(key?: IconKey): LucideIcon | null {
    return key ? iconMap[key] : null
}