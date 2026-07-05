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
      label: 'Inicio',
      icon: 'home',
      href: `/dashboard`,
    },
    { 
      label: 'Citas',
      icon: 'pool',
      href: `/pool` 
    },
    { 
      label: 'Historial',
      icon: 'history',
      href: `/history` 
    },
    { 
      label: 'Tiendas',
      icon: 'store',
      href: `/stores` 
    },
  ],
  USER: (slug) => [
      { 
        label: 'Inicio', 
        href: `/dashboard`,
        icon: 'home',
        index: true 
      },
      { 
        label: 'Historial', 
        href: `/history`,
        icon: 'history'
      },
      { 
        label: 'Reserva', 
        icon: 'booking',
        href: `/booking` 
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