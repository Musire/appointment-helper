'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getIcon, IconKey } from './icon-map';
import { NavItem } from './navconfig';

interface PanelNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: PanelNavProps) {
  const pathname = usePathname();

  const styles = {
    standard: "px-3 py-2 transition-colors flex space-x-2 rounded-full size-12  centered",
    active: " text-whitesmoke/87 bg-blue-500",
    inactive: "text-else hover:text-main border-disabled border hover:bg-whitesmoke/10 "
  }

  return (
    <nav className="flex border-b border-whitesmoke/20 xs:w-full md:w-[85dvw] lg:w-[70dvw] overflow-x-hidden my-6 space-x-2">
      {items.map(item => {
        const { icon, href, index } = item
        const Icon = getIcon(icon as IconKey)
        const isActive = index ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={clsx(styles.standard, isActive ? styles.active : styles.inactive)}
          >
            {Icon && <Icon size={30} strokeWidth={isActive ? 2 : 1} />}
          </Link>
        );
      })}
    </nav>
  );
}
