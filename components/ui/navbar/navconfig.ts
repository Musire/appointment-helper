export type NavItem = {
  label: string
  href: string
  icon?: string
  index?: boolean
}

export type Role = 'SUPERADMIN' | 'ADMIN' | 'STAFF' | 'USER'

export const navByRole: Record<Role, NavItem[]> = {
  ADMIN: [
  ],
  STAFF: [
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
  USER: [
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
  SUPERADMIN: [
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

export function getNav(role: Role) {
  return navByRole[role] ?? []
}