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
      label: 'Overview', 
      href: `/staff/dashboard`,
      icon: 'home',
      index: true 
    },
    { 
      label: 'Stores',
      icon: 'store',
      href: `/staff/dashboard/stores` 
    },
    { 
      label: 'Upcoming',
      icon: 'upcoming',
      href: `/staff/dashboard/upcoming` 
    },
    { 
      label: 'History',
      icon: 'history',
      href: `/staff/dashboard/history` 
    },
    { 
      label: 'Profile',
      icon: "profile",
      href: `/staff/dashboard/profile` 
    }
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
        label: 'Profile', 
        icon: 'profile',
        href: `/user/dashboard/profile` 
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