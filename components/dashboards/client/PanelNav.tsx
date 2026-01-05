'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

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
    <nav className="flex border-b">
      {items.map(item => {
        const { label, href, index } = item
        const isActive = index ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'px-4 py-2 transition-colors',
              isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
