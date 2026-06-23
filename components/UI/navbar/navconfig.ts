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
      label: 'home',
      icon: 'home',
      href: `/dashboard`,
      index: true 
    },
    { 
      label: 'pool',
      icon: 'pool',
      href: `/pool` 
    },
    { 
      label: 'History',
      icon: 'history',
      href: `/history` 
    },
    { 
      label: 'Stores',
      icon: 'store',
      href: `/stores` 
    },
  ],
  USER: (slug) => [
      { 
        label: 'Upcoming', 
        href: `/user/dashboard`,
        icon: 'upcoming',
        index: true 
      },
      { 
        label: 'History', 
        href: `/user/dashboard/history`,
        icon: 'history'
      },
      { 
        label: 'Booking', 
        icon: 'booking',
        href: `/user/booking` 
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