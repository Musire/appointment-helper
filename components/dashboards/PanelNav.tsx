'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PanelNavProps {
  items: { 
    label: string; 
    href: string;
    index?: boolean; 
  }[];
}

export default function PanelNav({ items }: PanelNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex border-b border-whitesmoke/20 xs:w-full md:w-[85dvw] lg:w-[70dvw] overflow-x-hidden my-6">
      {items.map(item => {
        const { label, href, index } = item
        const isActive = index ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'px-3 py-2 transition-colors',
              isActive ? 'border-b-2 border-whitesmoke/87 text-whitesmoke/87' : 'text-whitesmoke/37 hover:text-whitesmoke/60'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
