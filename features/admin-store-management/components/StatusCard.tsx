import { Body } from '@/components/UI';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
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
    value
}: StatusCardProps) {
  return (
    <li className={cn('status-card-base', className)}>
        <Link href={href} className="centered-col bg-surface-1 normal-space h-28 w-32 p-4 relative group opacity-80 hover:opacity-90 border border-border/50 rounded-md">
            <Body className="text-3xl justify-self-center self-center text-main">
                {value}
            </Body>
            <Body className="text-else">{label}</Body>
            <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 snappy " />
        </Link>
    </li>
  );
}
