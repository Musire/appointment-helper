export type NavItem = {
  label: string
  href: string
  icon?: string
  index?: boolean
}

export type Role = 'SUPERADMIN' | 'ADMIN' | 'STAFF' | 'USER'

export const navByRole: Record<Role, (slug: string) => NavItem[]> = {
  ADMIN: (slug) => [
    { 
        label: 'Overview', 
        href: `/admin/store/${slug}`, 
        index: true 
    },
    { 
        label: 'Hours', 
        href: `/admin/store/${slug}/hours` 
    },
    { 
        label: 'Services', 
        href: `/admin/store/${slug}/services` 
    },
    { 
        label: 'Staff', 
        href: `/admin/store/${slug}/staff` 
    },
  ],
  STAFF: (slug) => [
    { 
        label: 'Dashboard', 
        href: `/staff/${slug}`, 
        index: true 
    },
    { 
        label: 'Shifts', 
        href: `/staff/${slug}/shifts` 
    },
  ],
  USER: (slug) => [
    { 
        label: 'Home', 
        href: `/store/${slug}`, 
        index: true 
    },
    { 
        label: 'Bookings', 
        href: `/store/${slug}/bookings` 
    },
  ],
  SUPERADMIN: (slug) => [
    { 
        label: 'Global', 
        href: `/superadmin/dashboard`,
        icon: 'home',
        index: true 
    },
    { 
        label: 'Stores', 
        href: `/superadmin/stores` 
    },
  ],
}

export function getNav(role: Role, slug: string) {
  return navByRole[role]?.(slug) ?? []
}