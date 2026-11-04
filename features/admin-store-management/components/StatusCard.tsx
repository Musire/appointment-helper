import { Body } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

type StatusCardProps = {
  className?: string;
  label: string;
  href: string;
  value: number;
};

export default function StatusCard({
  className,
  label,
  href,
  value,
}: StatusCardProps) {
  return (
    <li className={cn('min-w-0 flex-1', className)}>
      <Link
        href={href}
        className={cn(
          'group relative flex h-full w-full min-w-0 flex-col',
          'gap-1 rounded-lg  bg-surface-1 p-3 sm:p-4',
          'transition-colors duration-200',
          'hover:bg-surface-2 hover:border-border-strong',
          'active:scale-[0.98] active:bg-surface-2',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
      >
        <Body className="text-2xl font-semibold tabular-nums text-main sm:text-3xl">
          {value}
        </Body>

        <div className="flex min-w-0 items-center justify-between gap-1">
          <Body className="min-w-0 truncate text-xs text-else sm:text-sm">
            {label}
          </Body>

          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-else transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </li>
  );
}